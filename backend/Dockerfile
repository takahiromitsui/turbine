FROM python:3.11-buster

# Set working directory
WORKDIR /app

# Copy only the necessary files to install dependencies
COPY pyproject.toml poetry.lock ./

# Install Poetry
RUN pip install poetry==1.4.2

# Generate requirements.txt using Poetry
RUN poetry export --without-hashes --format=requirements.txt > requirements.txt

# Install dependencies using pip
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Env
ENV MONGO_USER=admin
ENV MONGO_PWD=password

# Specify the command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]