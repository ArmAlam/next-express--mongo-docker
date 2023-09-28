const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Topic = require("./models/topic");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ message: "API is working!!✌️" });
});

app.get("/topics", async (req, res) => {
  const topics = await Topic.find();
  return res.status(200).send({ topics });
});

app.get("/topic/:id", async (req, res) => {
  const { id } = req.params;
  const topic = await Topic.findById(id);
  return res.status(200).send({ topic });
});

app.post("/topic", async (req, res) => {
  console.log(req.body);
  const newTopic = new Topic({ ...req.body });
  const insertedTopic = await newTopic.save();
  return res.status(201).send({ insertedTopic });
});

app.put("/topic/:id", async (req, res) => {
  const { id } = req.params;
  await Topic.updateOne({ id }, req.body);
  const updatedTopic = await Topic.findById(id);
  return res.status(200).send({ updatedTopic });
});

app.delete("/topic/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTopic = await Topic.findByIdAndDelete(id);
  return res.status(200).send({ deletedTopic });
});

const start = async () => {
  // const url = 'mongodb://172.17.0.1:27017/names'; use 172.17.0.1 in stead of host.docker.internal in linux platfrom
  const url = "mongodb://mongodb:27017/names"; // mongodb is the container name, when using network, docker will automatically resolve IP address
  // const { CONNECTION_STRING } = process.env;
  try {
    await mongoose.connect(url);
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
