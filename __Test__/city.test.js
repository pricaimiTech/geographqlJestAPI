import { requestGraphql } from "../helpers/utils/request";
import { schemaValidator } from "../helpers/utils/schemaValidator";
import { queryDataStates } from "../graphql/query/states/states";
import { queryDataCities } from "../graphql/query/cities/cities";
import { queryDataCity } from "../graphql/query/cities/city";
import { getRandomNumber } from "../helpers/utils/random";

describe("Teste Query City", () => {
  let stateObj = null;
  let citiesObj = null;
  let responseBody = null;

  beforeAll(async () => {
    try {
      stateObj = await getRandomState();
      citiesObj = await requestCitiesData(stateObj.cursor);
      responseBody = await requestCityData(citiesObj.node.id);
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
      const citiesResponse = await requestGraphql(queryDataCities(cursor));
      const index = getRandomNumber(0, citiesResponse.body.data.cities.totalCount);
      return citiesResponse.body.data.cities.edges[index];
    } catch (error) {
      throw new Error(`Erro ao enviar solicitação GraphQL para o estado: ${error.message}`);
    }
  }

  async function requestCityData(cityCursor) {
    try {
      return await requestGraphql(queryDataCity(cityCursor));
    } catch (error) {
      throw new Error(`Erro ao enviar solicitação GraphQL para a cidade: ${error.message}`);
    }
  }

  test("Validar retorno de response válido", async () => {
    expect(responseBody.body).toBeDefined();
  });

  test("Verificar código de status", async () => {
    expect(responseBody.statusCode).toBe(200);
  });

  test("Validar contrato", async () => {
    const citySchema = require("../graphql/schema/cities/city.schema.json");

    try {
      await schemaValidator(responseBody.body, citySchema);
    } catch (error) {
      throw new Error(`Erro ao validar contrato: ${error.message}`);
    }
  });

  test("Validar a sigla do País", () => {
    expect(responseBody.body.data.city.country_code).toEqual(citiesObj.node.country_code);
  });
  
});
