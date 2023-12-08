import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  GenerateInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
} from "./invoice.facade.interface";

interface InvoiceFacadeInterface {
  generateInvoiceUseCase: UseCaseInterface;
  findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateInvoiceUseCase: UseCaseInterface;
  private _findInvoiceUseCase: UseCaseInterface;

  constructor(props: InvoiceFacadeInterface) {
    this._generateInvoiceUseCase = props.generateInvoiceUseCase;
    this._findInvoiceUseCase = props.findInvoiceUseCase;
  }
  generateInvoiceUseCase: UseCaseInterface;
  findInvoiceUseCase: UseCaseInterface;

  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateInvoiceUseCase.execute(input);
  }

  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this._findInvoiceUseCase.execute(input);
  }
}
