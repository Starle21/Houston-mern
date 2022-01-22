const express = require("express");
const cors = require("cors");
const flightsRouter = require("./routes/flights.js");
const astronautsRouter = require("./routes/astronauts.js");
const rocketsRouter = require("./routes/rockets.js");
const middleware = require("./utils/middleware.js");
const { Server } = require("socket.io");
const http = require("http");

// creating req-res server
const app = express();

// pre middleware
app.use(cors());
app.use(express.json());

// ---------------
// create node.js server
const server = http.createServer(app);
// creating websockets server
const io = new Server(server);

app.set("io", io);

// ---------------

// routes
app.use(require("./socket.js")(io));
app.use("/api/flights", flightsRouter);
app.use("/api/astronauts", astronautsRouter);
app.use("/api/rockets", rocketsRouter);

// post middleware
app.use(middleware.unknownEndpoint);

// turning server on
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
