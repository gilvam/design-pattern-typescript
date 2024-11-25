import { Order } from '../../../_shared/models/order.model';

export interface IOrderNotifier {
	shipped(order: Order): void;
}
