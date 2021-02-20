const router = require('express').Router();
let User = require('../models/user.model');

// handles incoming http host requests on / users URl path
// like for localhost:5000/user/get() request, User.find() will return all the users from MongoDB Atlas DB
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users)) // after finds, then, get all the users (users =>), return users in json format (res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));    // error catch
});

// add data
router.route('/add').post((req, res) =>{
    // we are expecting username in body
    const username = req.body.username;
    // create a new user
    const newUser = new User({username});
    // now save user
    newUser.save()
        .then(() => res.json('User added!'))
        .catch (err => res.status(400).json('Error: ' * err));    // error catch
});

module.exports = router;    // exporting router
