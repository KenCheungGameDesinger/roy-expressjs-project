import express from "express";
import {
  addToCart,
  clearCart,
  removeFromCart,
  getCart,
  getAllCarts,
  updateCart,clearAllCart
} from "../controllers/cart.js";

const router = express.Router();

// Create carts
router.post("/", addToCart);

// Get a cart
router.get("/:id", getCart);

// Get all carts
router.get("/", getAllCarts);

// Update a cart
router.put("/:id", updateCart);

// Remove a product from cart
router.delete("/:id/:productId", removeFromCart);

// Delete a cart
router.delete("/:id", clearCart);

router.delete("/", clearAllCart);

export default router;
