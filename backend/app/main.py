import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

password = os.getenv("MONGO_PWD")

connection_string = f"mongodb+srv://taka:{password}@cluster0.qtybgjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connection_string)

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