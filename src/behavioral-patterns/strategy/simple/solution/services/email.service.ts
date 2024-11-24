import { Order } from '../../_shared/models/order.model';
import { IOrderNotifier } from './interfaces/order-notifier.interface';

export class EmailService implements IOrderNotifier {
	send(to: string, subject: string, message: string) {
		console.info('EmailService: ', to, subject, message);
		// ...
	}

	shipped(order: Order): void {
		let subject = `Order ${ order.id } shipped`;
		let message = `Order number ${ order.id } has been shipped. --Yours Sincerely, Team`;
		this.send(order.email, subject, message);
	}
}
