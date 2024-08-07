const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add-to-cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try{
        const { id, bookid } = req.headers;
        const userData = await User.findById(id);
        const isBookAddedToCart = await userData.cart.includes(bookid);
        if(isBookAddedToCart){
            return res.json({ status: "Success", message: "Book is already added to cart." });
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid }});
        return res.status(200).json({ message: "Book added to cart successfully!" });
    }catch {
        return res.status(500).json({ message: "An error occurred" });
    }
})

//remove-from-cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { bookid } = req.params;
        const userData = await User.findById(id);
        const isBookAddedToCart = userData.cart.includes(bookid);
        if(!isBookAddedToCart){
            return res.status(200).json({ message: "Book is not added to cart." });
        }
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid }});
        return res.status(200).json({ message: "Book removed from cart" });
    }catch {
        return res.status(500).json({ message: "An error occurred" });
    }
})

//get-user-cart     --of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartData = userData.cart.reverse();
        return res.json({ status: "Success", data: cartData });
    }catch {
        return res.status(500).json({ message: "An error occurred" });
    }
})

module.exports = router;