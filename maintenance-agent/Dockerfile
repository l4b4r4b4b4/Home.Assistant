# Set base image
FROM python:3.9

# Set working directory
WORKDIR /code

# Copy dependencies text
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy code base to image
COPY ./app /code/app

# Run Fast API
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]