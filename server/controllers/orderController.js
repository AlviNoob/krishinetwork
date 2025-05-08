import Order from "../models/Order.js";


export const placeOrder = async (req, res) => {
  const { userId, address, items, amount, paymentType, isPaid } = req.body;

  console.log("Order data received:", req.body);

  if (!userId || !address || !items || items.length === 0 || !amount || !paymentType) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    const newOrder = new Order({
      userId,
      address,
      items,
      amount,
      paymentType,
      isPaid,
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch orders only for the specific user
    const orders = await Order.find({ userId });

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found." });
    }

    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
