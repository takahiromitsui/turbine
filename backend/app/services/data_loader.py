import requests
from pymongo import UpdateOne
from pydantic import BaseModel
import pandas as pd


class Post(BaseModel):
    userId: int
    id: int
    title: str
    body: str


class Comment(BaseModel):
    postId: int
    id: int
    name: str
    email: str
    body: str


# Task1
class DataLoaderFromAPI:
    def __init__(
        self,
        db,
        url: str = "https://jsonplaceholder.typicode.com",
    ):
        self.url = url
        self.db = db
        self.post_ids = []

    def __fetch_posts(self) -> list[Post] | None:
        response = requests.get(f"{self.url}/posts")
        try:
            response.raise_for_status()
            data = response.json()
            posts = [Post(**post) for post in data]
            return posts
        except Exception as e:
            print(e)
            return None

    def __insert_posts_and_user(self) -> None:
        try:
            posts = self.__fetch_posts()
            if posts:
                posts_collection = self.db.posts
                users_collection = self.db.users
                bulk_operations = []
                for post in posts:
                    post = post.model_dump()
                    data = {
                        "userId": post.get("userId"),
                        "id": post.get("id"),
                        "title": post.get("title"),
                        "body": post.get("body"),
                        "comments": [],
                    }

                    post_id = posts_collection.insert_one(data).inserted_id
                    bulk_operations.append(
                        UpdateOne(
                            {"id": post.get("userId")},
                            {"$push": {"posts": post_id}},
                            upsert=True,
                        )
                    )
                    self.post_ids.append(post.get("id"))
                users_collection.bulk_write(bulk_operations)
        except Exception as e:
            print(e)

    def __fetch_comments(self) -> list[Comment] | None:
        if not self.post_ids:
            print("No post ids found")
            return None
        try:
            res: list[Comment] = []
            for post_id in self.post_ids:
                response = requests.get(f"{self.url}/posts/{post_id}/comments")
                response.raise_for_status()
                data = response.json()
                comments = [Comment(**comment) for comment in data]
                res.extend(comments)
            return res
        except Exception as e:
            print(e)
            return None

    def __insert_comments_update_posts(self) -> None:
        try:
            comments = self.__fetch_comments()
            if comments:
                comments_collection = self.db.comments
                posts_collection = self.db.posts
                bulk_operations = []
                for comment in comments:
                    comment = comment.model_dump()
                    data = {
                        "postId": comment.get("postId"),
                        "id": comment.get("id"),
                        "name": comment.get("name"),
                        "email": comment.get("email"),
                        "body": comment.get("body"),
                    }

                    comment_id = comments_collection.insert_one(data).inserted_id
                    bulk_operations.append(
                        UpdateOne(
                            {"id": comment.get("postId")},
                            {"$push": {"comments": comment_id}},
                            upsert=True,
                        )
                    )
                posts_collection.bulk_write(bulk_operations)
        except Exception as e:
            print(e)

    def load_data_from_api(self):
        self.__insert_posts_and_user()
        self.__insert_comments_update_posts()
        print("Data loaded successfully")


# Task2
class DataLoaderFromCSV:
    def __init__(
        self, db, url: str = "", skiprows=1, sep: str = ";", turbine_id: int = 1
    ):
        self.db = db
        self.url = url
        self.skiprows = skiprows
        self.sep = sep
        self.turbine_id = turbine_id

        self.columns_mapping = {
            "                 ": "time",
            "   m/s": "wind",
            "  rpm": "rotor",
            "      kW": "leistung",
            "     °": "azimut",
            "       kWh": "prod_1",
            "       kWh.1": "prod_2",
            "       h": "btr_std_1",
            "       h.1": "btr_std_2",
            "   °C": "gen1",
            "   °C.1": "lager",
            "   °C.2": "aussen",
            "   °C.3": "getr_t",
            "       ": "status",
            "    V": "spann",
            "    V.1": "spann_1",
            "    V.2": "spann_2",
            "     A": "strom",
            "     A.1": "strom_1",
            "     A.2": "strom_2",
            "     ": "cos_ph",
            "       kWh.2": "abgabe",
            "       kWh.3": "bezug",
            "       Imp": "kh_zahl_1",
            "       Imp.1": "kh_zahl_2",
            "       Bit": "kh_digi_e",
            "       Bit.1": "kh_digi_i",
            "          ": "kh_ana_1",
            "          .1": "kh_ana_2",
            "          .2": "kh_ana_3",
            "          .3": "kh_ana_4",
        }

    def __read_csv(self) -> pd.DataFrame | None:
        try:
            data = pd.read_csv(self.url, sep=self.sep, skiprows=self.skiprows)
            return data
        except Exception as e:
            print(e)
            return None

    def __rename_columns(self, data: pd.DataFrame) -> pd.DataFrame:
        data = data.rename(columns=self.columns_mapping)
        return data

    def __convert_types(self, data: pd.DataFrame) -> pd.DataFrame:
        for col in data.columns:
            try:
                if col in ["time"]:
                    data[col] = pd.to_datetime(data[col], format="%d.%m.%Y, %H:%M")
                for col in data.columns:
                    if data[col].dtype == "object":
                        data[col] = data[col].str.replace(",", ".").astype(float)
                return data
            except:
                pass
        return data

    def __add_turbine_id(self, data: pd.DataFrame) -> pd.DataFrame:
        data["turbine_id"] = self.turbine_id
        return data

    def __load_data_to_db(self, data: pd.DataFrame) -> None:
        data_dict = data.to_dict("records")
        iterate = len(data_dict) // 1000 + 1
        for i in range(iterate):
            print(f"Loading data {i + 1}/{iterate}")
            start = i * 1000
            end = (i + 1) * 1000
            self.db.turbine.insert_many(data_dict[start:end])
        print(f"Data loaded successfully from {self.url}")

    def load_data_from_csv(self) -> None:
        data = self.__read_csv()
        if data is None:
            return
        data = self.__rename_columns(data)
        data = self.__convert_types(data)
        data = self.__add_turbine_id(data)
        self.__load_data_to_db(data)


if __name__ == "__main__":
    # Task1
    # from app.db.database import DB_TASK_ONE

    # data_loader = DataLoaderFromAPI(db=DB_TASK_ONE)
    # data_loader.load_data_from_api()

    # Task2
    from app.db.database import DB_TASK_TWO

    # DataLoaderFromCSV(
    #     db=DB_TASK_TWO,
    #     url="https://nextcloud.turbit.com/s/GTbSwKkMnFrKC7A/download/Turbine1.csv",
    #     turbine_id=1,
    # ).load_data_from_csv()
    DataLoaderFromCSV(
        db=DB_TASK_TWO,
        url="https://nextcloud.turbit.com/s/G3bwdkrXx6Kmxs3/download/Turbine2.csv",
        turbine_id=2,
    ).load_data_from_csv()
    pass
