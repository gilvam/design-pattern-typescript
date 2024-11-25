interface IPayment {
	pay(amount: number): void;
}

class CreditCardPayment implements IPayment {
	pay(amount: number) {
		console.log(`Paid ${amount} using Credit Card.`);
	}
}

class PayPalPayment implements IPayment {
	pay(amount: number) {
		console.log(`Paid ${amount} using PayPal.`);
	}
}

class ShoppingCart {
	private payment: IPayment;

	constructor(payment: IPayment) {
		this.payment = payment;
	}

	changeStrategy(payment: IPayment) {
		this.payment = payment;
	}

	checkout(amount: number) {
		this.payment.pay(amount);
	}
}

const cart = new ShoppingCart(new CreditCardPayment());
cart.checkout(100); // Paid 100 using Credit Card

cart.changeStrategy(new PayPalPayment());
cart.checkout(150); // Paid 150 using PayPal
