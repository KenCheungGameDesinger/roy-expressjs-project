import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user: { type: String },
  products: [
    {
      // productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productId: String,
      quantity: Number,
    },
  ],
});


export default mongoose.model("Cart", cartSchema);
