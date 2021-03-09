FROM postgres
ENV POSTGRES_PASSWORD secretpassword
ENV POSTGRES_DB medwebappdb
ENV POSTGRES_PORT 5555
ENV PGPORT 5555
COPY init.sql /docker-entrypoint-initdb.d/

# Build image
# docker build -t medwebpostgres .

# Run container from image (-d = in background)
# docker run --name medwebpostgres -p 5555:5555 medwebpostgres

# Stop container if it is running in background
# docker stop medwebapp

# Restart container (with all data)
# docker container start medwebpostgres

# If smth went wrong delete container
# docker rm medwebpostgres

# See existing images
# docker images

# See containers (-aq = with stopped containers)
# docker ps -aq


