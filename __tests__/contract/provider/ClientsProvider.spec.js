// this will be in the provider's project only 
const path = require("path");
// The next line gets the contracts from the pact broker and verifies whether or not the contract is following expectations.
const { Verifier } = require("@pact-foundation/pact");
// This line imports the server as well as data. We can create the server with the existing JSON file.
const { server, importData } = require("../../../src/provider");
// (Remember that the server does not require importing anything related to the consumer.
// We simply need to run the real server and then run the contracts against it.)
const SERVER_URL = "http://localhost:8081";
// Here we will listen to the server on the specified port, then import and inject the data.
server.listen(8081, () => {
    //here we are testing with real dependencias You test against the actual service but use mocks to avoid issues associated with End-to-End testing. 
    //Subsequently, tests are representative of real world application workflows and contracts.
    importData();
    console.log("Clients Service listening on ${SERVER_URL}");
});
// Now, we create the test itself
describe("Clients Service Validation", () => {
    it("validates the expections of Clients Service", () => {
        // we need to send the options
        let opts = {
            provider: "Clients Service",
            // logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            pactUrls: [
                path.resolve(process.cwd(), "./__tests__/contract/pacts/frontend-clientsservice.json"),
            ],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: false,
            providerVersion: "1.0.0"
        }; // end let
        // output is the expectations we set in the contract
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification Complete!");
            console.log(output);
        }); // end return
    }); // end it
}); // end describe("Clients Service Validation"