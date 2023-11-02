const axios = require("axios");
const fs = require('fs');
const jsonObj = require('../env.json');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const randomId = require('../generateRandomId');
const userObj = require('../users.json');

describe("User API Integration Testing",()=>{
    it("Admin can login successfully", async ()=>{
        const response =await axios.post(`${jsonObj.baseUrl}/user/login`, {
            "email": "salman@roadtocareer.net",
            "password": "1234"
        }, {
            headers: {
                'Content-Type': 'application/json' 
            }
        }).then((res)=>res.data);
        console.log(response);
        fs.writeFileSync('./env.json', JSON.stringify({
            ...jsonObj, token: response.token
        }));
    });

    it("Create Agent by Admin",async () =>{
        const response = await axios.post(`${jsonObj.baseUrl}/user/create`, {
            "name":faker.person.fullName(),
            "email":faker.internet.email(),
            "password":"1234",
            "phone_number":`0171${randomId(1000000,9999999)}`,
            "nid":`123${randomId(1000,9999)}`,
            "role":"Agent" 
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("User created");
        

        let newUserObj = {
            id : response.user.id,
            name : response.user.name,
            email : response.user.email,
            phone_number : response.user.phone_number,
            nid : response.user.nid,
            role: response.user.role
        }

        userObj.push(newUserObj);
        fs.writeFileSync('./users.json', JSON.stringify(userObj))
    })

    it("Create Customer01 by Admin",async () =>{
        const response = await axios.post(`${jsonObj.baseUrl}/user/create`, {
            "name":faker.person.fullName(),
            "email":faker.internet.email(),
            "password":"1234",
            "phone_number":`0171${randomId(1000000,9999999)}`,
            "nid":`123${randomId(1000,9999)}`,
            "role":"Customer" 
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("User created");

        let newUserObj = {
            id : response.user.id,
            name : response.user.name,
            email : response.user.email,
            phone_number : response.user.phone_number,
            nid : response.user.nid,
            role: response.user.role
        }

        userObj.push(newUserObj);
        fs.writeFileSync('./users.json', JSON.stringify(userObj))
    })

    it("Create Customer02 by Admin",async () =>{
        const response = await axios.post(`${jsonObj.baseUrl}/user/create`, {
            "name":faker.person.fullName(),
            "email":faker.internet.email(),
            "password":"1234",
            "phone_number":`0171${randomId(1000000,9999999)}`,
            "nid":`123${randomId(1000,9999)}`,
            "role":"Customer" 
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("User created");

        let newUserObj = {
            id : response.user.id,
            name : response.user.name,
            email : response.user.email,
            phone_number : response.user.phone_number,
            nid : response.user.nid,
            role: response.user.role
        }

        userObj.push(newUserObj);
        fs.writeFileSync('./users.json', JSON.stringify(userObj))
    })
})