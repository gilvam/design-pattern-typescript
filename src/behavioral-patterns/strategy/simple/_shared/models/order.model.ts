import { OrderStatusEnum } from './order-status.enum';

export class Order {
	constructor(
		public id: number,
		public address: string,
		public email: string,
		public phone: string,
		public status: OrderStatusEnum = OrderStatusEnum.CREATED,
		public shippedAt: Date = new Date()
	) {
	}
}
