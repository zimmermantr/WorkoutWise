# Use an official Python runtime as a parent image
FROM python:3-alpine

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Expose port 8000 to access Django app
EXPOSE 8000

# Start the Django app using the built-in server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["sh", "-c", "./wait.sh && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]