import express from "express";
import { placeOrder, getAllOrders, getUserOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();


orderRouter.post("/cod", placeOrder);


orderRouter.get("/all", getAllOrders);


orderRouter.get("/user/:userId", getUserOrders);

export default orderRouter;