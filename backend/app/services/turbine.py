from datetime import datetime
from pymongo import ASCENDING

# local imports
from app.db.database import DB_TASK_TWO
from app.models.database import Turbine

db = DB_TASK_TWO


def get_turbine_data(
    turbine_id: int, start_date: datetime, end_date: datetime
) -> list[Turbine] | Exception:
    try:

        data = db.turbine.find(
            {
                "turbine_id": turbine_id,
                "time": {"$gte": start_date, "$lte": end_date},
            },
            {"_id": 0},
        ).sort("time", ASCENDING)

        return [Turbine(**turbine) for turbine in data]

    except Exception as e:
        return e
