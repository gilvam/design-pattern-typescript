import { Order } from '../../_shared/models/order.model';
import { IOrderNotifier } from './interfaces/order-notifier.interface';

export class SmsService implements IOrderNotifier {
	send(to: string, message: string) {
		console.info('SmsService: ', to, message);
		// ...
	}

	shipped(order: Order): void {
		let message = `Order ${ order.id } has been shipped :)`;
		this.send(order.phone, message);
	}
}
