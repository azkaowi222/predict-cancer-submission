const { historiesHandler, postPredictHandler } = require("./handler.js");

const routes = [
  {
    path: "/predict/histories",
    method: "GET",
    handler: historiesHandler,
  },
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
];

module.exports = routes;
