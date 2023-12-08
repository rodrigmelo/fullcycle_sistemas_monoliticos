import { UpdatedAt } from "sequelize-typescript";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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

const MockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve(invoiceMock)),
  };
};

describe("Generate invoice usecase test", () => {
  it("Should create a invoice", async () => {
    const repository = MockRepository();
    const invoiceUseCase = new GenerateInvoiceUseCase(repository);

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

    const result = await invoiceUseCase.execute(input);

    expect(repository.generate).toHaveBeenCalled();

    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoiceMock.name);
    expect(result.document).toBe(invoiceMock.document);
    expect(result.total).toBeDefined();

    expect(result.id).toBeDefined();
    expect(result.city).toBe(address.city);
    expect(result.complement).toBe(address.complement);
    expect(result.number).toBe(address.number);
    expect(result.state).toBe(address.state);
    expect(result.street).toBe(address.street);
    expect(result.zipCode).toBe(address.zipCode);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toBe(invoiceItems.name);
    expect(result.items[0].price).toBe(invoiceItems.price);
  });
});
