import { OrderService } from './order-service';
import { AppConfig } from '../_shared/models/app-config.model';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';
import { NotificationTypeEnum } from '../_shared/models/notification-type.enum';
import { OrderStatusEnum } from '../_shared/models/order-status.enum';
import { Order } from '../_shared/models/order.model';

describe('OrderService', () => {
	let orderService: OrderService;
	let appConfig: AppConfig;
	let emailService: jest.Mocked<EmailService>;
	let smsService: jest.Mocked<SmsService>;
	let pushService: jest.Mocked<PushService>;

	beforeEach(() => {
		appConfig = { notificationType: NotificationTypeEnum.EMAIL } as AppConfig;
		emailService = { send: jest.fn() } as jest.Mocked<EmailService>;
		smsService = { send: jest.fn() } as jest.Mocked<SmsService>;
		pushService = { send: jest.fn() } as jest.Mocked<PushService>;
		orderService = new OrderService(appConfig, emailService, smsService, pushService);
	});

	it('should ship order and send email notification', () => {
		const order = new Order(OrderStatusEnum.CREATED, 1, 'Av. x', 'test@example.com', '123456789');
		orderService.appConfig.notificationType = NotificationTypeEnum.EMAIL;

		orderService.shipOrder(order);

		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(emailService.send).toHaveBeenCalledWith(
			order.email,
			'Order 1 shipped',
			'Order number 1 has been shipped. --Yours Sincerely, Team'
		);
	});

	it('should ship order and send SMS notification', () => {
		const order = new Order(OrderStatusEnum.CREATED, 1, 'Av. x', 'test@example.com', '123456789');
		orderService.appConfig.notificationType = NotificationTypeEnum.SMS;

		orderService.shipOrder(order);

		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(smsService.send).toHaveBeenCalledWith(order.phone, 'Order 1 has been shipped :)');
	});

	it('should ship order and send Push notification', () => {
		const order = new Order(OrderStatusEnum.CREATED, 1, 'Av. x', 'test@example.com', '123456789');
		orderService.appConfig.notificationType = NotificationTypeEnum.PUSH;

		orderService.shipOrder(order);

		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(pushService.send).toHaveBeenCalledWith(order.phone, 'Order 1 has been shipped!');
	});
});
