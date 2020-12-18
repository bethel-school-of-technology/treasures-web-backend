console.log("Loaded User.js");

var express = require("express");
var User = require("../models/User");
var router = express.Router();

router.post("/userSignUp", async function (req, res) {
  // ----------- Creating a NEW user
  // ----------- Need to add checks that the properties actually contain data
  // ----------- Add security that only approved users can add blogs
  //
  console.log("Doing a POST to /userSignUp");
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  });
  newUser
    .save()
    .then((data) => { res.json(data); })
    .catch((error) => { res.json(error); }); // ----- Add status message to alert if error or success
});

//router.post('/signup', function (req, res, next) {
//models.users
//  .findOrCreate({
//    where: {
//      email: req.body.email,
//    },
//    defaults: {
//      password: authService.hashPassword(req.body.password)
//    }
//  })
//  .spread(function (result, created) {
//    res.json({ created })
//  });
//});

router.get("/", async function (req, res) {
  // ----------- Get ALL users
  console.log("Doing a GET to /user");
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Could not find user", err
    });
  } console.log("Could not get user");
});

router.get("/:id", async function (req, res) {
  // ----------- Get SINGLE user
  console.log("Doing a GET to /users/id");
  try {
    let id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      results: user.length,
      data: { user },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Could not find user by id",
      err
    });
  } console.log("Could not get user by id");
});

router.put("/:id", async function (req, res, next) {
  // ----------- Edit or update SINGLE user by ID
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      message: "You successfully updated user post",
      data: { users }
    });
  } catch (err) {
    res.status(500).json({ // --------------------Make sure all error messages are correct
      status: 'fail',
      message: "Error updating user post",
      err
    });
  } console.log("Could not update post");
});


router.delete("/:id", async function (req, res, next) {
  // ----------- Delete SINGLE user by ID
  let id = req.params.id;
  await User.findOneAndDelete(
    { _id: id },
    function (err) {
      if (err) {
        console.log(err);
        res.json({
          status: 404,
          message: "Error deleting user post",
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

