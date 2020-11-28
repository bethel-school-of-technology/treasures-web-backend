console.log("Loaded Blog.js");

var express = require("express");
var Blog = require("../models/Blog");
var router = express.Router();

router.post("/", async function (req, res) {
  //
  // ----------- Need to add checks that the properties actually contain data
  // ----------- Add security that only approved users can add blogs
  //
  console.log("Doing a POST to /blogs");
  const newBlog = new Blog({
    title: req.body.title,
    description: req.body.description,
    mainBody: req.body.mainBody,
    date: req.body.date,
  });
  newBlog
    .save()
    .then((data) => {res.json(data);})
    .catch((error) => {res.json(error);});
});

router.get("/", async function (req, res) {
  console.log("Doing a GET to /blogs");
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success", 
      results: blogs.length,
      data: { blogs },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/:id", async function (req, res) {
  console.log("Doing a GET to /blogs/id");
  try {
    let id = req.params.id;
    const blog = await Blog.findById(id);
    res.status(200).json({
      status: "success",
      results: blog.length,
      data: { blog },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.put("/", async function (req, res, next) {
  res.send("PUT / in blogs working");
});


// Delete is working but has a long delay. Come back to this later.
router.delete("/:id", async function (req, res, next) {
  let id = req.params.id;
  await Blog.findOneAndDelete(
    { _id: id },
    function (err) {
    if(err){ 
      console.log(err);
      res.json({ 
        status: 401,
        message: "Error deleting blog post",
        err
      })
    }
    console.log("Successful deletion");
    res.json({ 
      status: 200,
      message: "Successfully deleted "
    })
    });
  });
    

module.exports = router;
