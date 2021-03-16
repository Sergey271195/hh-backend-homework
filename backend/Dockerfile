FROM maven:3.6.3-jdk-11

WORKDIR /app/backend

COPY ./pom.xml .

RUN ["mvn", "clean", "install", "-DskipTests", "dependency:resolve", "dependency:resolve-plugins"]

COPY ./src ./src

EXPOSE 8080

CMD ["mvn", "clean", "install", "-DskipTests", "exec:java"]