import { Address } from './address';
import { BankAccount } from './bank-account';

export class User {
	constructor(
		public id = '',
		public name = '',
		public email = '',
		public address = new Address(),
		public bankAccount = new BankAccount(),
	) {
	}
}