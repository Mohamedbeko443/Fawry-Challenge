class Cart {
    constructor() {
        this.items = []; //! { product: Product, quantity: number }
    }

    add(product, quantity) {
        if (quantity <= 0) {
            console.log(`Error: Quantity for ${product.name} must be positive.`);
            return;
        }
        if (product.quantity < quantity) {
            console.log(`Error: Not enough ${product.name} in stock. Available: ${product.quantity}`);
            return;
        }
        if (product.expires && product.isExpired) {
            console.log(`Error: ${product.name} is expired and cannot be added to cart.`);
            return;
        }

        const existingItem = this.items.find(item => item.product.name === product.name);
        if (existingItem) {
            if (product.quantity < existingItem.quantity + quantity) {
                console.log(`Error: Not enough ${product.name} in stock to add ${quantity} more. Available: ${product.quantity - existingItem.quantity}`);
                return;
            }
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        console.log(`${quantity}x ${product.name} added to cart.`);
    }

    getCartItems() {
        return this.items;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

export default Cart;