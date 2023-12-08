import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO } from "../usecase/find-invoice/find-invoice.dto";
import InvoiceItemsModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepostiory implements InvoiceGateway {
  async find(props: FindInvoiceUseCaseInputDTO): Promise<Invoice> {
    console.log("props", props.id);
    const result = await InvoiceModel.findOne({
      where: { id: props.id },
      include: [InvoiceItemsModel],
    });

    if (!result) {
      throw new Error(`Invoice with id ${props.id} not found`);
    }

    const address = new Address(
      result.street,
      result.number,
      result.complement,
      result.city,
      result.state,
      result.zipcode
    );

    const items = result.items.map((item) => {
      return new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      });
    });

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: address,
      items: items,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  async generate(input: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: input.id.id,
        document: input.document,
        street: input.address.street,
        state: input.address.state,
        zipcode: input.address.zipCode,
        name: input.name,
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
