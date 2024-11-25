import { OrderService } from './order-service';
import { OrderStatusEnum } from '../_shared/models/order-status.enum';
import { Order } from '../_shared/models/order.model';
import { EmailService } from './services/email.service';
import { NotificationTypeEnum } from '../_shared/models/notification-type.enum';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';

describe('OrderService', () => {
	let order: Order;
	let orderService: OrderService;

	beforeEach(() => {
		order = new Order(OrderStatusEnum.CREATED, 1, 'av. x, 100', 'test@example.com', '123456789');
	});

	it('should ship order and send Email default notification', () => {
		const param = null as any;
		orderService = new OrderService(param);
		const spy = jest.spyOn((orderService as any).orderNotifier, 'shipped');

		orderService.ship(order);

		expect((orderService as any).orderNotifier).toBeInstanceOf(EmailService);
		expect(spy).toHaveBeenCalledWith(order);
	});

	it('should ship order and send email notification', () => {
		const param = NotificationTypeEnum.EMAIL;
		orderService = new OrderService(param);
		const spy = jest.spyOn((orderService as any).orderNotifier, 'shipped');

		orderService.ship(order);

		expect((orderService as any).orderNotifier).toBeInstanceOf(EmailService);
		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(order.shippedAt).toBeInstanceOf(Date);
		expect(spy).toHaveBeenCalledWith(order);
	});

	it('should ship order and send SMS notification', () => {
		const param = NotificationTypeEnum.SMS;
		orderService = new OrderService(param);
		const spy = jest.spyOn((orderService as any).orderNotifier, 'shipped');

		orderService.ship(order);

		expect((orderService as any).orderNotifier).toBeInstanceOf(SmsService);
		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(order.shippedAt).toBeInstanceOf(Date);
		expect(spy).toHaveBeenCalledWith(order);
	});

	it('should ship order and send Push notification', () => {
		const param = NotificationTypeEnum.PUSH;
		orderService = new OrderService(param);
		const spy = jest.spyOn((orderService as any).orderNotifier, 'shipped');

		orderService.ship(order);

		expect((orderService as any).orderNotifier).toBeInstanceOf(PushService);
		expect(order.status).toBe(OrderStatusEnum.SHIPPED);
		expect(order.shippedAt).toBeInstanceOf(Date);
		expect(spy).toHaveBeenCalledWith(order);
	});
});
