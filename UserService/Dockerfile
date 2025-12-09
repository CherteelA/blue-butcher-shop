FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Шаг 2: запуск приложения на JDK slim
FROM eclipse-temurin:17-jdk-focal
WORKDIR /app
COPY --from=build /app/target/UserService-1.jar app.jar
COPY --from=build /app/src/main/resources/private.pem ./
COPY --from=build /app/src/main/resources/public.pem ./
COPY --from=build /app/src/main/resources/private.pem ./security/
COPY --from=build /app/src/main/resources/public.pem ./security/

ENTRYPOINT ["java", "-jar", "/app/app.jar"]