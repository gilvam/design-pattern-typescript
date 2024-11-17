
import { ConfigureService, OrderService } from './order-service';
import { NotificationTypeEnum } from '../_shared/models/notification-type.enum';
import { OrderStatusEnum } from '../_shared/models/order-status.enum';
import { Order } from '../_shared/models/order.model';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';

describe('OrderService', () => {
	let order: Order;
	let orderService: OrderService;

	beforeEach(() => {
		order = new Order(1, 'test@example.com', '123456789', OrderStatusEnum.CREATED);
	});

	it('should ship order and send email notification', () => {
		const serviceSelected = ConfigureService.configure(NotificationTypeEnum.EMAIL);
		const shippedSpy = jest.spyOn(serviceSelected, 'shipped');
		orderService = new OrderService(serviceSelected);

		orderService.shipOrder(order);

		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(order.shippedAt).toBeInstanceOf(Date);
		expect(shippedSpy).toHaveBeenCalledWith(order);
	});

	it('should ship order and send Email default notification', () => {
		const serviceSelected = ConfigureService.configure(null as any);
		const shippedSpy = jest.spyOn(serviceSelected, 'shipped');
		orderService = new OrderService(serviceSelected);

		orderService.shipOrder(order);

		expect(serviceSelected).toBeInstanceOf(EmailService);
		expect(shippedSpy).toHaveBeenCalledWith(order);
	});

	it('should ship order and send SMS notification', () => {
		const serviceSelected = ConfigureService.configure(NotificationTypeEnum.SMS);
		const shippedSpy = jest.spyOn(serviceSelected, 'shipped');
		orderService = new OrderService(serviceSelected);

		orderService.shipOrder(order);

		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(order.shippedAt).toBeInstanceOf(Date);
		expect(shippedSpy).toHaveBeenCalledWith(order);
	});

	it('should ship order and send Push notification', () => {
		const serviceSelected = ConfigureService.configure(NotificationTypeEnum.PUSH);
		const shippedSpy = jest.spyOn(serviceSelected, 'shipped');
		orderService = new OrderService(serviceSelected);

		orderService.shipOrder(order);

		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(order.shippedAt).toBeInstanceOf(Date);
		expect(shippedSpy).toHaveBeenCalledWith(order);
	});

	it('should configure and return the correct notifier service', () => {
		const emailNotifier = ConfigureService.configure(NotificationTypeEnum.EMAIL);
		const smsNotifier = ConfigureService.configure(NotificationTypeEnum.SMS);
		const pushNotifier = ConfigureService.configure(NotificationTypeEnum.PUSH);

		expect(emailNotifier).toBeInstanceOf(EmailService);
		expect(smsNotifier).toBeInstanceOf(SmsService);
		expect(pushNotifier).toBeInstanceOf(PushService);
	});
});
