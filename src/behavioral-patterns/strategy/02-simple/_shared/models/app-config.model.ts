import { NotificationTypeEnum } from './notification-type.enum';

export class AppConfig {
	constructor(public notificationType: NotificationTypeEnum) {
	}
}
