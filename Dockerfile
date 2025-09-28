# Root-level Dockerfile to Run Spring Boot App (pgms-backend) via 'mvn spring-boot:run'
# This setup is well-suited for development and debugging via Docker.

FROM maven:3.9.6-eclipse-temurin-17

# Set working directory to backend project for direct mvn operations
WORKDIR /app/pgms-backend

# Copy entire backend code (including Maven wrapper and configs)
COPY ./pgms-backend .

# Expose Spring Boot default port (change if needed)
EXPOSE 8080

# Start Spring Boot using Maven (NO pre-build, runs in development mode)
CMD ["mvn", "spring-boot:run"]

# ========== USAGE ==========
# 1. From project root, build image:
#    docker build -t pgms-app-dev .
# 2. Run container:
#    docker run -p 8080:8080 pgms-app-dev
#
# App will start using 'mvn spring-boot:run' in /app/pgms-backend
# For production, prefer a multi-stage build and 'java -jar'
