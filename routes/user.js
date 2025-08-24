const {Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get("/signin", (req, res) => {
    console.log("Rendering signin page");
    res.render("signin");
});
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    // console.log(name, email, password);
    // const user = new User({name, email, password});
    await User.create({name, email, password});
    res.redirect("/user/signin");
});
router.post("/signin", async (req, res) => {
    console.log("Trying to signin")
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);
    console.log("User:", user);
    // res.redirect("/");
    // if (!user) {        
    //     return res.status(400).send("User not found");
    // }
})
module.exports = router;
