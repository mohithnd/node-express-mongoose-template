const morgan = require("morgan");
const logger = require("../config/logger.config");

const httpLogger = morgan("combined", {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});

module.exports = httpLogger;