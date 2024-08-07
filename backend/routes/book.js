const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//add-book  --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({ message: "You do not have access to perform admin actions" });
        }

        const newBook = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await newBook.save();
        return res.status(200).json({ message: "Book added successfully!" });
    }catch {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

//update-book
router.put("/update-book", authenticateToken, async (req, res) => {
    try{
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({ message: "Book details updated successfully!" });        
    }catch {
        return res.status(500).json({ message: "Error occured while updating the book details" });
    }
})

//delete-book   --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try{
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully!" });        
    }catch {
        return res.status(500).json({ message: "An error occured!" });
    }
})

//get-all-books
router.get("/get-all-books", async (req, res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({ status: "Success", data: books });        
    }catch {
        return res.status(500).json({ message: "An error occured!" });
    }
})

//get-recent-books  limit 4
router.get("/get-recent-books", async (req, res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({ status: "Success", data: books });               
    }catch {
        return res.status(500).json({ message: "An error occured!" });
    }
})

//get-book-by-id 
router.get("/get-book-by-id/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.json({ status: "Success", data: books });               
    }catch {
        return res.status(500).json({ message: "An error occured!" });
    }
})

module.exports = router;