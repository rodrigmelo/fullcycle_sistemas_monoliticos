import Order from "../domain/oder.entity";

export default interface CheckoutGateway {
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order | null>;
}
