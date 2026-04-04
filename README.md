# EventEmitter

A lightweight, robust implementation of the Observer Pattern for JavaScript. This class provides a structured way to handle custom events, manage data broadcasting, and prevent memory leaks through listener limits.

---

## 🚀 Features

* **Private State:** Utilizes ES2022 private class fields (`#`) to keep the event registry secure from external modification.
* **Listener Limits:** Built-in protection to cap the number of listeners per event (default is 10).
* **Flexible Arguments:** Supports passing multiple arguments of any type through the `emit` method.
* **Selective Cleanup:** Capability to remove specific callback functions or wipe an entire event identity.
* **Validation:** Includes error handling for incorrect parameter types.

---

## 🛠️ API Reference

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `maxListeners` | `number` | **Getter/Setter**. The maximum number of callbacks allowed per event identity. |

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `listen(ident, func)` | `string, function` | Registers a callback for the specified event name. |
| `emit(ident, ...args)` | `string, any` | Triggers all callbacks for the event, passing along any provided arguments. |
| `removeListener(ident, func?)` | `string, function?` | Removes a specific function. If `func` is null, all listeners for that event are deleted. |
| `getEventListeners()` | `none` | Returns the current object containing all events and their arrays of functions. |

---

## 📖 Usage Examples

### 1. Basic Setup
```javascript
import { EventEmitter } from "./main.js";

const emitter = new EventEmitter();
emitter.maxListeners = 5;
