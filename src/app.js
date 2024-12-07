const express = require("express");
const { PORT } = require("./config/server.config");
const connectDB = require("./config/db.config");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const cors = require("cors");
const logger = require("./config/logger.config");
const httpLogger = require("./middlewares/morgan.middleware");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use(cors());
app.use(httpLogger);

app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Is Listening On Port: ${PORT}`);
  logger.info(`Server Is Listening On Port: ${PORT}`);
});
