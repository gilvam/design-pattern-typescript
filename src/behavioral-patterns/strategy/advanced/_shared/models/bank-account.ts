import { Card } from './card';

export class BankAccount {
	constructor(
		private accountNumber = '',
		private accountHolder = '',
		private bankName = '',
		private accountType = '',
		private branchCode = '',
		public card = new Card(),
	) {
	}
}