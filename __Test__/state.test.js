import { requestGraphql } from "../helpers/utils/request";
import { schemaValidator } from "../helpers/utils/schemaValidator";
import { queryDataStates } from "../graphql/query/states/states";
import { queryDataState } from "../graphql/query/states/state";
import { getRandomNumber } from "../helpers/utils/random";

describe("Teste Query State", () => {
  let stateObj = null;
  let responseBody = null;

  beforeAll(async () => {
    try {
      stateObj = await getRandomState();
      responseBody = await requestStateData(stateObj.node.country_code, stateObj.node.state_code);
    } catch (error) {
      throw new Error(`Erro durante a execução dos testes: ${error.message}`);
    }
  });

  async function getRandomState() {
    try {
      const statesResponse = await requestGraphql(queryDataStates());
      const index = getRandomNumber(0, statesResponse.body.data.states.totalCount);
      return statesResponse.body.data.states.edges[index];
    } catch (error) {
      throw new Error(`Erro ao obter estado aleatório: ${error.message}`);
    }
  }

  async function requestStateData(countryCode, stateCode) {
    try {
      return await requestGraphql(queryDataState(countryCode, stateCode));
    } catch (error) {
      throw new Error(`Erro ao enviar solicitação GraphQL para o estado: ${error.message}`);
    }
  }

  test("Validar retorno de response válido", async () => {
    expect(responseBody.body).toBeDefined();
  });

  test("Verificar código de status", async () => {
    expect(responseBody.statusCode).toBe(200);
  });

  test("Validar contrato", async () => {
    const stateSchema = require("../graphql/schema/states/state.schema.json");

    try {
      await schemaValidator(responseBody.body, stateSchema);
    } catch (error) {
      throw new Error(`Erro ao validar contrato: ${error.message}`);
    }
  });

  test("Validar que o estado retornou cidades", () => {
    expect(responseBody.body.data.state.cities.edges.length).toBeGreaterThanOrEqual(0);
  });
});
