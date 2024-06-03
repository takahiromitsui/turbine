from fastapi import FastAPI
import uvicorn

app = FastAPI(
    title="Turbit API",
    description="Turbit API",
    version="0.1.0",
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    # poetry run fastapi dev app/main.py
    uvicorn.run(app, host="0.0.0.0", port=8000)
