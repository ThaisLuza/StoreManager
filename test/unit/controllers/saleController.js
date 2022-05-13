const { expect } = require("chai");
const sinon = require("sinon");
const saleController = require("../../../controllers/saleController");
const saleService = require("../../../services/saleService");

describe("Controller - getAllSales", () => {
  describe("quando não existe nenhuma venda", () => {
    const resultExecute = [[]];
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "getAllSales").resolves(resultExecute);
    });

    after(() => {
      saleService.getAllSales.restore();
    });

    it('é retornado o método "status" passando o código 200', async () => {
      await saleController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("é retornado o metodo json contendo um array", async () => {
      await saleController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
  describe("quando existem vendas cadastrados no DB", async () => {
    const response = {};
    const request = {};

    const salesMock = {
      saleId: 1,
      date: "2022-05-12T19:39:02.000Z",
      productId: 1,
      quantity: 5,
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "getAllSales").resolves([salesMock]);
    });

    after(() => {
      saleService.getAllSales.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await saleController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await saleController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

// linha pra ver se o código passa no github dessa vez