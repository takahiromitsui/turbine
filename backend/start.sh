#!/bin/bash

# Run the database initialization script
python initialize_db.py

# Start the FastAPI application
uvicorn app.main:app --host 0.0.0.0 --port 8000