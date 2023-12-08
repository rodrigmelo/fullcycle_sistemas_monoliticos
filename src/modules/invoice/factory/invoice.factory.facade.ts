import GenerateInvoiceFacade from "../facade/invoce.facade";
import InvoiceRepostiory from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepostiory = new InvoiceRepostiory();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepostiory
    );
    const invoiceFacade = new GenerateInvoiceFacade(generateInvoiceUseCase);

    return invoiceFacade;
  }
}
