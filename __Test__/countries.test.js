/**
 * importar request default
 */
import { requestGraphql } from "../helpers/utils/request";
import { schemaValidator } from "../helpers/utils/schemaValidator";

/**
 * query, variable e schema
 */
import { queryData } from "../graphql/query/countries/countries";

describe("Teste Query Countries", () => {
  var responseBody = null;
  var schema = require("../graphql/schema/contries/countries.schema.json");
  test("says hello", async () => {
    // send our request to the url of the test server
    responseBody = await requestGraphql(queryData("Southern_Europe"));
    console.log(responseBody.body);
  });

  test("Validar contrato", async () => {
    await schemaValidator(responseBody.body, schema);
  });
});
