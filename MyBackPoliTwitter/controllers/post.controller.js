/**
 * TASK:
 * IMPLEMENT THE CONTROLLER 
 */
const dbManager = require('../database.config/database.manager');
const operator = require('sequelize');
const db = require('../database.config/database.manager');
async function createPost(req, res) {
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }
    // CREATING THE OBJECT TO PERSIST
    const newPostObject = {
        message: req.body.message,
        published_date: req.body.published_date,
        idUser: req.body.idUser,
        device: req.body.device,
        location: req.body.location
    }
    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.Post.create(newPostObject).then(
        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred cant create object"
            });
        }
    );
}
/**
 * GEt all post
 */
async function findAllPost(req, res) {
    try {
        //Execute query
        const post = await dbManager.Post.findAll({});

        //Send response
        res.json(post);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred cant find all post"
        });
    }
}

/**
 * Get ONLY ONE POST
 */
async function findOnePost(req, res) {
    try {
        const {
            idPost
        } = req.params;

        //Execute query
        const post = await dbManager.Post.findOne({
            where: {
                idPost: idPost
            }
        });
        //Send response
        res.json(post);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred cant find post by id"
        });
    }
}

/**
 * Update post by ID
 */
async function updatePost(req, res) {
    /**
     * TASK: Completed
     * IMPLEMENT THE FUNCTION________- 
     */

    try {

        const {
            idPost
        } = req.params;

        //search user by id
        const post = await dbManager.Post.findOne({
            where: {
                idPost: idPost
            }
        });

        if (!req.body) {
            res.status(400).send({
                message: "Request body is empty!!!!"
            });
            return;
        } else {
            if (req.body.message) {
                post.message = req.body.message;
            }

            if (req.body.published_date) {
                post.published_date = req.body.published_date;
            }
        }

        post.save().then(
            data => {
                res.send(data);
            }
        ).catch(
            e => {
                console.log(e);
                res.status(500).send({
                    message: "Some error occurred"
                });
            }
        );

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred cant update post"
        });
    }
}


/**
 * Delete an existen post by id
 */
async function deletePostByID(req, res) {
    /**
     * TASK: Completed
     * IMPLEMENT THE FUNCTION________- 
     */

    try {
        const {
            idPost
        } = req.params;

        //search user by id
        const post = await dbManager.Post.findOne({
            where: {
                idPost: idPost
            }
        });

        await post.destroy()

        res.send({
            message: post.message + " has been deleted successfully"
        });


    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred cant delate that id post"
        });
    }

}

async function deleteAllPost(req, res) {
    /**
     * TASK: Completed
     * IMPLEMENT THE FUNCTION________- 
     */

    try {

        try {
            while (dbManager.Post.findOne() != null) {
                const postDelete = await dbManager.Post.findOne();
                await postDelete.destroy();
            }
        } catch {
            res.send({
                message: "all posts has been deleted successfully"
            });
        }
    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred cant delate all post"
        });
    }
}


async function findAllPostByCreatedDate(req, res) {
    try {
        const {
            date
        } = req.params;
        //Execute query
        const post = await dbManager.Post.findOne({
            where: {
                published_date: date
            }
        });
        //Send response
        res.json(post);
    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred cant find all posts"
        });
    }
}
exports.createPost = createPost;
exports.findAllPost = findAllPost;
exports.findOnePost = findOnePost;
exports.updatePost = updatePost;
exports.deletePostByID = deletePostByID;
exports.deleteAllPost = deleteAllPost;
exports.findAllPostByCreatedDate = findAllPostByCreatedDate;
