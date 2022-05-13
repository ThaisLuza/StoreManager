const { expect } = require("chai");
const sinon = require("sinon");
const productController = require("../../../controllers/productController");
const productService = require("../../../services/productService");

// função gelAllProducts
describe("Controller - getAllProducts", () => {
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

// função getProductsById
describe("Controller - getProductById", () => {
  describe("quando não existe o produto com id informado", async () => {
    const response = {};
    const request = { params: id };
    const id = 10;

    before(() => {
      request.params = sinon.stub().returns(request);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      // response.send = sinon.stub().returns();
      sinon.stub(productService, "getProductsById").resolves(null);
    });
    after(() => {
      productService.getProductsById.restore();
    });
    it('é chamado o método "status" passando 404', async () => {
      await productController.getProductsById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
  describe("quando existe o produto com o id informado", () => {
    const response = {};
    const request = {};
    before(() => {
      request.params = {
        id: 1,
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, "getProductsById").resolves({
        id: 1,
        name: "produto",
        quantity: 10,
      });
    });
    after(() => {
      productService.getProductsById.restore();
    });
    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getProductsById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('é chamado o método "json" passando um objeto', async () => {
      await productController.getProductsById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

// função createProduct
describe("Controller - createProduct", () => {
  describe("quando é inserido com sucesso", async () => {
    const resultExecute = {
      id: 1,
      name: "produto 2",
      quantity: 2,
    };
    const response = {};
    const request = {};

    before(() => {
      request.body = { ...resultExecute };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, "createProduct").resolves(resultExecute);
    });

    after(() => {
      productService.createProduct.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it("é chamado o status com o objeto criado", async () => {
      await productController.createProduct(request, response);
      expect(response.json.calledWith(resultExecute)).to.be.equal(true);
    });
  });
});
