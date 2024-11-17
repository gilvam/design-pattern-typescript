import { Address } from './address';

export class Card {
	constructor(
		public cardNumber = '',
		public cvv = '',
		public expirationDate = '',
		public billingAddress = new Address(),
	) {
	}

	isEmpty(): boolean {
		return !this.cardNumber && !this.cvv && !this.expirationDate && !this.billingAddress.isEmpty();
	}
}