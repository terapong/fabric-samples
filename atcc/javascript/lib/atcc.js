/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0 car atcc
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Atcc extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const atccs = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < atccs.length; i++) {
            atccs[i].docType = 'atcc';
            await ctx.stub.putState('ATCC' + i, Buffer.from(JSON.stringify(atccs[i])));
            console.info('Added <--> ', atccs[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryAtcc(ctx, atccNumber) {
        const atccAsBytes = await ctx.stub.getState(atccNumber); // get the atcc from chaincode state
        if (!atccAsBytes || atccAsBytes.length === 0) {
            throw new Error(`${atccNumber} does not exist`);
        }
        console.log(atccAsBytes.toString());
        return atccAsBytes.toString();
    }

    async createAtcc(ctx, atccNumber, make, model, color, owner) {
        console.info('============= START : Create Atcc ===========');

        const atcc = {
            color,
            docType: 'atcc',
            make,
            model,
            owner,
        };atcc

        await ctx.stub.putState(atccNumber, Buffer.from(JSON.stringify(atcc)));
        console.info('============= END : Create Atcc ===========');
    }

    async queryAllAtccs(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeAtccOwner(ctx, atccNumber, newOwner) {
        console.info('============= START : changeAtccwner ===========');

        const atccAsBytes = await ctx.stub.getState(atccNumber); // get the atcc from chaincode state
        if (!atccAsBytes || atccAsBytes.length === 0) {
            throw new Error(`${atccNumber} does not exist`);
        }
        const atcc = JSON.parse(atccAsBytes.toString());
        atcc.owner = newOwner;

        await ctx.stub.putState(atccNumber, Buffer.from(JSON.stringify(atcc)));
        console.info('============= END : changeAtccOwner ===========');
    }

}

module.exports = Atcc;
