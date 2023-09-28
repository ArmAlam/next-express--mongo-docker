## A dockerized full stack app using express.js, next.js and mongodb.

1. Clone the project

2. Create mongodb container using the command -> docker run --name mongodb -v data:/data/db --rm -d --network names-net -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo

3. cd to server

4. Build server side image using the command - docker build -t <image_name> .

5. Create a container using the command -> Create backend container, docker run --name <container*name> -v <project_path>:/app -v /app/node_modules -d --rm -p 3000:3000 --network <network_name> <image_name_from_step_4> /* -v /app/node*modules is used to not get overwritten by host machine node_modules */

6. cd client

7. Build client side image using the command - docker build -t <image_name> .

8. Create a container using the command -> docker run -v <project_path>:/app/src --name <container_name> --rm -p 3001:3001 <image_name_from_step_7>
