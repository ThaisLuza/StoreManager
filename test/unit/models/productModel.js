const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../models/productModel");
const connection = require("../../../models/connection");

// função getAllProducts
describe("Chamada do Model - busca todos os produtos no BD", () => {
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

//função createProduct
describe("Chamada do Model - cria um novo produto", () => {
  const data = {
    name: "produto 2",
    quantity: 2,
  };

  before(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("retorna um objeto", async () => {
      const response = await productModel.createProduct(data);
      expect(response).to.be.a("object");
    });

    it("o objeto possui o ID do novo produto inserido", async () => {
      const response = await productModel.createProduct(data);
      expect(response).to.have.a.property("id");
    });
  });
});
