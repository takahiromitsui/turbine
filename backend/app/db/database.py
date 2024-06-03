import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

password = os.getenv("MONGO_PWD")

connection_string = f"mongodb+srv://taka:{password}@cluster0.qtybgjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connection_string)