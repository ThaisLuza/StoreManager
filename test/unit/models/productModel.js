const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../models/productModel");
const connection = require("../../../models/connection");

describe("Busca todos os produtos no BD", () => {
  describe("quando não existe nenhum produto", () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an("array");
    });

    it("o array está vazio", async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.empty;
    });
  });

  describe("quando existem produtos cadastrados no BD", () => {
    const resultExecute = [
      {
        id: 1,
        name: "produto",
        quantity: 10,
      },
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it("o array possui objetos", async () => {
      const [result] = await productModel.getAllProducts();
      expect(result).to.be.an("object");
    });

    it("o objeto contem os atributos id, name e quantity", async () => {
      const [result] = await productModel.getAllProducts();
      expect(result).to.be.includes.all.keys("id", "name", "quantity");
    });
  });
});
