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
    const input = {
      name: "invoiceName",
      document: "",
      street: "street1",
      number: "2",
      complement: "complemet",
      city: "city1",
      state: "state1",
      zipCode: "zipcode1",
      items: [
        {
          id: "11",
          name: "itemName",
          price: 12,
        },
      ],
    };

    const facade = InvoiceFacadeFactory.create();

    const output = await facade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);

    expect(output.street).toBe(input.street);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
    expect(output.city).toBe(input.city);
    expect(output.complement).toBe(input.complement);
    expect(output.number).toBe(input.number);

    expect(output.items).toHaveLength(1);
    expect(output.items[0].id).toBeDefined();
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
  });

  it("should find a invoice", async () => {
    const input = {
      name: "invoiceName",
      document: "",
      street: "street1",
      number: "2",
      complement: "complemet",
      city: "city1",
      state: "state1",
      zipCode: "zipcode1",
      items: [
        {
          id: "11",
          name: "itemName",
          price: 12,
        },
      ],
    };

    const facade = InvoiceFacadeFactory.create();

    const generateOutput = await facade.generate(input);
    const output = await facade.find({ id: generateOutput.id });

    expect(output.id).toBe(generateOutput.id);
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);

    expect(output.address.street).toBe(input.street);
    expect(output.address.state).toBe(input.state);
    expect(output.address.zipCode).toBe(input.zipCode);
    expect(output.address.city).toBe(input.city);
    expect(output.address.complement).toBe(input.complement);
    expect(output.address.number).toBe(input.number);

    expect(output.items).toHaveLength(1);
    expect(output.items[0].id).toBe(generateOutput.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
  });
});
