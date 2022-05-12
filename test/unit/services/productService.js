const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../models/productModel");
const productService = require("../../../services/productService");

describe("Busca todos os produtos no service", () => {
  describe("quando não existe nenhum produto", () => {
    before(() => {
      sinon.stub(productModel, "getAllProducts").resolves([]);
    });

    after(() => {
      productModel.getAllProducts.restore();
    });

    it("retorna um array", async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.an("array");
    });

    it("o array está vazio", async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.empty;
    });
  });

  describe("quando existem produtos cadastrados no BD", () => {
    before(() => {
      sinon.stub(productModel, "getAllProducts").resolves([
        {
          id: 1,
          name: "produto",
          quantity: 10,
        },
      ]);
    });

    after(() => {
      productModel.getAllProducts.restore();
    });

    it("retorna um array", async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it("o array possui objetos", async () => {
      const [result] = await productService.getAllProducts();
      expect(result).to.be.an("object");
    });

    it("o objeto contem os atributos id, name e quantity", async () => {
      const [result] = await productService.getAllProducts();
      expect(result).to.includes.all.keys("id", "name", "quantity");
    });
  });
});
