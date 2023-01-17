/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.fabcar;

import java.util.ArrayList;
import java.util.List;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contact;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Info;
import org.hyperledger.fabric.contract.annotation.License;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import com.owlike.genson.Genson;

/**
 * Java implementation of the Fabric Salabun Contract described in the Writing Your
 * First Application tutorial
 */
@Contract(
        name = "Salabun",
        info = @Info(
                title = "Salabun contract",
                description = "The hyperlegendary Salabun contract",
                version = "0.0.1-SNAPSHOT",
                license = @License(
                        name = "Apache 2.0 License",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"),
                contact = @Contact(
                        email = "f.salabunr@example.com",
                        name = "F Salabunr",
                        url = "https://hyperledger.example.com")))
@Default
public final class Salabun implements ContractInterface {

    private final Genson genson = new Genson();

    private enum SalabunErrors {
        SALABUN_NOT_FOUND,
        SALABUN_ALREADY_EXISTS
    }

    /**
     * Retrieves a Salabun with the specified key from the ledger.
     *
     * @param ctx the transaction context
     * @param key the key
     * @return the Salabun found on the ledger if there was one
     */
    @Transaction()
    public Salabun querySalabun(final Context ctx, final String key) {
        ChaincodeStub stub = ctx.getStub();
        String salabunState = stub.getStringState(key);

        if (salabunState.isEmpty()) {
            String errorMessage = String.format("Salabun %s does not exist", key);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, SalabunErrors.SALABUN_NOT_FOUND.toString());
        }

        Salabun salabun = genson.deserialize(salabunState, Salabun.class);

        return salabun;
    }

    /**
     * Creates some initial Salabuns on the ledger.
     *
     * @param ctx the transaction context
     */
    @Transaction()
    public void initLedger(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        String[] salabunata = {
                "{ \"make\": \"Toyota\", \"model\": \"Prius\", \"color\": \"blue\", \"owner\": \"Tomoko\" }",
                "{ \"make\": \"Ford\", \"model\": \"Mustang\", \"color\": \"red\", \"owner\": \"Brad\" }",
                "{ \"make\": \"Hyundai\", \"model\": \"Tucson\", \"color\": \"green\", \"owner\": \"Jin Soo\" }",
                "{ \"make\": \"Volkswagen\", \"model\": \"Passat\", \"color\": \"yellow\", \"owner\": \"Max\" }",
                "{ \"make\": \"Tesla\", \"model\": \"S\", \"color\": \"black\", \"owner\": \"Adrian\" }",
                "{ \"make\": \"Peugeot\", \"model\": \"205\", \"color\": \"purple\", \"owner\": \"Michel\" }",
                "{ \"make\": \"Chery\", \"model\": \"S22L\", \"color\": \"white\", \"owner\": \"Aarav\" }",
                "{ \"make\": \"Fiat\", \"model\": \"Punto\", \"color\": \"violet\", \"owner\": \"Pari\" }",
                "{ \"make\": \"Tata\", \"model\": \"nano\", \"color\": \"indigo\", \"owner\": \"Valeria\" }",
                "{ \"make\": \"Holden\", \"model\": \"Barina\", \"color\": \"brown\", \"owner\": \"Shotaro\" }"
        };

        for (int i = 0; i < salabunData.length; i++) {
            String key = String.format("SALABUN%d", i);

            Salabun salabun = genson.deserialize(salabunData[i], Salabun.class);
            String salabunState = genson.serialize(salabun);
            stub.putStringState(key, salabunState);
        }
    }

    /**
     * Creates a new salabun on the ledger.
     *
     * @param ctx the transaction context
     * @param key the key for the new salabun
     * @param make the make of the new salabun
     * @param model the model of the new salabun
     * @param color the color of the new salabun
     * @param owner the owner of the new salabun
     * @return the created Salabun
     */
    @Transaction()
    public Salabun createSalabun(final Context ctx, final String key, final String make, final String model,
            final String color, final String owner) {
        ChaincodeStub stub = ctx.getStub();

        String salabunState = stub.getStringState(key);
        if (!salabunState.isEmpty()) {
            String errorMessage = String.format("Salabun %s already exists", key);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, SalabunErrors.SALABUN_ALREADY_EXISTS.toString());
        }

        Salabun salabun = new Salabun(make, model, color, owner);
        salabunState = genson.serialize(salabun);
        stub.putStringState(key, salabunState);

        return salabun;
    }

    /**
     * Retrieves all salabuns from the ledger.
     *
     * @param ctx the transaction context
     * @return array of Salabuns found on the ledger
     */
    @Transaction()
    public String queryAllSalabuns(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        final String startKey = "SALABUN1";
        final String endKey = "SALABUN99";
        List<SalabunQueryResult> queryResults = new ArrayList<SalabunQueryResult>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey, endKey);

        for (KeyValue result: results) {
            Salabun salabun = genson.deserialize(result.getStringValue(), Salabun.class);
            queryResults.add(new SalabunQueryResult(result.getKey(), salabun));
        }

        final String response = genson.serialize(queryResults);

        return response;
    }

    /**
     * Changes the owner of a salabun on the ledger.
     *
     * @param ctx the transaction context
     * @param key the key
     * @param newOwner the new owner
     * @return the updated Salabun
     */
    @Transaction()
    public Salabun changeSalabunOwner(final Context ctx, final String key, final String newOwner) {
        ChaincodeStub stub = ctx.getStub();

        String salabunState = stub.getStringState(key);

        if (salabunState.isEmpty()) {
            String errorMessage = String.format("Salabun %s does not exist", key);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, SalabunErrors.SALABUN_NOT_FOUND.toString());
        }

        Salabun salabun = genson.deserialize(salabunState, Salabun.class);

        Salabun newSalabun = new Salabun(salabun.getMake(), salabun.getModel(), salabun.getColor(), newOwner);
        String newSalabunState = genson.serialize(newSalabun);
        stub.putStringState(key, newSalabunState);

        return newSalabun;
    }
}
