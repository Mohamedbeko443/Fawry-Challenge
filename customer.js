class Customer {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
    }

    deductBalance(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
}

export default Customer;