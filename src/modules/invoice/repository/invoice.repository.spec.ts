import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemsModel from "./invoice-item.model";
import InvoiceItems from "../domain/invoice-items.entity";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "../domain/invoice.entity";
import InvoiceRepostiory from "./invoice.repository";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Invoice repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a invoice", async () => {
    const invoiceItems = new InvoiceItems({
      name: "item",
      price: 2,
    });

    const address = new Address(
      "street1",
      "2",
      "complemet",
      "city1",
      "street1",
      "zipcode1"
    );

    const invoice = new Invoice({
      id: new Id("1"),
      name: "invoiceName",
      document: "document1",
      address: address,
      items: [invoiceItems],
    });

    const repository = new InvoiceRepostiory();
    await repository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
      include: [InvoiceItemsModel],
    });

    expect(invoiceDb.id).toBe("1");
    expect(invoiceDb.document).toBe(invoice.document);
    expect(invoice.name).toBe(invoice.name);

    expect(invoiceDb.street).toBe(invoice.address.street);
    expect(invoiceDb.number).toBe(invoice.address.number);
    expect(invoiceDb.state).toBe(invoice.address.state);
    expect(invoiceDb.zipcode).toBe(invoice.address.zipCode);
    expect(invoiceDb.complement).toBe(invoice.address.complement);
    expect(invoiceDb.city).toBe(invoice.address.city);

    expect(invoiceDb.items).toHaveLength(1);
    expect(invoiceDb.items[0].id).toBeDefined();
    expect(invoiceDb.items[0].name).toBe(invoiceItems.name);
    expect(invoiceDb.items[0].price).toBe(invoiceItems.price);
  });

  it("Should find a invoice", async () => {
    const invoiceItems = new InvoiceItems({
      name: "item1",
      price: 3,
    });

    const address = new Address(
      "street2",
      "3",
      "complemet2",
      "city2",
      "street2",
      "zipcode2"
    );

    const invoice = new Invoice({
      id: new Id("2"),
      name: "invoiceName1",
      document: "document2",
      address: address,
      items: [invoiceItems],
    });

    const repository = new InvoiceRepostiory();
    await repository.generate(invoice);

    const invoiceDb = await repository.find({ id: invoice.id.id });

    expect(invoiceDb.id.id).toBe("2");
    expect(invoiceDb.document).toBe(invoice.document);
    expect(invoice.name).toBe(invoice.name);

    expect(invoiceDb.address.street).toBe(invoice.address.street);
    expect(invoiceDb.address.number).toBe(invoice.address.number);
    expect(invoiceDb.address.state).toBe(invoice.address.state);
    expect(invoiceDb.address.zipCode).toBe(invoice.address.zipCode);
    expect(invoiceDb.address.complement).toBe(invoice.address.complement);
    expect(invoiceDb.address.city).toBe(invoice.address.city);

    expect(invoiceDb.items).toHaveLength(1);
    expect(invoiceDb.items[0].id).toBeDefined();
    expect(invoiceDb.items[0].name).toBe(invoiceItems.name);
    expect(invoiceDb.items[0].price).toBe(invoiceItems.price);
  });
});
