const { expect } = require("chai");
const sinon = require("sinon");
const productController = require("../../../controllers/productController");
const productService = require("../../../services/productService");

// função gelAllProducts
describe("Chamada do Controller - busca todos produtos no BD", () => {
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

// função createProduct

describe('Chamada do Controller - cria um novo produto', ()=>{
  describe('quando os dados informados não são válidos', async() =>{
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves(false);
    });

    after(() => {
      productService.createProduct.restore();
    });

    it("é chamado o status com o código 400", async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem de erro', async () => {
      await productController.createProduct(request, response);

      expect(response.send.calledWith(error.message)).to.be.equal(true);
    });
  })
  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "produto 2",
        quantity: 2,
      };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productService, "createProduct").resolves(true);
    });

    after(() => {
      productService.createProduct.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o status com o objeto criado', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(
        true
      );
    });
})
})
