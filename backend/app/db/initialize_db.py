import logging

from app.db.database import DB_TASK_ONE, DB_TASK_TWO
from app.services.data_loader import DataLoaderFromAPI, DataLoaderFromCSV

logging.basicConfig(level=logging.INFO)


def initialize_db():
    # Initialize the database
    print("Process Task1 data")
    logging.info("Process Task1 data")
    exist_task_one_data = False
    if DB_TASK_ONE.posts.count_documents({}) > 0:
        exist_task_one_data = True

    if not exist_task_one_data:
        data_loader = DataLoaderFromAPI(db=DB_TASK_ONE)
        data_loader.load_data_from_api()
        print("Task1 data loaded")
        logging.info("Task1 data loaded")
    else:
        print("Task1 data already exists")
        logging.info("Task1 data already exists")

    print("Process Task2 data")
    logging.info("Process Task2 data")
    exist_task_two_data = False
    if DB_TASK_TWO.turbine.count_documents({}) > 0:
        exist_task_two_data = True

    if not exist_task_two_data:
        DataLoaderFromCSV(
            db=DB_TASK_TWO,
            url="https://nextcloud.turbit.com/s/GTbSwKkMnFrKC7A/download/Turbine1.csv",
            turbine_id=1,
        ).load_data_from_csv()
        print("Task2 data loaded from Turbine1.csv")
        logging.info("Task2 data loaded from Turbine1.csv")
        DataLoaderFromCSV(
            db=DB_TASK_TWO,
            url="https://nextcloud.turbit.com/s/G3bwdkrXx6Kmxs3/download/Turbine2.csv",
            turbine_id=2,
        ).load_data_from_csv()
        print("Task2 data loaded from Turbine2.csv")
        logging.info("Task2 data loaded from Turbine2.csv")
    else:
        print("Task2 data already exists")
        logging.info("Task2 data already exists")

    print("Database initialized")
    logging.info("Database initialized")


if __name__ == "__main__":
    initialize_db()
