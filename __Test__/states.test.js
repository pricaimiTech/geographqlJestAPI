import { requestGraphql } from "../helpers/utils/request";
import { schemaValidator } from "../helpers/utils/schemaValidator";
import { queryDataStates } from "../graphql/query/states/states";

describe("Teste Query States", () => {
  var responseBody = null;

  beforeAll(async () => {
    try {
      responseBody = await requestGraphql(queryDataStates());
    } catch (error) {
      throw new Error(`Erro ao enviar solicitação GraphQL: ${error.message}`);
    }
  });

  test("Validar retorno de response válido", async () => {
    expect(responseBody.body).toBeDefined();
  });

  test("Verificar código de status", async () => {
    expect(responseBody.statusCode).toBe(200);
  });

  test("Validar contrato", async () => {
    const schema = require("../graphql/schema/states/states.schema.json");
    try {
      await schemaValidator(responseBody.body, schema);
    } catch (error) {
      throw new Error(`Erro ao validar contrato: ${error.message}`);
    }
  });
});
