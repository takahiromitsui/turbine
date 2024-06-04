import requests
from pymongo import UpdateOne
from pydantic import BaseModel


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


if __name__ == "__main__":
    # Task1
    from app.db.database import DB_TASK_ONE

    data_loader = DataLoaderFromAPI(db=DB_TASK_ONE)
    data_loader.load_data_from_api()
