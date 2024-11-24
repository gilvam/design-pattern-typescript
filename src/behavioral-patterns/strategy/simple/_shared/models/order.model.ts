import { OrderStatusEnum } from './order-status.enum';

export class Order {
	constructor(
		public status: OrderStatusEnum = OrderStatusEnum.PRE_CREATED,
		public id = 0,
		public address = '',
		public email = '',
		public phone = '',
		public shippedAt: Date = new Date()
	) {
	}
}
