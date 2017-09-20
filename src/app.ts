import { INotifyInfo, ObservableEntity } from 'observable-entities';
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
  console.log(`key: ${info.key} origValue: ${info.origValue} currentValue: ${info.currentValue}`)
});

// Create product and add listener
const product = new Product('Chai');
product.modifyListeners.push(modifyListener);

// Set productName property
product.productName = 'Chang';

// Expected output:
// key: productName origValue: Chai currentValue: Chang
