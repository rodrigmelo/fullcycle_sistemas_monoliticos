import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private _repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this._repository = repository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    );

    const items = input.items.map(
      (item) => new InvoiceItems({ name: item.name, price: item.price })
    );

    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: address,
      items: items,
    });

    await this._repository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      city: invoice.address.city,
      street: invoice.address.street,
      state: invoice.address.state,
      number: invoice.address.number,
      complement: invoice.address.complement,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => {
        return { id: item.id.id, name: item.name, price: item.price };
      }),
      total: invoice.items.reduce((acc, { price }) => acc + price, 0),
    };
  }
}
