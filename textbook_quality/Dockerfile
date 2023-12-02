# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /textbook_quality

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev netcat

# Install Python dependencies
COPY pyproject.toml .
COPY poetry.lock .
COPY local.env .
RUN pip install poetry && poetry config virtualenvs.create false && poetry install --no-dev

# Copy project
COPY . .
RUN chmod +x wait.sh

# Expose the port the app runs in
EXPOSE 8000