const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../models/productModel");
const productService = require("../../../services/productService");

// função getAllProducts
describe("Chamada da Service - busca todos os produtos no BD", () => {
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

// função createProduct

describe("Chamada da Service - cria um novo produto", () => {
  // describe("quando os dados informados não são válidos", async () => {
  //   const data = {};

  //   it("retorna um boolean", async () => {
  //     const response = await productService.createProduct(data);

  //     expect(response).to.be.a("boolean");
  //   });

  //   it("o boolean é false", async () => {
  //     const response = await productService.createProduct(data);

  //     expect(response).to.be.equal(false);
  //   });
  // });

  describe("quando é inserido com sucesso", async () => {
    const data = {
      name: "produto 2",
      quantity: 2,
    };

    before(() => {
      const idExample = 1;

      sinon.stub(productModel, "createProduct").resolves({ id: idExample });
    });

    after(() => {
      productModel.createProduct.restore();
    });

    it("retorna um objeto", async () => {
      const response = await productService.createProduct(data);

      expect(response).to.be.a("object");
    });

    it('o objeto possui o "id" do novo produto inserido', async () => {
      const response = await productService.createProduct(data);

      expect(response).to.have.a.property("id");
    });
  });
});
