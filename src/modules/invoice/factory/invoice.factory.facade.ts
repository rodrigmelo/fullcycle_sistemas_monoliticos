import InvoiceFacade from "../facade/invoce.facade";
import InvoiceRepostiory from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepostiory = new InvoiceRepostiory();

    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepostiory
    );
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepostiory);

    const invoiceFacade = new InvoiceFacade({
      generateInvoiceUseCase: generateInvoiceUseCase,
      findInvoiceUseCase: findInvoiceUseCase,
    });

    return invoiceFacade;
  }
}
