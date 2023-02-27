"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const AppErrorHandler_1 = __importDefault(require("./utils/AppErrorHandler"));
const roomTypeRoutes_1 = __importDefault(require("./routes/roomTypeRoutes"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//Global Middleware
app.use((0, cors_1.default)()); // allow cross-origin request
app.use(express_1.default.json()); // Use JSON parser middleware
//middleware for updating data.
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "10kb",
}));
// Routes Middleware
app.use("/api/v1/users", usersRoute_1.default);
app.use("/api/v1", roomTypeRoutes_1.default);
app.use("/api/v1", roomRoutes_1.default);
//Wrong route error handler middleware
app.all("*", (err, req, res, next) => {
    next(new AppErrorHandler_1.default(`Can't find ${req.originalUrl} on this Server!`, 404));
    console.log(err.stack);
});
//Database Connection
const DB = `${process.env.DATABASE}`;
const options = {
    retryWrites: true,
    w: "majority",
};
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(DB, options)
    .then(() => {
    console.log("DB connected successfully!");
})
    .catch((error) => {
    console.log("Not connected to the database!!", error.stack);
});
//Server Connection
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
