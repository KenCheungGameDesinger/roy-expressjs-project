import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ carts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    console.log(req.body);
    // const { productId, quantity } = req.body;
    // const cart = await Cart.findOne({ user: req.user._id });
    // const existingProduct = cart.products.find(
    //   (p) => p.productId.toString() === productId.toString()
    // );

    // if (existingProduct) {
    //   existingProduct.quantity += quantity;
    // } else {
    //   cart.products.push({
    //     productId,
    //     quantity,
    //   });
    // }

    // await cart.save();

    const createdCart = await Cart.create(req.body);
    res.status(201).json(createdCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId.toString()
    );

    if (existingProduct) {
      existingProduct.quantity = quantity;
    } else {
      return res.status(404).json({ message: "Product not found in cart!" });
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    const filteredProducts = cart.products.filter(
      (p) => p.productId.toString() !== productId.toString()
    );

    cart.products = filteredProducts;
    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    cart.products = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const clearAllCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: "All carts cleared successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
