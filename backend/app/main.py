from fastapi import FastAPI, HTTPException
import uvicorn
import logging

from app.services import json_placeholder
from app.models.api import UserPostCommentCount

app = FastAPI(
    title="Turbit API",
    description="Turbit API",
    version="0.1.0",
)

logging.basicConfig(level=logging.INFO)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/task1/users/{user_id}/stats", response_model=UserPostCommentCount)
def read_user_stats(user_id: int):
    try:
        res = json_placeholder.get_post_comment_counts(user_id)
        logging.info(res)
        return res
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail= "Internal Server Error")


if __name__ == "__main__":
    # poetry run fastapi dev app/main.py
    uvicorn.run(app, host="0.0.0.0", port=8000)
