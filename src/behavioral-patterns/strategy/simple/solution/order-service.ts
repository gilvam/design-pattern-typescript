import { NotificationTypeEnum } from '../_shared/models/notification-type.enum';
import { OrderStatusEnum } from '../_shared/models/order-status.enum';
import { Order } from '../_shared/models/order.model';
import { IOrderNotifier } from './services/interfaces/order-notifier.interface';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';

export abstract class ConfigureService {
	static configure(notificationType: NotificationTypeEnum): IOrderNotifier {
		const notificationServiceMap: { [key in NotificationTypeEnum]: new () => IOrderNotifier } = {
			[NotificationTypeEnum.EMAIL]: EmailService,
			[NotificationTypeEnum.SMS]: SmsService,
			[NotificationTypeEnum.PUSH]: PushService,
			// new method Postal
			// new method CarrierPigeon
			// new method SmokeSignal
		};

		return new (notificationServiceMap[notificationType] || EmailService)();
	}
}

export class OrderService {
	constructor(private orderNotifier: IOrderNotifier) {
	}

	shipOrder(order: Order) {
		order.status = OrderStatusEnum.SHIPPED;
		order.shippedAt = new Date();
		this.orderNotifier.shipped(order);
	}
}
