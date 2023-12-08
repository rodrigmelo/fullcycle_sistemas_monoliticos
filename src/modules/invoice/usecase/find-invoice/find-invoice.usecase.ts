import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  private _repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this._repository = repository;
  }

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._repository.find({ id: input.id });

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        city: invoice.address.city,
        street: invoice.address.street,
        state: invoice.address.state,
        number: invoice.address.number,
        complement: invoice.address.complement,
        zipCode: invoice.address.zipCode,
      },
      createdAt: invoice.createdAt,
      items: invoice.items.map((item) => {
        return { id: item.id.id, name: item.name, price: item.price };
      }),
      total: invoice.items.reduce((acc, { price }) => acc + price, 0),
    };
  }
}
