import { requestGraphql } from "../helpers/utils/request";
import { schemaValidator } from "../helpers/utils/schemaValidator";
import { queryData } from "../graphql/query/countries/country";
import { getObjectList } from "../helpers/utils";
import { countriesISO3 } from "../helpers/date/countriesISO3";
// import { expect } from "chai";

describe("Teste Query Country", () => {
  var region = getObjectList(countriesISO3);
  var responseBody = null;

  beforeAll(async () => {
    var paisISO3 = region.iso3
    try {
      responseBody = await requestGraphql(queryData(paisISO3));
      console.log(responseBody.body)
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
    const schema = require("../graphql/schema/contries/country.schema.json");
    try {
      await schemaValidator(responseBody.body, schema);
    } catch (error) {
      throw new Error(`Erro ao validar contrato: ${error.message}`);
    }
  });

  test(`Validar que os estados retornados são do pais ${region.iso3}`, () => {
    expect(responseBody.body.data.country.name).toEqual(region.nome)
  });
});
