const dbManager = require('../database.config/database.manager');
 async function createPost(req, res){
     if(!req.body){ //is empty?
         res.status(400).send({
             message: "Request body is empty"
         });
         return;
     }
     const newPostObject={ //create new one
         message: req.body.message,
         published_date: req.body.published_date,
         idUser: req.body.idUser
     }

     //
     dbManager.Post.create(newPostObject).then(
         data => {
             res.send(data);
         }
     ).catch(
         e => {
             console.log(e);
             res.status(500).send({
                 messsage: "Some error ocurred"
             });
         }
     );
}
async function findAllPosts (req, res){
    try {
        //Execute query
        const posts = await dbManager.Post.findAll ();
        
        //Send response
        res.json({
                data: posts
        });

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}
async function findAllPostsByUser (req, res){
    try {
        const { idUser } = req.params;

        //Execute query
        const post = await dbManager.Post.findAll({
            where: {
                idUser: idUser
            }
        });
        //Send response
        res.json(post);
    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}
async function findAllPostsByPublishedDate (req, res){
    try {
       const { published_date } = req.params;
       //Execute query
        const posts = await dbManager.Post.findAll ({
            where: {
                published_date: published_date
            }
        });
        
        //Send response
        res.json({
                data: posts
        });

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }

}
async function findPostById (req, res){
    try {
        const { idPost } = req.params;

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
            message: "Some error occurred"
        });
    }
}
async function deleteAllPosts (req, res){
    try {
        //Execute query
        const post = await dbManager.Post.destroy({
            where: {}
        });                    
        //Send response
        res.send('posts eliminated');

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}
async function deletePostByUserid (req, res){ 
    try {
        const { idUser } = req.params;
        //Execute query
        const post = await dbManager.Post.destroy({
            where: {
                idUser: idUser
            }
        });                    
        //Send response
        res.send('post delete with id user: ' + idUser);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }

}
async function deletePostByPublishedDate (req, res){ 
    try {
        const { published_date } = req.params;
        //Execute query
        const post = await dbManager.Post.destroy({
            where: {
                published_date: published_date
            }
        });                    
        //Send response
        res.send('post delete with published date: ' + published_date);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}
async function deletePostByPostid (req, res){ 
    try {
        const { idPost } = req.params;
        //Execute query
        const post = await dbManager.Post.destroy({
            where: {
                idPost: idPost
            }
        });                    
        //Send response
        res.send('post delete with id: ' + idPost);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }

}
async function updatePost (req, res){
    /**
     * TASK:
     * IMPLEMENT THE FUNCTION______________________- 
     */
    try {
        const { idPost } = req.params;
        //Execute query
        const post = await dbManager.Post.update(
            {message: req.body.message} ,{
            where: {
                idPost: idPost,   
            }
        });    
        //Send response
        res.send('post update with message: ' + req.body.message);
    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

exports.createPost = createPost;
exports.findAllPosts = findAllPosts;
exports.findAllPostsByUser = findAllPostsByUser;
exports.findAllPostsByPublishedDate = findAllPostsByPublishedDate;
exports.findPostById = findPostById;
exports.deleteAllPosts = deleteAllPosts;
exports.deletePostByUserid = deletePostByUserid;
exports.deletePostByPublishedDate = deletePostByPublishedDate;
exports.deletePostByPostid = deletePostByPostid;
exports.updatePost = updatePost;

