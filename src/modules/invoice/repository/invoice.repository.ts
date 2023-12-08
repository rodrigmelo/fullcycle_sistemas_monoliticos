import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemsModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepostiory implements InvoiceGateway {
  async generate(input: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: input.id.id,
        document: input.document,
        street: input.address.street,
        state: input.address.state,
        zipcode: input.address.zipCode,
        city: input.address.city,
        number: input.address.number,
        complement: input.address.complement,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        items: input.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      },
      {
        include: [{ model: InvoiceItemsModel }],
      }
    );
  }
}
