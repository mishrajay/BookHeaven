const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add-book-to-favorite
router.put("/add-book-to-favorite", authenticateToken, async (req, res) => {
    try{
        const { id, bookid } = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favorites.includes(bookid);
        if(isBookFavorite){
            return res.status(200).json({ message: "Book already present in favorites." });
        }
        await User.findByIdAndUpdate(id, { $push: { favorites: bookid }});
        return res.status(200).json({ message: "Book added to favorites" });
    }catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

//remove-book-from-favorite
router.put("/remove-book-from-favorite", authenticateToken, async (req, res) => {
    try{
        const { id, bookid } = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favorites.includes(bookid);
        if(!isBookFavorite){
            return res.status(200).json({ message: "Book not present in favorites." });
        }
        await User.findByIdAndUpdate(id, { $pull: { favorites: bookid }});
        return res.status(200).json({ message: "Book deleted from favorites" });
    }catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

//get-favorite-book     for a particular user
router.get("/get-favorite-book", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favorites");
        const favoriteBooks = userData.favorites;
        return res.json({ status: "Success", data: favoriteBooks });
    }catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;