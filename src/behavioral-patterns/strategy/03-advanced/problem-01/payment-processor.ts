import { HttpPaymentService } from '../_shared/http/http-payment.service';
import { User } from '../_shared/models/user';

export class PaymentProcessor {
	constructor(public httpPaymentService = new HttpPaymentService()) {
	}

	pay(method: string, subMethod: string, amount: number, currency: string, user: User, installments: number): void {
		if (method === 'creditCard') {
			if (subMethod === 'installments') {
				if (currency === 'USD') {
					this.httpPaymentService.payCreditCardInstallmentUsd(user, amount, installments);
				} else if (currency === 'EUR') {
					this.httpPaymentService.payCreditCardInstallmentEur(user, amount, installments);
				} else {
					throw new Error(`Unsupported currency for Credit Card: ${ currency } and subMethod: ${ subMethod }`);
				}
			} else if (subMethod === 'oneTime') {
				if (currency === 'USD') {
					this.httpPaymentService.payCreditCardOneTimeUsd(user, amount);
				} else if (currency === 'EUR') {
					this.httpPaymentService.payCreditCardOneTimeEur(user, amount);
				} else {
					throw new Error(`Unsupported currency for Credit Card: ${ currency } and subMethod: ${ subMethod }`);
				}
			} else {
				throw new Error(`Unsupported sub-method for Credit Card: ${ subMethod }`);
			}
		} else if (method === 'paypal') {
			if (currency === 'USD') {
				this.httpPaymentService.payPaypalUsd(user, amount);
			} else if (currency === 'EUR') {
				this.httpPaymentService.payPaypalEur(user, amount);
			} else {
				throw new Error(`Unsupported currency for PayPal: ${ currency }`);
			}
		} else if (method === 'bankTransfer') {
			if (subMethod === 'TED') {
				if (currency === 'USD') {
					this.httpPaymentService.payBankTransferTedUsd(user, amount);
				} else if (currency === 'EUR') {
					this.httpPaymentService.payBankTransferTedEur(user, amount);
				} else {
					throw new Error(`Unsupported currency for Bank Transfer: ${ currency } and subMethod: ${ subMethod }`);
				}
			} else if (subMethod === 'PIX') {
				if (currency === 'USD') {
					this.httpPaymentService.payBankTransferPixUsd(user, amount);
				} else if (currency === 'EUR') {
					this.httpPaymentService.payBankTransferPixEur(user, amount);
				} else {
					throw new Error(`Unsupported currency for Bank Transfer: ${ currency } and subMethod: ${ subMethod }`);
				}
			} else if (subMethod === 'BANK_SLIP') {
				if (currency === 'USD') {
					this.httpPaymentService.payBankTransferBanckSlipUsd(user, amount);
				} else if (currency === 'EUR') {
					this.httpPaymentService.payBankTransferBanckSlipEur(user, amount);
				} else {
					throw new Error(`Unsupported currency for Bank Transfer: ${ currency } and subMethod: ${ subMethod }`);
				}
			} else {
				throw new Error(`Unsupported sub-method for Bank Transfer: ${ subMethod }`);
			}
		} else {
			throw new Error(`Invalid payment method: ${ method }`);
		}
	}
}
