"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const my_hotels_1 = __importDefault(require("./routes/my-hotels"));
const destinations_1 = __importDefault(require("./routes/destinations"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const properties_1 = __importDefault(require("./routes/properties"));
const coupon_1 = __importDefault(require("./routes/coupon"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const rating_1 = __importDefault(require("./routes/rating"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const carousel_1 = __importDefault(require("./routes/carousel"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose_1.default.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
    console.log("Connected To MongoDB successfully");
});
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const PORT = 7000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "./dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
app.use("/api/hotels", hotels_1.default);
app.use("/api/destinations", destinations_1.default);
app.use("/api/properties", properties_1.default);
app.use("/api/coupons", coupon_1.default);
app.use("/api/blogs", blogs_1.default);
app.use("/api/carousel", carousel_1.default);
app.use("/api/rating", rating_1.default);
// app.get("*", (req, res) => {
//     res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
// });
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./dist/index.html"));
});
// app.get('/', (req, res) => {
//     res.send('GET request to the homepage');
// });
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
