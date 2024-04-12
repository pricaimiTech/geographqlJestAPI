import { requestGraphql } from "../helpers/utils/request";
import { schemaValidator } from "../helpers/utils/schemaValidator";
import { queryDataStates } from "../graphql/query/states/states";
import { queryDataCities } from "../graphql/query/cities/cities"; 
import { getRandomNumber } from "../helpers/utils/random";

describe("Teste Query Cities", () => {
  let stateObj = null;
  let responseBody = null;

  beforeAll(async () => {
    try {
      stateObj = await getRandomState();
      responseBody = await requestCitiesData(stateObj.cursor);
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

  async function requestCitiesData(cursor) {
    try {
      return await requestGraphql(queryDataCities(cursor));
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
    const stateSchema = require("../graphql/schema/cities/cities.schema.json");

    try {
      await schemaValidator(responseBody.body, stateSchema);
    } catch (error) {
      throw new Error(`Erro ao validar contrato: ${error.message}`);
    }
  });

  test("Validar que as cidades pertencem ao estado dos US", () => {
    const cities = responseBody.body.data.cities.edges;
    let allInUS = true;
  
    cities.forEach(city => {
      if (city.node.country_code !== 'US') {
        allInUS = false;
      }
    });
  
    expect(allInUS).toBe(true);
  });
  
});
