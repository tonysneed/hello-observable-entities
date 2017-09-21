import { INotifyInfo, ObservableEntity, ObservableMap, ObservableSet } from 'observable-entities';
import { Subject } from 'rxjs/Subject';

// Define product as observable
class Product extends ObservableEntity {
  public productName: string;

  constructor(productName: string) {
    super();
    this.productName = productName;
    return super.proxify(this);
  }
}

// Create listener that logs to console when entity is updated
const modifyListener = new Subject<INotifyInfo>();
modifyListener.subscribe(info => {
  console.log(`Entity Update - key: ${info.key} origValue: ${info.origValue} currentValue: ${info.currentValue}`);
});

// Create product and add listener
const product = new Product('Chai');
product.modifyListeners.push(modifyListener);

// Set productName property
product.productName = 'Chang';

// Expected output:
// Entity Update - key: productName origValue: Chai currentValue: Chang

// Observe adds and deletes to a Set
const productSet = new ObservableSet(product);

// Create listener that writes to console when entities are added
const addListenerSet = new Subject<INotifyInfo>();
addListenerSet.subscribe(info => {
  console.log(`Set Add - ${(info.currentValue as Product).productName}`);
});
productSet.addListeners.push(addListenerSet);

// Create listener that writes to console when entities are removed
const removeListenerSet = new Subject<INotifyInfo>();
removeListenerSet.subscribe(info => {
  console.log(`Set Remove - ${(info.currentValue as Product).productName}`);
});
productSet.removeListeners.push(removeListenerSet);

// Add entity
const newProduct = new Product('Aniseed Syrup');
productSet.add(newProduct);

// Expected output:
// Set Add - Aniseed Syrup

// Remove entity
productSet.delete(newProduct);

// Expected output:
// Set Remove - Aniseed Syrup

// Observe adds and deletes to a Map
const productMap = new ObservableMap([product.productName, product]);

// Add listener for when entities are added
const addListenerMap = new Subject<INotifyInfo>();
addListenerMap.subscribe(info => {
  console.log(`Map Add - ${info.key} (key): ${(info.currentValue as Product).productName} (value)`);
});
productMap.addListeners.push(addListenerMap);

// Add listener for when entities are removed
const removeListenerMap = new Subject<INotifyInfo>();
removeListenerMap.subscribe(info => {
  console.log(`Map Remove - ${info.key} (key): ${(info.currentValue as Product).productName} (value)`);
});
productMap.removeListeners.push(removeListenerMap);

// Add entity
productMap.add(newProduct.productName, newProduct);

// Expected output:
// Map Add - Aniseed Syrup (key): Aniseed Syrup (value)

// Remove entity
productMap.delete(newProduct.productName);

// Expected output:
// Map Remove - Aniseed Syrup (key): Aniseed Syrup (value)
