if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const { resolve, reject } = require('promise');

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true 
});

const loginEmployee = async (body) => {
    let searchOptions = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    console.log(body, searchOptions);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const loginCollection = client.db("authentication").collection("login");
            try{
                const employee = await loginCollection.find(searchOptions).toArray();
                console.log(employee);
                if(employee.length == 1 && await bcrypt.compare(body.pass, employee[0].pass)){
                    resolve("Success");
                }
                else{
                    resolve("Failure");
                }
            }catch{
                reject("Error in promise")
            }
        });
    });
};

const logoutEmployee = () => {

};

const registerEmployee = async (body) => {
    let searchOptions = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    console.log(body);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const loginCollection = client.db("authentication").collection("login");
            try{
                const hashedPassword = await bcrypt.hash(body.pass, 10);
                await loginCollection.insertOne({empID : body.empID, pass : hashedPassword}).then((res) => {
                    if(res.acknowledged){
                        resolve("Employee Registered Successfully in Authentication Database.");
                    }else{
                        resolve("Unable to register employee in Authentication Database.");
                    }
                });
            }catch{
                reject("Error in promise")
            }
        });
    });
};

const updatePassword = async (body) => {
    console.log(body);
    let searchOptions = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    console.log(searchOptions);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const loginCollection = client.db("authentication").collection("login");
            try{
                const employee = await loginCollection.find(searchOptions).toArray();
                console.log(employee);
                if(employee.length == 1 && await bcrypt.compare(body.currpass, employee[0].pass)){
                    const newHashedPassword = await bcrypt.hash(body.confirmpass, 10);
                    try{
                        await loginCollection.findOneAndUpdate(searchOptions, {$set: { pass : newHashedPassword}}).then((res) => {
                            console.log(res);
                            resolve("Password Update Successfully in Authentication Database.");
                        });
                    }
                    catch{
                        resolve("Unable to update Password in Authentication Database.");
                    }
                }
                else{
                    resolve("Incorrect user password");
                }
                resolve("Password Update Successfully");
            }catch{
                reject("Error in promise")
            }
        });
    });
};

const deleteEmployee = async (body) => {
    console.log(body);
    let searchOptions = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    console.log(searchOptions, body);
    return new Promise((resolve,reject) => {
        client.connect( async err => {
            const loginCollection = client.db("authentication").collection("login");
            try{
                await loginCollection.deleteOne(searchOptions).then((res) => {
                    console.log(res);
                    if(res.acknowledged){
                        resolve("Employee deleted from Authentication Database Successfully.");
                    }else{
                        reject("Unable to delete the employee from Authentication Database.");
                    }
                });
            }
            catch{
                reject("Error in promise.");
            }
        });
    });
};

module.exports = {
    loginEmployee,
    logoutEmployee,
    registerEmployee,
    updatePassword,
    deleteEmployee
};