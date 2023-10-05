const Topic = require("../models/topic");

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();

    return res.status(200).json({ topics });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id);

    return res.status(200).json({ status: true, data: topic });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const addTopic = async (req, res) => {
  try {
    const newTopic = new Topic({ ...req.body });
    await newTopic.save();

    return res.status(201).json({ status: true, message: "Topic added" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await Topic.updateOne({ id }, req.body);
    await Topic.findById(id);

    return res.status(200).json({ status: true, message: "Topic updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await Topic.findByIdAndDelete(id);

    return res.status(200).json({ status: true, message: "Topic deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

module.exports = {
  getAllTopics,
  getTopicById,
  addTopic,
  updateTopic,
  deleteTopic,
};
