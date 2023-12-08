import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("Find invoice test usecase", () => {
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
    id: new Id("1"),
    name: "invoiceName",
    document: "document1",
    address: address,
    items: [invoiceItems],
  });

  const MockRepository = () => {
    return {
      generate: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoiceMock)),
    };
  };

  it("Should find a invoice", async () => {
    const repository = MockRepository();
    const invoiceUseCase = new FindInvoiceUseCase(repository);

    const input = { id: "1" };

    const result = await invoiceUseCase.execute(input);

    expect(result.id).toBe(input.id);
    expect(result.name).toBe(invoiceMock.name);
    expect(result.document).toBe(invoiceMock.document);

    expect(result.address.city).toBe(invoiceMock.address.city);
    expect(result.address.state).toBe(invoiceMock.address.state);
    expect(result.address.street).toBe(invoiceMock.address.street);
    expect(result.address.number).toBe(invoiceMock.address.number);
    expect(result.address.zipCode).toBe(invoiceMock.address.zipCode);
    expect(result.address.complement).toBe(invoiceMock.address.complement);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toBe(invoiceItems.name);
    expect(result.items[0].price).toBe(invoiceItems.price);
  });
});
