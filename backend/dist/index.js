"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./data/dbConnection"));
const user_1 = __importDefault(require("./routes/user"));
const account_1 = __importDefault(require("./routes/account"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const PORT = process.env.PORT;
//database connection
(0, dbConnection_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/account", account_1.default);
app.get("/", (req, res) => {
    res.send("Hi");
});
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
