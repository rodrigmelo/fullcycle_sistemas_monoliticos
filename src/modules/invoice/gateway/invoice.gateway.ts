import Invoice from "../domain/invoice.entity";
import { FindInvoiceUseCaseInputDTO } from "../usecase/find-invoice/find-invoice.dto";

export default interface InvoiceGateway {
  generate(props: Invoice): Promise<void>;
  find(props: FindInvoiceUseCaseInputDTO): Promise<Invoice>;
}
