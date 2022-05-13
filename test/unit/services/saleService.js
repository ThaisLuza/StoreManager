const { expect } = require("chai");
const sinon = require("sinon");
const saleModel = require("../../../models/saleModel");
const saleService = require("../../../services/saleService");

describe("Service - getAllSales", () => {
  describe("quando não existe nenhuma venda", () => {
    before(() => {
      sinon.stub(saleModel, "getAllSales").resolves([]);
    });

    after(() => {
      saleModel.getAllSales.restore();
    });

    it("retorna um array", async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.an("array");
    });

    it("o array está vazio", async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.empty;
    });
  });
  describe("quando existem vendas cadastradas no BD", () => {
    before(() => {
      sinon.stub(saleModel, "getAllSales").resolves([
        {
          saleId: 1,
          date: "2022-05-12T19:39:02.000Z",
          productId: 1,
          quantity: 5,
        },
      ]);
    });

    after(() => {
      saleModel.getAllSales.restore();
    });

    it("retorna um array", async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.not.empty;
    });

    it("o array possui objetos", async () => {
      const [result] = await saleService.getAllSales();
      expect(result).to.be.an("object");
    });

    it("o objeto contem os atributos sale_id, product_id, date e quantity", async () => {
      const [result] = await saleService.getAllSales();
      expect(result).to.includes.all.keys("saleId", "productId", "quantity", "date");
    });
  });
});
