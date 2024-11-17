import { User } from '../models/user';

export class HttpPaymentService {
	payCreditCardInstallmentUsd(user: User, amount: number, installments: number): void {
		// ...
	}
	payCreditCardInstallmentEur(user: User, amount: number, installments: number): void {
		// ...
	}
	payCreditCardOneTimeUsd(user: User, amount: number): void {
		// ...
	}
	payCreditCardOneTimeEur(user: User, amount: number): void {
		// ...
	}
	payPaypalUsd(user: User, amount: number): void {
		// ...
	}
	payPaypalEur(user: User, amount: number): void {
		// ...
	}
	payBankTransferTedUsd(user: User, amount: number): void {
		// ...
	}
	payBankTransferTedEur(user: User, amount: number): void {
		// ...
	}
	payBankTransferPixUsd(user: User, amount: number): void {
		// ...
	}
	payBankTransferPixEur(user: User, amount: number): void {
		// ...
	}
	payBankTransferBanckSlipUsd(user: User, amount: number): void {
		// ...
	}
	payBankTransferBanckSlipEur(user: User, amount: number): void {
		// ...
	}
}
