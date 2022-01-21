// the last function in the pipeline, doensn't call next ..?
const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
  next();
};

module.exports = { unknownEndpoint };
