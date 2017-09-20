# Hello observable-entities-js

A simple Node.js app demonstrating observable entities.

## Install dependencies

```bash
npm install
```

This will add observable-entities as a runtime dependency. It will also brings in rxjs so you can import 'rxjs/Subject'.

## Install TypeScript globally

```bash
npm i -g typescript
```

## Build the project

In VS Code press **Cmd+Shift+B** to build the project.

You can also execute the following from the integrated terminal:

```bash
tsc -p src
```

## Run the app using Node

```bash
node ./dist/app
```

You should see the following output:

```bash
key: productName origValue: Chai currentValue: Chang
```

## Debug the app

Set breakpoints on lines 18 and 26 in app.ts. Then press **F5** to start debugging. First you'll hit the breakpoint line 26, which sets the `productName` property.  This will notify `modifyListener` that the change has taken place, sending the name of the property that was updated, as well as the original and current values.

![obs-entities-debug](https://user-images.githubusercontent.com/2836367/30654763-835112de-9df4-11e7-8d40-6416a7f95dd6.gif)

## Inspect the code in app.ts

### Define a class that extends ObservableEntity

In **app.ts** you'll see the definition of `Product` that extends `ObservableEntity` and returns `super.proxify(this)` in the constructor.

```js
// Define product as observable
class Product extends ObservableEntity {
  productName: string;

  constructor(productName: string) {
    super();
    this.productName = productName;
    return super.proxify(this);
  }
}
```

### Create listener

We then define a listener of type `Subject<INotifyInfo>` that logs information about the property update.

```js
// Create listener that logs to console when entity is updated
const modifyListener = new Subject<INotifyInfo>();
modifyListener.subscribe(info => {
  console.log(`key: ${info.key} origValue: ${info.origValue} currentValue: ${info.currentValue}`)
});
```

Then add the listener to a new product.

```js
// Create product and add listener
const product = new Product('Chai');
product.modifyListeners.push(modifyListener);
```

### Update property to see the listener get notified

```js
// Set productName property
product.productName = 'Chang';

// Expected output:
// key: productName origValue: Chai currentValue: Chang
```


