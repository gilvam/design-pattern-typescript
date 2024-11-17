export class Address {
	constructor(
		public street = '',
		public city = '',
		public state = '',
		public zipCode = '') {}

	isEmpty(): boolean {
		return !this.street && !this.city && !this.state && !this.zipCode;
	}
}