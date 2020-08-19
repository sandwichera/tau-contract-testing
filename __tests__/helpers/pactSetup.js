const path = require("path")
const Pact = require("@pact-foundation/pact").Pact

// First, the port
global.port = 8081;
// Second, the details for the instance of the mock
global.provider = new Pact ({
    // we use the port
    port: global.port,
    // then we add the path where the result logs will be stored - the logs folder is created automatically with the first run 
    log: path.resolve(process.cwd(), "__tests__/contract/logs", "logs-pact.log"),
    // log: path.resolve(process.cwd(), "__tests__/contract/logs", "mockserver-integration.log"),
    // now where we will save the pacts
    dir: path.resolve(process.cwd(), "__tests__/contract/pacts"),
    // spec is simply a specification of Pact for other languages and is part of the contract structure.
    // JVM uses a value of 3 while all other languages use a value of 2.
    spec: 2,
    logLevel: 'INFO',
    // How we are going to update the results - A value of “overwrite” for 
    // pactfileWriteMode will overwrite and truncate existing Pact files on each test execution while a value of “update” will append to a Pact file.
    pactfileWriteMode: "overwrite",
    // Name of the consumer
    consumer: "FrontEnd",
    // name of the provider
    provider: "ClientsService",
});