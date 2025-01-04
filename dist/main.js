"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("./application/logging");
const web_1 = require("./application/web");
web_1.web.listen(3000, () => {
    logging_1.logger.info("Listening on port 3000");
});
