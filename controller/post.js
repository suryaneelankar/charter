const Post = require("../models/Post");
const User = require("../models/User");

module.exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const name = req.body.name;
    console.log('req body is::>>', req.body);
    let creator;
    const post = new Post({
        name: name,
        description: description,
        title: title,
        creator: req.userId,
    });
    post.save().then((result) => {
        console.log("result is ::>>", result, req.userId);
        User.findById(req.userId)
            .then(user => {
                creator = user;
                console.log('creator is ::>>', creator._id.toString());
                user.posts.push(post);
                user.save();
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({
                    message: 'cant find the logged in user'
                })
            })
        res.status(201).json({
            message: 'successfully added post',
            data: result,
            // creator: { name: creator.name }
        });
    })
        .catch((err) => {
            console.log(err);
            res.status(422).json({
                message: 'failed to save',
                error: err
            })
        });
};

module.exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            data: posts,
            message: 'data retrived successfully'
        })
    }
    catch {
        (err => {
            console.log(err), res.status(505).json({
                message: 'failed to fetch the data',
                data: [err]
            })
        });
    }
}