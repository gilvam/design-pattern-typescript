import { HttpPaymentService } from '../_shared/http/http-payment.service';
import { User } from '../_shared/models/user';

export class PaymentProcessor {
	constructor(public httpPaymentService = new HttpPaymentService()) {}

	pay(method: string, subMethod: string, amount: number, currency: string, user: User, installments: number): void {
		switch (method) {
			case 'creditCard':
				switch (subMethod) {
					case 'installments':
						switch (currency) {
							case 'USD':
								this.httpPaymentService.payCreditCardInstallmentUsd(user, amount, installments);
								break;
							case 'EUR':
								this.httpPaymentService.payCreditCardInstallmentEur(user, amount, installments);
								break;
							default:
								throw new Error(`Unsupported currency for Credit Card: ${currency} and subMethod: ${subMethod}`);
						}
						break;
					case 'oneTime':
						switch (currency) {
							case 'USD':
								this.httpPaymentService.payCreditCardOneTimeUsd(user, amount);
								break;
							case 'EUR':
								this.httpPaymentService.payCreditCardOneTimeEur(user, amount);
								break;
							default:
								throw new Error(`Unsupported currency for Credit Card: ${currency} and subMethod: ${subMethod}`);
						}
						break;
					default:
						throw new Error(`Unsupported sub-method for Credit Card: ${subMethod}`);
				}
				break;
			case 'paypal':
				switch (currency) {
					case 'USD':
						this.httpPaymentService.payPaypalUsd(user, amount);
						break;
					case 'EUR':
						this.httpPaymentService.payPaypalEur(user, amount);
						break;
					default:
						throw new Error(`Unsupported currency for PayPal: ${currency}`);
				}
				break;
			case 'bankTransfer':
				switch (subMethod) {
					case 'TED':
						switch (currency) {
							case 'USD':
								this.httpPaymentService.payBankTransferTedUsd(user, amount);
								break;
							case 'EUR':
								this.httpPaymentService.payBankTransferTedEur(user, amount);
								break;
							default:
								throw new Error(`Unsupported currency for Bank Transfer: ${currency} and subMethod: ${subMethod}`);
						}
						break;
					case 'PIX':
						switch (currency) {
							case 'USD':
								this.httpPaymentService.payBankTransferPixUsd(user, amount);
								break;
							case 'EUR':
								this.httpPaymentService.payBankTransferPixEur(user, amount);
								break;
							default:
								throw new Error(`Unsupported currency for Bank Transfer: ${currency} and subMethod: ${subMethod}`);
						}
						break;
					case 'BANK_SLIP':
						switch (currency) {
							case 'USD':
								this.httpPaymentService.payBankTransferBanckSlipUsd(user, amount);
								break;
							case 'EUR':
								this.httpPaymentService.payBankTransferBanckSlipEur(user, amount);
								break;
							default:
								throw new Error(`Unsupported currency for Bank Transfer: ${currency} and subMethod: ${subMethod}`);
						}
						break;
					default:
						throw new Error(`Unsupported sub-method for Bank Transfer: ${subMethod}`);
				}
				break;
			default:
				throw new Error(`Invalid payment method: ${method}`);
		}
	}
}
