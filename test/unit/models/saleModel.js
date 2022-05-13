const { expect } = require("chai");
const sinon = require("sinon");
const saleModel = require("../../../models/saleModel");
const connection = require("../../../models/connection");

//função getAllSales
describe("Chamada do Model - getAllSales", () => {
  describe("quando não existe nenhuma venda", () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an("array");
    });

    it("o array está vazio", async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.empty;
    });
  });

  describe("quando existem vendas cadastradas no BD", () => {
    const resultExecute = [
      {
        saleId: 1,
        date: "2022-05-12T19:39:02.000Z",
        productId: 1,
        quantity: 5,
      },
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.not.empty;
    });

    it("o array possui objetos", async () => {
      const [result] = await saleModel.getAllSales();
      expect(result).to.be.an("object");
    });

    it("o objeto contem os atributos saleId, date, productId e quantity", async () => {
      const [result] = await saleModel.getAllSales();
      expect(result).to.be.includes.all.keys('saleId','date', 'productId', 'quantity');
    });
  });
});
