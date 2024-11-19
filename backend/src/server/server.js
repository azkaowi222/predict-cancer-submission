const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");
const loadModel = require("../service/loadModel.js");
const InputError = require("../exceptions/InputError.js");
require("dotenv").config();

(async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;
  server.route(routes);

  server.ext("onPreResponse", (req, h) => {
    const res = req.response;

    if (res instanceof InputError) {
      return h
        .response({
          status: "fail",
          message: res.message,
        })
        .code(res.statusCode);
    }
    if (res.isBoom && res.output.statusCode === 413) {
      return h
        .response({
          status: "fail",
          message:
            "Payload content length greater than maximum allowed: 1000000",
        })
        .code(res.output.statusCode);
    }
    return h.continue;
  });
  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
