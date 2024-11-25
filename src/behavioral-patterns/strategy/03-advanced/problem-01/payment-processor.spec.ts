import { PaymentProcessor } from './payment-processor';
import { HttpPaymentService } from '../_shared/http/http-payment.service';
import { User } from '../_shared/models/user';

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
		paymentProcessor.pay('creditCard', 'installments', 100, 'USD', user, 3);
		expect(httpPaymentService.payCreditCardInstallmentUsd).toHaveBeenCalledWith(user, 100, 3);
	});

	it('should pay with CREDIT_CARD INSTALLMENTS in EUR', () => {
		paymentProcessor.pay('creditCard', 'installments', 100, 'EUR', user, 3);
		expect(httpPaymentService.payCreditCardInstallmentEur).toHaveBeenCalledWith(user, 100, 3);
	});

	it('should throw error for unsupported currency for CREDIT_CARD INSTALLMENTS', () => {
		expect(() => paymentProcessor.pay('creditCard', 'installments', 100, 'unknown', user, 3)).toThrow('Unsupported currency for Credit Card: unknown and subMethod: installments');
	});


	it('should pay with CREDIT_CARD ONE_TIME in USD', () => {
		paymentProcessor.pay('creditCard', 'oneTime', 100, 'USD', user, 0);
		expect(httpPaymentService.payCreditCardOneTimeUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with CREDIT_CARD ONE_TIME in EUR', () => {
		paymentProcessor.pay('creditCard', 'oneTime', 100, 'EUR', user, 0);
		expect(httpPaymentService.payCreditCardOneTimeEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for CREDIT_CARD', () => {
		expect(() => paymentProcessor.pay('creditCard', 'unknown', 100, 'USD', user, 0)).toThrow('Unsupported sub-method for Credit Card: unknown');
	});


	it('should throw error for unsupported currency for CREDIT_CARD ONE_TIME', () => {
		expect(() => paymentProcessor.pay('creditCard', 'oneTime', 100, 'unknown', user, 0)).toThrow('Unsupported currency for Credit Card: unknown and subMethod: oneTime');
	});




	it('should pay with PAYPAL in USD', () => {
		paymentProcessor.pay('paypal', '', 100, 'USD', user, 0);
		expect(httpPaymentService.payPaypalUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with PAYPAL in EUR', () => {
		paymentProcessor.pay('paypal', '', 100, 'EUR', user, 0);
		expect(httpPaymentService.payPaypalEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for PAYPAL', () => {
		expect(() => paymentProcessor.pay('paypal', '', 100, 'unknown', user, 0)).toThrow('Unsupported currency for PayPal: unknown');
	});



	it('should pay with BANK_TRANSFER TED in USD', () => {
		paymentProcessor.pay('bankTransfer', 'TED', 100, 'USD', user, 0);
		expect(httpPaymentService.payBankTransferTedUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with BANK_TRANSFER TED in EUR', () => {
		paymentProcessor.pay('bankTransfer', 'TED', 100, 'EUR', user, 0);
		expect(httpPaymentService.payBankTransferTedEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for BANK_TRANSFER and subMethod', () => {
		expect(() => paymentProcessor.pay('bankTransfer', 'TED', 100, 'unknown', user, 0)).toThrow('Unsupported currency for Bank Transfer: unknown and subMethod: TED');
	});


	it('should pay with BANK_TRANSFER PIX in USD', () => {
		paymentProcessor.pay('bankTransfer', 'PIX', 100, 'USD', user, 0);
		expect(httpPaymentService.payBankTransferPixUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with BANK_TRANSFER PIX in EUR', () => {
		paymentProcessor.pay('bankTransfer', 'PIX', 100, 'EUR', user, 0);
		expect(httpPaymentService.payBankTransferPixEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for bank transfer PIX', () => {
		expect(() => paymentProcessor.pay('bankTransfer', 'PIX', 100, 'unknown', user, 0)).toThrow('Unsupported currency for Bank Transfer: unknown and subMethod: PIX');
	});


	it('should pay with BANK_TRANSFER BANK_SLIP in USD', () => {
		paymentProcessor.pay('bankTransfer', 'BANK_SLIP', 100, 'USD', user, 0);
		expect(httpPaymentService.payBankTransferBanckSlipUsd).toHaveBeenCalledWith(user, 100);
	});

	it('should pay with BANK_TRANSFER BANK_SLIP in EUR', () => {
		paymentProcessor.pay('bankTransfer', 'BANK_SLIP', 100, 'EUR', user, 0);
		expect(httpPaymentService.payBankTransferBanckSlipEur).toHaveBeenCalledWith(user, 100);
	});

	it('should throw error for unsupported currency for BANK_TRANSFER BANK_SLIP', () => {
		expect(() => paymentProcessor.pay('bankTransfer', 'BANK_SLIP', 100, 'unknown', user, 0)).toThrow('Unsupported currency for Bank Transfer: unknown and subMethod: BANK_SLIP');
	});

	it('should throw error for unsupported currency for BANK_TRANSFER and subMethod', () => {
		expect(() => paymentProcessor.pay('bankTransfer', 'unknown', 100, 'USD', user, 0)).toThrow(`Unsupported sub-method for Bank Transfer: unknown`);
	});


	it('should throw error for invalid payment method', () => {
		expect(() => paymentProcessor.pay('invalidMethod', '', 100, 'USD', user, 0)).toThrow('Invalid payment method: invalidMethod');
	});
});
