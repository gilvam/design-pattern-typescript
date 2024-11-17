import { HttpPaymentService } from '../_shared/http/http-payment.service';
import { User } from '../_shared/models/user';
import { PayMethodEnum } from '../_shared/models/enums/pay-method.enum';
import { CardTypeEnum } from '../_shared/models/enums/card-type.enum';
import { BankTransferTypeEnum } from '../_shared/models/enums/bank-transfer-type.enum';
import { CurrencyEnum } from '../_shared/models/enums/currency.enum';

export class PaymentProcessor {
	constructor(public httpPaymentService = new HttpPaymentService()) {
	}

	pay(method: PayMethodEnum, subMethod: CardTypeEnum | BankTransferTypeEnum | unknown, amount: number, currency: CurrencyEnum, user: User, installments: number): void {
		switch (method) {
			case PayMethodEnum.CREDIT_CARD:
				this.processCreditCard(subMethod, amount, currency, user, installments);
				break;
			case PayMethodEnum.PAYPAL:
				this.processPaypal(amount, currency, user);
				break;
			case PayMethodEnum.BANK_TRANSFER:
				this.processBankTransfer(subMethod, amount, currency, user);
				break;
			default:
				throw new Error(`Invalid payment method: ${method}`);
		}
	}

	private processCreditCard(subMethod: CardTypeEnum | unknown, amount: number, currency: CurrencyEnum, user: User, installments: number): void {
		switch (subMethod) {
			case CardTypeEnum.INSTALLMENTS:
				switch (currency) {
					case CurrencyEnum.USD:
						this.httpPaymentService.payCreditCardInstallmentUsd(user, amount, installments);
						break;
					case CurrencyEnum.EUR:
						this.httpPaymentService.payCreditCardInstallmentEur(user, amount, installments);
						break;
					default:
						throw new Error(`Unsupported currency for Credit Card: ${currency} and subMethod: ${subMethod}`);
				}
				break;
			case CardTypeEnum.ONE_TIME:
				switch (currency) {
					case CurrencyEnum.USD:
						this.httpPaymentService.payCreditCardOneTimeUsd(user, amount);
						break;
					case CurrencyEnum.EUR:
						this.httpPaymentService.payCreditCardOneTimeEur(user, amount);
						break;
					default:
						throw new Error(`Unsupported currency for Credit Card: ${currency} and subMethod: ${subMethod}`);
				}
				break;
			default:
				throw new Error(`Unsupported sub-method for Credit Card: ${subMethod}`);
		}
	}

	private processPaypal(amount: number, currency: CurrencyEnum, user: User): void {
		switch (currency) {
			case CurrencyEnum.USD:
				this.httpPaymentService.payPaypalUsd(user, amount);
				break;
			case CurrencyEnum.EUR:
				this.httpPaymentService.payPaypalEur(user, amount);
				break;
			default:
				throw new Error(`Unsupported currency for PayPal: ${currency}`);
		}
	}

	private processBankTransfer(subMethod: BankTransferTypeEnum | unknown, amount: number, currency: CurrencyEnum, user: User): void {
		switch (subMethod) {
			case BankTransferTypeEnum.TED:
				switch (currency) {
					case CurrencyEnum.USD:
						this.httpPaymentService.payBankTransferTedUsd(user, amount);
						break;
					case CurrencyEnum.EUR:
						this.httpPaymentService.payBankTransferTedEur(user, amount);
						break;
					default:
						throw new Error(`Unsupported currency for Bank Transfer: ${currency} and subMethod: ${subMethod}`);
				}
				break;
			case BankTransferTypeEnum.PIX:
				switch (currency) {
					case CurrencyEnum.USD:
						this.httpPaymentService.payBankTransferPixUsd(user, amount);
						break;
					case CurrencyEnum.EUR:
						this.httpPaymentService.payBankTransferPixEur(user, amount);
						break;
					default:
						throw new Error(`Unsupported currency for Bank Transfer: ${currency} and subMethod: ${subMethod}`);
				}
				break;
			case BankTransferTypeEnum.BANK_SLIP:
				switch (currency) {
					case CurrencyEnum.USD:
						this.httpPaymentService.payBankTransferBanckSlipUsd(user, amount);
						break;
					case CurrencyEnum.EUR:
						this.httpPaymentService.payBankTransferBanckSlipEur(user, amount);
						break;
					default:
						throw new Error(`Unsupported currency for Bank Transfer: ${currency} and subMethod: ${subMethod}`);
				}
				break;
			default:
				throw new Error(`Unsupported sub-method for Bank Transfer: ${subMethod}`);
		}
	}
}
