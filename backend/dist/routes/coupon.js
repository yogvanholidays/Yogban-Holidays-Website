"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Coupon_1 = __importDefault(require("../models/Coupon"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponType, amount, couponCode, couponMessage, minNights, expiryDate, neverExpires, creationDate, } = req.body;
        // Create a new coupon instance
        const newCoupon = new Coupon_1.default({
            couponType,
            amount,
            couponCode,
            couponMessage,
            minNights,
            expiryDate,
            neverExpires,
            creationDate,
        });
        // Save the coupon to the database
        yield newCoupon.save();
        res.status(201).json({ message: "Coupon created successfully" });
    }
    catch (error) {
        console.error("Failed to create coupon:", error);
        res.status(500).json({ message: "Failed to create coupon" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield Coupon_1.default.find().sort("-creationDate");
        res.status(200).json(coupons);
    }
    catch (error) {
        console.error("Error fetching coupons:", error);
        res.status(500).json({ message: "Failed to fetch coupons" });
    }
}));
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Coupon_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Failed to delete coupon:", error);
        res.status(500).json({ message: "Failed to delete coupon" });
    }
}));
exports.default = router;
