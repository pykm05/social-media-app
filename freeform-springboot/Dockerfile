# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar ./demo.jar

CMD ["java", "-jar", "demo.jar"]
