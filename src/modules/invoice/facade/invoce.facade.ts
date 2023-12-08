import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import GenerateInvoiceFacadeInterface, {
  GenerateInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
} from "./invoice.facade.interface";

export default class GenerateInvoiceFacade
  implements GenerateInvoiceFacadeInterface
{
  constructor(private generateInvoiceUseCase: UseCaseInterface) {}
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this.generateInvoiceUseCase.execute(input);
  }
}
