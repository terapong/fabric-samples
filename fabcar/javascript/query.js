var express = require('express');
var path1 = require('path');
var app = express();
var layout = require('express-layout');
var engine = require('ejs-mate');
var bodyparser = require('body-parser');
var middleware = [
    layout(),
    express.static(path1.join(__dirname, 'public'))
]
app.use(middleware);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
})) 
const routes = require('./routes');
app.use('/', routes);
app.get('/', function(req, res) {
    res.render('index');
})

app.get('/display', function(req, res){

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        /*
        const request = {
            chaincodeId: 'fabcar',
            fcn: 'queryAllCars',
            args: ['']
        }
        */

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        
        const result = await contract.evaluateTransaction('queryAllCars');

        // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        /*
        app.get('/display', function(req, res){
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            res.render('display', {users:result});
        })

        app.listen(3001, function() {
            console.log("Server started on Port 3001");
            
        })
        */
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        var data = result.toString();
        var data2 = [];
        var label = [];
        var values = [];
        console.log(`---toto data---`);
        //removeving {} [] ""
        for(var i = 0; i < data.length; i++) {
            console.log(`toto data = ` + data);
            //{} {"[]
            if(data[i] != '{' && data[i] != '}' && data[i] != '{' && data[i] != '"' && data[i] != '[' && data[i] != ']') {
                data2.push(data[i]);
            }
        }
        //label
        var string;
        var j;
        for(var i = 0; i < data2.length; i++) {
            string = "";
            if(i == 0 || data2[i] == ',') {
                if(data2[i + 1] == ' ') {
                    i += 8;
                } if(i == 0) {
                    j = i;
                } else {
                    j = i + 1;
                }
                while(data2[j] != ':') {
                    string += data2[j];
                    j++;
                }
                label.push(string);
                i =-- j;
            }
        }

        //values
        for(var i = 0; i < data2.length; i++) {
            string = "";
            if(data2[i] == ':') {
                if(data2[i + 1] == 'c' && 
                data2[i + 2] == 'o' &&
                data2[i + 3] == 'l' &&
                data2[i + 4] == 'o' &&
                data2[i + 5] == 'u' &&
                data2[i + 6] == 'r') {
                    i += 7;
                }
                j = i + 1;
                while(data2[j] != ',') {
                    if(j == data2.length - 1) {
                        string += data2[j];
                        break;
                    }
                    string += data2[j];
                    j++;
                }
                values.push(string);
                i =-- j;
            }
        }

        res.render('display', {
            //users:result
            label:label,
            values:values
        });

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

})

app.listen(3001, function() {
    console.log("Server started on Port 3001");
    
})


