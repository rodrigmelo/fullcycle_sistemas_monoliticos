import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
  generate(props: Invoice): Promise<void>;
}
