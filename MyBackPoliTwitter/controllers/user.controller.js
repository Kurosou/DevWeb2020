const dbManager = require ('../database.config/database.manager');
const operator = require('sequelize');
const db = require('../database.config/database.manager');

/**
 * Creation of an user
 * @param {*} userObject JSON Object with User information
 */
async function createUser (req, res) {
    
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
          message: "Request body is empty!!!!"
        });
        return;
    }
    
    // CREATING THE OBJECT TO PERSIST
    const newUserObject = {
        username: req.body.username,
        creation_date: req.body.creation_date
    }
    
    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.User.create(newUserObject).then (
        data => {
            res.send (data);
        }
    ).catch (
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred"
            });
        }
    );
}

/**
 * GEt all users
 */
async function findAllUsers (req, res){
    try {
        //Execute query
        const users = await dbManager.User.findAll({});
        
        //Send response
        res.json(users);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Get user by id
 */
async function findOneUser (req, res){
    try {
        const { idUser } = req.params;

        //Execute query
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        //Send response
        res.json(user);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Update user by ID
 */
async function updateUser (req, res){
    /**
    * TASK: Completed
    * IMPLEMENT THE FUNCTION______________________- 
    */

    try{

        const { idUser } = req.params;

        //search user by id
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });

        if(!req.body){
            res.status(400).send({
                message: "Request body is empty!!!!"
              });
              return;
        }else {
            if(req.body.username){
                user.username = req.body.username;
            }

            if(req.body.creation_date){
                user.creation_date = req.body.creation_date;
            }
        }
        
        user.save().then (
            data => {
                res.send (data);
            }
        ).catch (
            e => {
                console.log(e);
                res.status(500).send({
                    message: "Some error occurred"
                });
            }
        );

    }catch(e){
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Delete an existen user by username
 * @param {*} req 
 * @param {*} res 
 */
async function deleteUserByUsername (req, res){ 
    /**
    * TASK: Completed
    * IMPLEMENT THE FUNCTION______________________- 
    */

    try{
        const { username } = req.params;

        //search user by id
        const user = await dbManager.User.findOne({
            where: {
                username: username
            }
        });

        await user.destroy()

        res.send({
            message: username+" has been deleted successfully"
        });


    }catch(e){
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function deleteAllUsers (req, res){
    /**
    * TASK: Completed
    * IMPLEMENT THE FUNCTION______________________- 
    */

    try{
        
        try{
            while(dbManager.User.findOne()!=null){
                const userDelete = await dbManager.User.findOne();
                await userDelete.destroy();
            }
        }catch{
            res.send({
                message: "all users has been deleted successfully"
            });
        }
    }catch(e){
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }}

async function findAllUsersByCreatedDate (req, res){
    try {
        const { date } = req.params;

        //Execute query
        const user = await dbManager.User.findOne({
            where: {
                creation_date: date
            }
        });
        //Send response
        res.json(user);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}


exports.createUser = createUser; 
exports.findAllUsers = findAllUsers; 
exports.findOneUser = findOneUser; 
exports.updateUser = updateUser;
exports.deleteUserByUsername = deleteUserByUsername;
exports.deleteAllUsers = deleteAllUsers;
exports.findAllUsersByCreatedDate = findAllUsersByCreatedDate;
