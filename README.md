
#  Turbine App
## Description

This full stack application is designed to demonstrate comprehensive data engineering and API development skills, fully dockerized for ease of deployment. The project is divided into two main tasks:

### Task 1: Data Engineering and API Development Exercise

- **Setup MongoDB with Docker Compose**: Utilize Docker Compose to set up a MongoDB database.
- **Data Retrieval and Loading into MongoDB**: Retrieve data from the JSONPlaceholder - Free Fake REST API and store it in MongoDB using Python.
- **Create a RESTful API with FastAPI**: Develop a FastAPI application to provide access to the MongoDB data, including an endpoint to report the total number of posts and comments for each user.

### Task 2: Time Series Data Handling and API Development

- **Data Preparation and Loading into MongoDB**: Develop a Python script to read time series data from provided CSV files and load it into a MongoDB collection.
- **Add FastAPI Endpoint**: Create a FastAPI endpoint that allows retrieval of data based on turbine ID and time ranges.
- **Create a Webapp**: Use React to create a power curve plot (power over wind speed) with adjustable plotting date ranges.
## Run Locally

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   # Clone repo
   git clone https://github.com/takahiromitsui/turbine.git
   cd turbine
   ```
2. **Start the Docker containers**
    ```bash
    docker compose up -d
    ```
    This will:

    - Set up a MongoDB database with Docker Compose.
    - Automatically fill in data into the MongoDB instance, which will persist on a volume. The next time you run the containers, the Python script will detect existing data and skip data insertion.

3. **Access the application:**
    - React App: Open your browser and go to http://localhost:3000.
    - FastAPI Endpoint: Open your browser and go to http://localhost:8000/docs to view the API documentation and test endpoints.



