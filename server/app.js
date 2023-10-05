const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  getAllTopics,
  getTopicById,
  addTopic,
  updateTopic,
  deleteTopic,
} = require("./src/TopicController");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// TODO: SEPARATE ROUTE
app.get("/", async (req, res) => {
  return res.json({ message: "API is working!!✌️" });
});

app.get("/topics", getAllTopics);

app.get("/topic/:id", getTopicById);

app.post("/topic", addTopic);

app.put("/topic/:id", updateTopic);

app.delete("/topic/:id", deleteTopic);

const start = async () => {
  const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
  // const url = 'mongodb://172.17.0.1:27017/names'; use 172.17.0.1 in stead of host.docker.internal in linux platfrom
  // mongodb is the container name, when using network, docker will automatically resolve IP address
  // root:root is username:password,  set for auth while running docker container setup
  const url = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@mongodb:27017/names?authSource=admin`;
  // const { CONNECTION_STRING } = process.env;
  try {
    mongoose
      .connect(url)
      .then(() => {
        console.log("mongodb connected");
        app.listen(3000, () => console.log("Server started on port 3000"));
      })
      .catch((err) => console.log({ err }));
  } catch (error) {
    console.error({ error });
    process.exit(1);
  }
};

start();
