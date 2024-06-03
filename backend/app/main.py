# local
from app.db.database import client

def insert_data(data):
    db = client.get_database('test')
    collection = db.test
    test_document = {
        "name": "test",
        "age": 20
    }
    inserted_id = collection.insert_one(test_document).inserted_id
    print(f"Inserted ID: {inserted_id}")


if __name__ == "__main__":
    insert_data("test")