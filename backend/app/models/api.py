from pydantic import BaseModel


class UserPostCommentCount(BaseModel):
    user_id: int
    posts: int
    comments: int
