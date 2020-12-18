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
    .then((data) => { res.json(data); })
    .catch((error) => { res.json(error); }); // ----- Add status message to alert if error or success
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
      message: "Could not find blog", err
    });
  } console.log("Could not get blog");
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
      message: "Could not find blog by id",
      err
    });
  } console.log("Could not get blog by id");
});

router.put("/:id", async function (req, res, next) {
  // 
  try {
    const blogs = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      message: "You successfully updated blog post",
      data: { blogs }
    });
  } catch (err) {
    res.status(500).json({ // --------------------Make sure all error messages are correct
      status: 'fail',
      message: "Error updating blog post",
      err
    });
  } console.log("Could not update post");
});


router.delete("/:id", async function (req, res, next) {
  let id = req.params.id;
  await Blog.findOneAndDelete(
    { _id: id },
    function (err) {
      if (err) {
        console.log(err);
        res.json({
          status: 404,
          message: "Error deleting blog post",
          err
        });
      } console.log("Error deleting post");

      res.json({
        status: 200,
        message: "Successfully deleted"
      })
    });
  console.log("Successful deletion");
});


module.exports = router;
