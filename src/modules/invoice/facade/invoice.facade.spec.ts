import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.factory.facade";
import InvoiceItems from "../domain/invoice-items.entity";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemsModel from "../repository/invoice-item.model";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
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

    const invoiceMock = new Invoice({
      name: "invoiceName",
      document: "document1",
      address: address,
      items: [invoiceItems],
    });

    const input = {
      name: invoiceMock.name,
      document: invoiceMock.document,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      items: [
        {
          id: invoiceItems.id.id,
          name: invoiceItems.name,
          price: invoiceItems.price,
        },
      ],
    };

    const facade = InvoiceFacadeFactory.create();

    const output = await facade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(invoiceMock.name);
    expect(output.document).toBe(invoiceMock.document);

    expect(output.street).toBe(invoiceMock.address.street);
    expect(output.state).toBe(invoiceMock.address.state);
    expect(output.zipCode).toBe(invoiceMock.address.zipCode);
    expect(output.city).toBe(invoiceMock.address.city);
    expect(output.complement).toBe(invoiceMock.address.complement);
    expect(output.number).toBe(invoiceMock.address.number);

    expect(output.items).toHaveLength(1);
    expect(output.items[0].id).toBeDefined();
    expect(output.items[0].name).toBe(invoiceItems.name);
    expect(output.items[0].price).toBe(invoiceItems.price);
  });
});
