class ShippingService {
    static sendForShipping(shippableItems) {
        if (shippableItems.length === 0) {
            return;
        }
        console.log("\n** Shipment notice **");
        let totalWeight = 0;
        shippableItems.forEach(item => {
            console.log(`${item.quantity}x ${item.product.getName()}`);
            console.log(`${item.product.getWeight() * item.quantity}g`);
            totalWeight += item.product.getWeight() * item.quantity;
        });
        console.log(`Total package weight ${totalWeight / 1000}kg`);
    }
}

export default ShippingService;