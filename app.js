define("product", ["require", "exports", "observable-entities"], function (require, exports, observable_entities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Product extends observable_entities_1.ObservableEntity {
        constructor(productName) {
            super();
            this.productName = productName;
            return super.proxify(this);
        }
    }
    exports.Product = Product;
});
define("app", ["require", "exports", "rxjs/Subject", "product"], function (require, exports, Subject_1, product_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Create listener that logs to console when entity is updated
    const modifyListener = new Subject_1.Subject();
    modifyListener.subscribe(info => {
        console.log(`key: ${info.key} origValue: ${info.origValue} currentValue: ${info.currentValue}`);
    });
    // Create product and add listener
    const product = new product_1.Product('Chai');
    product.modifyListeners.push(modifyListener);
    // Set productName property
    product.productName = 'Chang';
});
// Expected output:
