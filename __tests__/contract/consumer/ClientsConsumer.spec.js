// so that we don't leave variables undeclared and things like that
"use strict";

// adding the libraries
const { Matchers } = require("@pact-foundation/pact");
// get the consumer functions from the endpoints
const { getClients, postClient } = require("../../../src/consumer");

// the tests for those endpoints will live inside here: 
describe("Clients Service", () => {
    // declaring the constants with the body of the request
    const GET_EXPECTED_BODY = [{
        "firstName": "Lisa",
        "lastName": "Simpson",
        "age": 8,
        "id": 1
    },
    {
        "firstName": "Wonder",
        "lastName": "Woman",
        "age": 30,
        "id": 2
    },
    {
        "firstName": "Homer",
        "lastName": "Simpson",
        "age": 39,
        "id": 3
    }];
    // Pacts will verify after each run that contracts are correct from the provider side
    afterEach(() => provider.verify());

    // Declaring all the things we have to use before each test
    describe("GET Clients", () => {
        beforeEach(() => {
            const interaction = {
                // state is the title of the scenario
                state: "I have a list of clients",
                // uponReceiving is a description of what we are going to send
                uponReceiving: "The list of all the clients",
                // This is exactly what we are sending, the metas
                withRequest: {
                    method: "GET",
                    path: "/clients",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                }, // end withRequest
                // this is the expected results
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_EXPECTED_BODY,
                }, // end willRespondWith
            };
            return provider.addInteraction(interaction);
        }) // end beforeEach
        // Now we add the assertions
        test("Returns the correct header, status code and body", async () => {
            const response = await getClients();
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            expect(response.data).toEqual(GET_EXPECTED_BODY);
            expect(response.status).toEqual(200);
        }); // end test
    }); // end describe("GET Clients")
    // 3.2 6:56 timestamp - creating another example for the body request
    const POST_BODY = {
        firstName: "Fran",
        lastName: "Cano",
        age: 42
    };
    const POST_EXPECTED_BODY = {
        firstName: POST_BODY.firstName,
        lastName: POST_BODY.lastName,
        age: POST_BODY.age,
        id: 3
    };

    describe("POST Client", () => {
        beforeEach(() => {
            const interaction = {
                state: "I create a new client",
                uponReceiving: "a request to create a client with firstname and lastname",
                withRequest: {
                    method: "POST",
                    path: "/clients",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: POST_BODY,
                },
                willRespondWith: {
                    status: 200,
                    // Matchers.like (the type is the same) gives us more flexibility with the response body
                    body: Matchers.like(POST_EXPECTED_BODY).contents,
                }
            };
            return provider.addInteraction(interaction);
        }); // end beforeEach
        test("returns correct body, header and status code", async () => {
            const response = await postClient(POST_BODY);
            console.log(response.data);
            // we test that the ID is returned in the response
            expect(response.data.id).toEqual(3);
            expect(response.status).toEqual(200);
        }); // end test
    });// end describe("POST Client") 
}); // end describe("Clients Service")