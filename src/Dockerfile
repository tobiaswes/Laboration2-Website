# Stage 1: Build the application
FROM maven:3.9.5-sapmachine-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM sapmachine:21
WORKDIR /app
COPY --from=build /app/target/Laboration2-Website-0.0.1-SNAPSHOT.jar /app/Laboration2-Website.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Laboration2-Website.jar"]