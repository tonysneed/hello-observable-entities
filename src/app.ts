import { INotifyInfo, ObservableEntity, ObservableSet } from 'observable-entities';
import { Subject } from 'rxjs/Subject';

// Define product as observable
class Product extends ObservableEntity {
  productName: string;

  constructor(productName: string) {
    super();
    this.productName = productName;
    return super.proxify(this);
  }
}

// Create listener that logs to console when entity is updated
const modifyListener = new Subject<INotifyInfo>();
modifyListener.subscribe(info => {
  console.log(`Update - key: ${info.key} origValue: ${info.origValue} currentValue: ${info.currentValue}`)
});

// Create product and add listener
const product = new Product('Chai');
product.modifyListeners.push(modifyListener);

// Set productName property
product.productName = 'Chang';

// Expected output:
// key: productName origValue: Chai currentValue: Chang

// Observe collection adds and deletes
const productSet = new ObservableSet<Product>(product);

// Create listeners that log to console when entities are added or removed
const addListener = new Subject<INotifyInfo>();
addListener.subscribe(info => {
  console.log(`Add - ${(info.currentValue as Product).productName}`)
});
productSet.addListeners.push(addListener);

const removeListener = new Subject<INotifyInfo>();
removeListener.subscribe(info => {
  console.log(`Remove - ${(info.currentValue as Product).productName}`)
});
productSet.removeListeners.push(removeListener);

// Add entity
const newProduct = new Product('Aniseed Syrup');
productSet.add(newProduct);

// Expected output:
// Add - Aniseed Syrup

// Remove entity
productSet.delete(newProduct);

// Expected output:
// Remove - Aniseed Syrup
