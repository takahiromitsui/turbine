import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

username = os.getenv("MONGO_USER")
password = os.getenv("MONGO_PWD")
# connection_string = f"mongodb+srv://{username}:{password}@cluster0.qtybgjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
connection_string=f'mongodb://{username}:{password}@mongodb:27017/turbit?authSource=admin'
client = MongoClient(connection_string)

# Global variables
DB_TASK_ONE = client.get_database("task1")
DB_TASK_TWO = client.get_database("task2")