# Use the official Maven image with JDK 17 (compatible with most modern Spring Boot apps)
FROM maven:3.9.7-eclipse-temurin-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only pom.xml first to utilize Docker cache for dependencies
COPY pom.xml .

# Download dependencies (leverage Docker cache)
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Expose the standard Spring Boot port
EXPOSE 8080

# Default command to run the application using Maven
CMD ["mvn", "spring-boot:run"]
