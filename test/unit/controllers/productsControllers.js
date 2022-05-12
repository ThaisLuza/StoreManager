const { expect } = require("chai");
const sinon = require("sinon");
const productController = require("../../../controllers/productController");
const productService = require("../../../services/productService");

describe("Chamada do controller", () => {
  describe("quando não existe nenhum produto", () => {
    const resultExecute = [[]];
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAllProducts").resolves(resultExecute);
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('é retornado o método "status" passando o código 200', async () => {
      await productController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("é retornado o metodo json contendo um array", async () => {
      await productController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe("quando existem produtos cadastrados no DB", async () => {
    const response = {};
    const request = {};

    const productsMock = {
      id: 1,
      name: "produto",
      quantity: 10,
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAllProducts").resolves([productsMock]);
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
