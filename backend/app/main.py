from typing import Optional
from fastapi import FastAPI, HTTPException
import uvicorn
import logging
from datetime import datetime

from app.services import json_placeholder
from app.models.api import UserPostCommentCount
from app.models.database import Turbine
from app.services.turbine import get_turbine_data

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
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.get("/task2/turbine/{turbine_id}", response_model=list[Turbine])
def read_turbine_data(turbine_id: int, start_time: datetime, end_time: datetime):
    try:
        res = get_turbine_data(turbine_id, start_time, end_time)
        logging.info(res)
        return res
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


if __name__ == "__main__":
    # poetry run fastapi dev app/main.py
    uvicorn.run(app, host="0.0.0.0", port=8000)
