class Product {
    constructor(name, price, quantity, expires = false, weight = 0) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.expires = expires;
        this.weight = weight; 
        this.isExpired = false; 
    }

    getName() {
        return this.name;
    }

    getWeight() {
        return this.weight;
    }

    
    expire() {
        if (this.expires) {
            this.isExpired = true;
        }
    }
}

export default Product;