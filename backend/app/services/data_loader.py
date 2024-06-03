import requests
from pymongo import MongoClient
from pydantic import BaseModel


class Post(BaseModel):
    userId: int
    id: int
    title: str
    body: str


class DataLoader:
    def __init__(
        self,
        client: MongoClient,
        url: str = "https://jsonplaceholder.typicode.com",
        database: str = "task1",
    ):
        self.client = client
        self.url = url
        self.db = self.client.get_database(database)
        self.post_ids = []

    def fetch_posts(self) -> list[Post] | None:
        response = requests.get(f"{self.url}/posts")
        try:
            response.raise_for_status()
            data = response.json()
            posts = [Post(**post) for post in data]
            return posts
        except Exception as e:
            print(e)
            return None

    def insert_posts_and_user(self):
        try:
            posts = self.fetch_posts()
            if posts:
                posts_collection = self.db.posts
                users_collection = self.db.users
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
                    users_collection.update_one(
                        {"id": post.get("userId")},
                        {"$push": {"posts": post_id}},
                        upsert=True,
                    )
                    self.post_ids.append(post_id)
        except Exception as e:
            print(e)


if __name__ == "__main__":
    from app.db.database import client

    data_loader = DataLoader(client)
    # posts = data_loader.fetch_posts()
    # print(posts)
    data_loader.insert_posts_and_user()
