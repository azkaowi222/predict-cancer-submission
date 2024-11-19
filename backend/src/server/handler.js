const crypto = require("crypto");
const predictClassification = require("../service/inferenceService.js");
const { storeData, historiesData } = require("../service/storeData.js");

const historiesHandler = async (req, h) => {
  const data = await historiesData();
  return h
    .response({
      status: "success",
      data,
    })
    .code(200);
};

const postPredictHandler = async (req, h) => {
  const { image } = req.payload;
  const { model } = req.server.app;
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const { label, suggestion } = await predictClassification(model, image);

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };
  await storeData(id, data);
  return h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    })
    .code(201);
};
module.exports = { historiesHandler, postPredictHandler };
