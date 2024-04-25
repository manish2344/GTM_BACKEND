const blogController = require("express").Router()
const Blog = require("../models/Blog.js")
// const verifyToken = require('../middleware/auth')
const cloudinary = require("./cloudinary.js");
const upload = require("./multer.js");
blogController.get('/blog/getAll', async (req, res) => {
    try {
        // const blogs = await Blog.find({})
        const blogs = await Blog.find({})
        // .populate("userId", '-password')
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})
blogController.post("/blog/create", upload.single("image"),
// verifyToken, 
async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let user = new Blog({
        title: req.body.title,
        desc: req.body.desc,
        category: req.body.category,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
        // userId:req.user.id
      });
      // Save user
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
blogController.get('/blog/find/:id', async (req, res) => {
    try {
        // const blog = await Blog.findById(req.params.id);
        const blog = await Blog.findById(req.params.id)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})

blogController.delete('/deleteBlog/:id',  async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        
        await Blog.findByIdAndDelete(req.params.id)

        return res.status(200).json({msg: "Successfully deleted the blog"})
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = blogController