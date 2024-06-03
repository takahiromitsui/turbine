from app.db.database import client

db = client.get_database("task1")


def get_post_comment_counts(user_id: int) -> dict:
    try:
        posts_collection = db.posts
        user_posts_count = posts_collection.count_documents({"userId": user_id})
        comments_count = db["comments"].count_documents(
            {
                "postId": {
                    "$in": [
                        post["id"]
                        for post in posts_collection.find({"userId": user_id})
                    ]
                }
            }
        )
        return {
            "user_id": user_id,
            "posts": user_posts_count,
            "comments": comments_count,
        }

    except Exception as e:
        return {"error": str(e)}
