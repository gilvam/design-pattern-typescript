import { Order } from './behavioral-patterns/strategy/simple/_shared/models/order.model';
import { OrderService } from './behavioral-patterns/strategy/simple/solution/order-service';
import { NotificationTypeEnum } from './behavioral-patterns/strategy/simple/_shared/models/notification-type.enum';
import { OrderStatusEnum } from './behavioral-patterns/strategy/simple/_shared/models/order-status.enum';

const order = new Order(OrderStatusEnum.CREATED, 1, 'address', 'email', 'phone');

const orderService = new OrderService(NotificationTypeEnum.SMS);
orderService.ship(order);

const orderService2 = new OrderService(null as any);
orderService2.ship(order);
