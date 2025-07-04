import Product from './product.js';
import Customer from './customer.js';
import Cart from './cart.js';
import ECommerceSystem from './ECommerce.js';



const system = new ECommerceSystem();
const cheese = new Product("Cheese", 100, 5, true, 200);
const biscuits = new Product("Biscuits", 150, 10, true, 700);
const tv = new Product("TV", 1000, 2, false, 15000);
const mobileScratchCard = new Product("Mobile Scratch Card", 50, 20, false, 0);

system.addProduct(cheese);
system.addProduct(biscuits);
system.addProduct(tv);
system.addProduct(mobileScratchCard);


const customer1 = new Customer("Alice", 2000);
const customer2 = new Customer("Bob", 100);


console.log("\n--- Successful Checkout Scenarioo ---");
const cart1 = new Cart();
cart1.add(cheese, 2);
cart1.add(tv, 1);
cart1.add(mobileScratchCard, 1);
cart1.add(biscuits, 1);

console.log("\nAttempting checkout for customer Alice...");
system.checkout(customer1, cart1);
console.log(`Alice's balance after checkout: ${customer1.balance}`);


console.log("\n--- Insufficient Stock Scenario ---");
const cart2 = new Cart();
cart2.add(tv, 5);
system.checkout(customer1, cart2);


console.log("\n--- Expired Product Scenario ---");
cheese.expire();
const cart3 = new Cart();
cart3.add(cheese, 1);
system.checkout(customer1, cart3);
cheese.isExpired = false; 

console.log("\n--- Insufficient Customer Balance Scenario ---");
const cart4 = new Cart();
cart4.add(tv, 2);
console.log("\nAttempting checkout for customer Bob with insufficient balance...");
system.checkout(customer2, cart4);


console.log("\n--- Empty Cart Scenario ---");
const cart5 = new Cart();
console.log("\nAttempting checkout with an empty cart...");
system.checkout(customer1, cart5);


console.log("\n--- Adding multiple quantities of the same product to cart ---");
const cart6 = new Cart();
cart6.add(biscuits, 2);
cart6.add(biscuits, 3);
console.log("\nAttempting checkout for customer Alice with multiple biscuit quantities...");
system.checkout(customer1, cart6);