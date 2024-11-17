import { NotificationTypeEnum } from '../_shared/models/notification-type.enum';
import { OrderStatusEnum } from '../_shared/models/order-status.enum';
import { Order } from '../_shared/models/order.model';
import { AppConfig } from '../_shared/models/app-config.model';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';

export class OrderService {
	constructor(
		public appConfig: AppConfig,
		public emailService: EmailService,
		public smsService: SmsService,
		public pushService: PushService,
	) {
	}

	shipOrder(order: Order) {
		order.status = OrderStatusEnum.SHIPPED;
		order.shippedAt = new Date();

		if (this.appConfig.notificationType === NotificationTypeEnum.EMAIL) {
			let subject = `Order ${ order.id } shipped`;
			let message = `Order number ${ order.id } has been shipped. --Yours Sincerely, Team`;
			// more 5 methods
			this.emailService.send(order.email, subject, message);
		} else if (this.appConfig.notificationType === NotificationTypeEnum.SMS) {
			let message = `Order ${ order.id } has been shipped :)`;
			// more 2 methods
			this.smsService.send(order.phone, message);
		} else if(this.appConfig.notificationType === NotificationTypeEnum.PUSH) {
			let message = `Order ${ order.id } has been shipped!`;
			// more 1 method
			this.pushService.send(order.phone, message);
		}
		// new method Postal
		// new method CarrierPigeon
		// new method SmokeSignal
	}
}
