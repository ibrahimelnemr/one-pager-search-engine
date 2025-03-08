# Use a specific Python version
FROM python:3.12.3

# Ensure working directory exists
RUN mkdir -p /app

# Set the working directory inside the container
WORKDIR /app

# Copy only the requirements file first (to leverage Docker caching)
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port Flask runs on
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
