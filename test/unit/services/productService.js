const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../models/productModel");
const productService = require("../../../services/productService");

// função getAllProducts
describe("Service - getAllProducts", () => {
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

// função getProductById
describe("Service - getProductById", () => {
  describe("quando não existe um produto com o ID informado", () => {
    // const id = 10;
    before(async () => {
      const execute = [[]];

      sinon.stub(productModel, "getProductsById").resolves(execute);
    });

    after(async () => {
      productModel.getProductsById.restore();
    });
    it("retorna um erro", async () => {
      try {
        await productService.getProductsById(10);
      } catch (error) {
        expect(error).to.be.a("object");
      }
    });
  });
  describe("quando existe um produto com o id informado", () => {
    before(() => {
      sinon.stub(productModel, "getProductsById").resolves({
        id: 1,
        name: "produto",
        quantity: 10,
      });
    });

    after(() => {
      productModel.getProductsById.restore();
    });
    it("retorna um objeto", async () => {
      const response = await productService.getProductsById(1);

      expect(response).to.be.an("object");
    });
    it("o objeto não está vazio", async () => {
      const response = await productService.getProductsById(1);

      expect(response).to.be.not.empty;
    });
    it("o objeto contem os atributos id, name e quantity", async () => {
      const item = await productService.getProductsById(1);
      expect(item).to.include.all.keys("id", "name", "quantity");
    });
  });
});

// função createProduct
describe("Service - createProduct", () => {
  describe("quando o produto já existe", async () => {
    const name = "produto";
    const quantity = 10;

    before(async () => {
      sinon
        .stub(productModel, "getProductByName")
        .resolves([{ name: "produto" }]);
    });
    after(async () => {
      productModel.getProductByName.restore();
    });

    it("retorna um erro", async () => {
      try {
        await productService.createProduct(name, quantity);
      } catch (error) {
        expect(error).to.be.a("object");
      }
    });
  });

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
