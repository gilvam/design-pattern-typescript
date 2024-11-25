import { PaymentProcessor } from './payment-processor';
import { HttpPaymentService } from '../_shared/http/http-payment.service';
import { User } from '../_shared/models/user';
import { PayMethodEnum } from '../_shared/models/enums/pay-method.enum';
import { CardTypeEnum } from '../_shared/models/enums/card-type.enum';
import { CurrencyEnum } from '../_shared/models/enums/currency.enum';
import { BankTransferTypeEnum } from '../_shared/models/enums/bank-transfer-type.enum';

jest.mock('../_shared/http/http-payment.service');

describe('PaymentProcessor', () => {
	let paymentProcessor: PaymentProcessor;
	let httpPaymentService: jest.Mocked<HttpPaymentService>;
	let user: User;

	beforeEach(() => {
		httpPaymentService = new HttpPaymentService() as jest.Mocked<HttpPaymentService>;
		paymentProcessor = new PaymentProcessor(httpPaymentService);
		user = new User('123', 'geraldo', 'mail@mail.com');
	});

	it('should pay with CREDIT_CARD INSTALLMENTS in USD', () => {
		paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, CardTypeEnum.INSTALLMENTS, 100, CurrencyEnum.USD, user, 3);
		expect(httpPaymentService.payCreditCardInstallmentUsd).toHaveBeenCalledWith(user, 100, 3);
	});

	it('should pay with CREDIT_CARD INSTALLMENTS in EUR', () => {
		paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, CardTypeEnum.INSTALLMENTS, 100, CurrencyEnum.EUR, user, 3);
		expect(httpPaymentService.payCreditCardInstallmentEur).toHaveBeenCalledWith(user, 100, 3);
	});

	it('should throw error for unsupported currency for CREDIT_CARD INSTALLMENTS', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, CardTypeEnum.INSTALLMENTS, 100, 'unknown' as any, user, 3))
			.toThrow('Unsupported currency for Credit Card: unknown and subMethod: installments');
	});


	it('should pay with CREDIT_CARD ONE_TIME in USD', () => {
		paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, CardTypeEnum.ONE_TIME, 100, CurrencyEnum.USD, user, 0);
		expect(httpPaymentService.payCreditCardOneTimeUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with CREDIT_CARD ONE_TIME in EUR', () => {
		paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, CardTypeEnum.ONE_TIME, 100, CurrencyEnum.EUR, user, 0);
		expect(httpPaymentService.payCreditCardOneTimeEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for CREDIT_CARD', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, 'unknown' as any, 100, CurrencyEnum.USD, user, 0))
			.toThrow('Unsupported sub-method for Credit Card: unknown');
	});


	it('should throw error for unsupported currency for CREDIT_CARD ONE_TIME', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.CREDIT_CARD, CardTypeEnum.ONE_TIME, 100, 'unknown' as any, user, 0))
			.toThrow('Unsupported currency for Credit Card: unknown and subMethod: oneTime');
	});




	it('should pay with PAYPAL in USD', () => {
		paymentProcessor.pay(PayMethodEnum.PAYPAL, null, 100, CurrencyEnum.USD, user, 0);
		expect(httpPaymentService.payPaypalUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with PAYPAL in EUR', () => {
		paymentProcessor.pay(PayMethodEnum.PAYPAL, null, 100, CurrencyEnum.EUR, user, 0);
		expect(httpPaymentService.payPaypalEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for PAYPAL', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.PAYPAL, null, 100, 'unknown' as any, user, 0))
			.toThrow('Unsupported currency for PayPal: unknown');
	});



	it('should pay with BANK_TRANSFER TED in USD', () => {
		paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.TED, 100, CurrencyEnum.USD, user, 0);
		expect(httpPaymentService.payBankTransferTedUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with BANK_TRANSFER TED in EUR', () => {
		paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.TED, 100, CurrencyEnum.EUR, user, 0);
		expect(httpPaymentService.payBankTransferTedEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for BANK_TRANSFER and subMethod', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.TED, 100, 'unknown' as any, user, 0))
			.toThrow('Unsupported currency for Bank Transfer: unknown and subMethod: ted');
	});


	it('should pay with BANK_TRANSFER PIX in USD', () => {
		paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.PIX, 100, CurrencyEnum.USD, user, 0);
		expect(httpPaymentService.payBankTransferPixUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with BANK_TRANSFER PIX in EUR', () => {
		paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.PIX, 100, CurrencyEnum.EUR, user, 0);
		expect(httpPaymentService.payBankTransferPixEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for bank transfer PIX', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.PIX, 100, 'unknown' as any, user, 0))
			.toThrow('Unsupported currency for Bank Transfer: unknown and subMethod: pix');
	});


	it('should pay with BANK_TRANSFER BANK_SLIP in USD', () => {
		paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.BANK_SLIP, 100, CurrencyEnum.USD, user, 0);
		expect(httpPaymentService.payBankTransferBanckSlipUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with BANK_TRANSFER BANK_SLIP in EUR', () => {
		paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.BANK_SLIP, 100, CurrencyEnum.EUR, user, 0);
		expect(httpPaymentService.payBankTransferBanckSlipEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for BANK_TRANSFER BANK_SLIP', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, BankTransferTypeEnum.BANK_SLIP, 100, 'unknown' as any, user, 0))
			.toThrow('Unsupported currency for Bank Transfer: unknown and subMethod: bankSlip');
	});

	it('should throw error for unsupported currency for BANK_TRANSFER and subMethod', () => {
		expect(() => paymentProcessor.pay(PayMethodEnum.BANK_TRANSFER, 'unknown' as any, 100, CurrencyEnum.USD, user, 0))
			.toThrow(`Unsupported sub-method for Bank Transfer: unknown`);
	});


	it('should throw error for invalid payment method', () => {
		expect(() => paymentProcessor.pay('unknown' as any, null, 100, CurrencyEnum.USD, user, 0))
			.toThrow('Invalid payment method: unknown');
	});
});
