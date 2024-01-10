# Pull official base image
FROM python:3.11

# Set work directory
WORKDIR /backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update

# Install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Copy project
COPY . .

# Command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]