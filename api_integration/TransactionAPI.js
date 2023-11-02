const axios = require("axios");
const fs = require('fs');
const jsonObj = require('../env.json');
const { expect } = require('chai');
const userObj = require('../users.json');


describe("Transaction API Integration Testing",() =>{
    before("Admin can login successfully", async ()=>{
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

    it("Deposit 2000 tk from System account to Agent", async () =>{
        const agentAccount = userObj[userObj.length - 3].phone_number;
        
        const response = await axios.post(`${jsonObj.baseUrl}/transaction/deposit`, {
            "from_account":"SYSTEM",
            "to_account":agentAccount,
            "amount":2000
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("Deposit successful");
    });

    it("Deposit 1500 tk to Customer01 from the Agent", async () =>{
        const agentAccount = userObj[userObj.length - 3].phone_number;
        const customer1Account = userObj[userObj.length - 2].phone_number;
        
        const response = await axios.post(`${jsonObj.baseUrl}/transaction/deposit`, {
            "from_account":agentAccount,
            "to_account":customer1Account,
            "amount":1500
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("Deposit successful");
    });

    it("Withdraw 500 tk by Customer01 to the Agent", async () =>{
        
        const customer1Account = userObj[userObj.length - 2].phone_number;
        const agentAccount = userObj[userObj.length - 3].phone_number;
        
        const response = await axios.post(`${jsonObj.baseUrl}/transaction/withdraw`, {
            "from_account":customer1Account,
            "to_account":agentAccount,
            "amount":500
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("Withdraw successful");
    });

    it("Send money 500 tk to Customer02 from Customer01", async () =>{
        
        const customer1Account = userObj[userObj.length - 2].phone_number;
        const customer2Account = userObj[userObj.length - 1].phone_number;
        
        const response = await axios.post(`${jsonObj.baseUrl}/transaction/sendmoney`, {
            "from_account":customer1Account,
            "to_account":customer2Account,
            "amount":500
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("Send money successful");
    });

    it("Payment 100 tk to Merchant by Customer02", async () =>{
        
        const customer2Account = userObj[userObj.length - 1].phone_number;
        const merchantAccount = "01686606905";
        
        const response = await axios.post(`${jsonObj.baseUrl}/transaction/payment`, {
            "from_account":customer2Account,
            "to_account":merchantAccount,
            "amount":100
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("Payment successful");
    });


    it("Check balance of Customer02", async () =>{
        
        const response = await axios.get(`${jsonObj.baseUrl}/transaction/balance/${userObj[userObj.length - 1].phone_number}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jsonObj.token,
                'X-AUTH-SECRET-KEY' : jsonObj.secretKey
            }
        }).then((res) => res.data);
        console.log(response);
        expect(response.message).contains("User balance");
    });
})