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

> Note: You will need to build the app prior to running or debugging it.

## ObservableEntity

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

### Create a listener

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

### Update a property to see the listener get notified

```js
// Set productName property
product.productName = 'Chang';

// Expected output:
// key: productName origValue: Chai currentValue: Chang
```

## ObservableSet

### Create an ObservableSet

Create an `ObservableSet` and add entities to it.

```js
// Observe collection adds and deletes
const productSet = new ObservableSet(product);
```

### Create listeners

Add listeners to receive notifications when entities are added or removed from the set.

```js
// Create listener that writes to console when entities are added
const addListenerSet = new Subject<INotifyInfo>();
addListenerSet.subscribe(info => {
  console.log(`Set Add - ${(info.currentValue as Product).productName}`)
});
productSet.addListeners.push(addListenerSet);

// Create listener that writes to console when entities are removed
const removeListenerSet = new Subject<INotifyInfo>();
removeListenerSet.subscribe(info => {
  console.log(`Set Remove - ${(info.currentValue as Product).productName}`)
});
productSet.removeListeners.push(removeListenerSet);
```

### Add an entity to see the listener get notified

```js
// Add entity
const newProduct = new Product('Aniseed Syrup');
productSet.add(newProduct);

// Expected output:
// Set Add - Aniseed Syrup
```

### Remove an entity to see the listener get notified

```js
// Remove entity
productSet.delete(newProduct);

// Expected output:
// Set Remove - Aniseed Syrup
```

## ObservableMap

### Create an ObservableMap

Create an `ObservableMap` and add entries to it.

```js
// Observe collection adds and deletes
const productSet = new ObservableSet(product);
```

### Create listeners

Add listeners to receive notifications when entities are added or removed from the set.

```js
// Create listener that writes to console when entities are added
const addListenerSet = new Subject<INotifyInfo>();
addListenerSet.subscribe(info => {
  console.log(`Set Add - ${(info.currentValue as Product).productName}`)
});
productSet.addListeners.push(addListenerSet);

// Create listener that writes to console when entities are removed
const removeListenerSet = new Subject<INotifyInfo>();
removeListenerSet.subscribe(info => {
  console.log(`Set Remove - ${(info.currentValue as Product).productName}`)
});
productSet.removeListeners.push(removeListenerSet);
```

### Add an entity to see the listener get notified

```js
// Add entity
const newProduct = new Product('Aniseed Syrup');
productSet.add(newProduct);

// Expected output:
// Set Add - Aniseed Syrup
```

### Remove an entity to see the listener get notified

```js
// Remove entity
productSet.delete(newProduct);

// Expected output:
// Set Remove - Aniseed Syrup
```
 