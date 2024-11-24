import { NotificationTypeEnum } from '../_shared/models/notification-type.enum';
import { OrderStatusEnum } from '../_shared/models/order-status.enum';
import { Order } from '../_shared/models/order.model';
import { IOrderNotifier } from './services/interfaces/order-notifier.interface';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';

// TODO: valid to keep this class in a separate file
export abstract class OrderNotifierSelect {
	static get(notificationType: NotificationTypeEnum): IOrderNotifier {
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
	private orderNotifier: IOrderNotifier;
	order = new Order();

	constructor(notificationType: NotificationTypeEnum){
		this.orderNotifier = OrderNotifierSelect.get(notificationType);
	}

	ship(order: Order) {
		this.order = order;
		this.order.status = OrderStatusEnum.SHIPPED;
		this.order.shippedAt = new Date();
		this.orderNotifier.shipped(this.order);
	}
}
