const request = require("supertest");
import { baseURL } from "../../environment/stg";
var chai = require("chai"),
  expect = chai.expect;

export async function requestGraphql(payload) {
  const response = await request(baseURL)
    .post("/graphql")
    .send(payload)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200);
  return response;
}
