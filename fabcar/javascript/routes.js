const express = require('express');
const router = express.Router();

router.get('/insert', function(req, res) {
    res.render('insert', {
        errors:{},
        succes:{}
    })
})

router.get('/search', function(req, res) {
    res.render('search', {
        errors:{}
    })
}) 

router.get('/update', function(req, res) {
    res.render('update', {
        errors:{}
    })
}) 

router.post("/update_c", function(req ,res) {
    var errors = [];
    if(!req.body.carid) {
        errors.push("Plz Enter Car ID");
    }
    if(!req.body.ncarowner) {
        errors.push("Plz Enter new Car owner");
    }
    if(errors.length > 0) {
        console.log(`TOTO 1 update_c NUUL`);
        res.render('update', {
            errors:{},
            succes:{}
        })
    }
    else {
 /*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        //await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        
        const result = await contract.evaluateTransaction('queryCar', req.body.carid);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        console.log(`TOTO 1 search_c CAR Id= ` + req.body.carid);
        console.log(`TOTO 1 search_c CAR ncarowner = ` + req.body.ncarowner);
        //console.log(`TOTO 1 search_c CAR = ` + result.toString());
        
        // res.render('display', {users:result});
        //res.render({users:result});
        
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

res.render('update', {
    errors:{},
    succes:"Car Owner Name is Successfully Updated!"
})

main();       
    }
})

router.post("/search_c", function(req ,res) {
    var errors = [];
    if(!req.body.carid) {
        errors.push("Plz Enter Car ID");
    }
    if(errors.length > 0) {
        console.log(`TOTO 1 search_c NUUL`);
        res.render('search', {
            errors:errors
        })
    }
    else {
        
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        //await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        
        const result = await contract.evaluateTransaction('queryCar', req.body.carid);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        console.log(`TOTO 1 search_c CAR Id= ` + req.body.carid);
        //console.log(`TOTO 1 search_c CAR Color = ` + req.body.carcolor);
        console.log(`TOTO 1 search_c CAR = ` + result.toString());
        
        // res.render('display', {users:result});
        //res.render({users:result});
        
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

res.render('search', {
    errors:{},
    succes:"One Car record Successfully Added into CouchDB"
})

main();

    }
})

router.post("/register_c", function(req ,res) {
    var errors = [];
    if(!req.body.carid) {
        errors.push("Plz Enter Car ID");
    }
    if(!req.body.carcolor) {
        errors.push("Plz choore car color");
    }
    if(!req.body.carcompany) {
        errors.push("Plz choore car company");
    }
    if(!req.body.carmodel) {
        errors.push("Plz choore car model");
    }
    if(!req.body.carowner) {
        errors.push("Plz Enter car owner");
    }
    if(errors.length > 0) {
        res.render('insert', {
            errors:errors,
            succes:{}
        })
    }
    else {
 
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        //await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        
        console.log(`TOTO 1 success 4`);

        console.log(`TOTO 1 register_c catid ` + req.body.carid);
        console.log(`TOTO 1 register_c carcolor ` + req.body.carcolor);
        console.log(`TOTO 1 register_c carcompany ` + req.body.carcompany);
        console.log(`TOTO 1 register_c carmodel ` + req.body.carmodel);
        console.log(`TOTO 1 register_c catcarownerid ` + req.body.carowner);
        console.log(`TOTO 1 createCar`, req.body.carid, req.body.carcompany, req.body.carmodel, req.body.carcolor, req.body.carowner);
        
        await contract.submitTransaction('createCar', req.body.carid, req.body.carcompany, req.body.carmodel, req.body.carcolor, req.body.carowner);

        console.log('Transaction has been submitted');

        /*
        res.render('insert', {
            errors:{},
            succes:"One Car record Successfully Added into CouchDB"
        })
        */
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

res.render('insert', {
    errors:{},
    succes:"One Car record Successfully Added into CouchDB"
})

main();
    }
})

module.exports = router