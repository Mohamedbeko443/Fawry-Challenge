import ShippingService from './shippingService.js'; 

class ECommerceSystem {
    constructor() {
        this.products = {}; 
    }

    addProduct(product) {
        this.products[product.name] = product;
        console.log(`${product.name} added to inventory.`);
    }

    checkout(customer, cart) {
        if (cart.isEmpty()) {
            console.log("Error: Cart is empty. Cannot checkout.");
            return;
        }

        let subtotal = 0;
        let shippingFees = 0;
        const shippableItems = [];

        for (const cartItem of cart.getCartItems()) {
            const product = cartItem.product;
            const quantity = cartItem.quantity;

            if (!this.products[product.name] || this.products[product.name].quantity < quantity) {
                console.log(`Error: ${product.name} is out of stock or quantity is insufficient. Cannot checkout.`);
                return;
            }
            if (product.expires && product.isExpired) {
                console.log(`Error: ${product.name} is expired. Cannot checkout.`);
                return;
            }

            subtotal += product.price * quantity;

            if (product.weight > 0) {
                shippingFees += (product.weight * quantity / 100) * 10;
                shippableItems.push({ product, quantity });
            }
        }

        const paidAmount = subtotal + shippingFees;

        if (customer.balance < paidAmount) {
            console.log(`Error: Customer's balance is insufficient. Required: ${paidAmount}, Available: ${customer.balance}`);
            return;
        }

        customer.deductBalance(paidAmount);
        for (const cartItem of cart.getCartItems()) {
            this.products[cartItem.product.name].quantity -= cartItem.quantity;
        }

        ShippingService.sendForShipping(shippableItems);

        console.log("\n** Checkout receipt **");
        cart.getCartItems().forEach(item => {
            console.log(`${item.quantity}x ${item.product.getName()}`);
            console.log(item.product.price * item.quantity);
        });
        console.log(`Subtotal ${subtotal}`);
        console.log(`Shipping ${shippingFees}`);
        console.log(`Amount ${paidAmount}`);
        console.log(`Customer current balance: ${customer.balance}`);
    }
}

export default ECommerceSystem;