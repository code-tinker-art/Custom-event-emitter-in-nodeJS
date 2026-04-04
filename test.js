import { EventEmitter } from "./main.js";

const e = new EventEmitter();

console.log("--- 1. Testing Max Listeners Configuration ---");
console.log("Default Max:", e.maxListeners); // 10

e.maxListeners = 3;
console.log("Updated Max:", e.maxListeners); // 3

console.log("\n--- 2. Testing Listener Limit (console.error expected) ---");

const cb1 = () => console.log("Callback 1");
const cb2 = () => console.log("Callback 2");
const cb3 = () => console.log("Callback 3");
const cb4 = () => console.log("Callback 4");

e.listen("test", cb1);
e.listen("test", cb2);
e.listen("test", cb3);
e.listen("test", cb4); // This should log: "Too many listeners..."

console.log("\n--- 3. Testing Emit with Multiple Arguments ---");

e.listen("data", (user, status, code) => {
    console.log(`User: ${user} | Status: ${status} | Code: ${code}`);
});
e.emit("data", "Admin", "Active", 200);

console.log("\n--- 4. Testing Selective removeListener (Specific Function) ---");

const specificHandler = () => console.log("I should be removed");
const stayHandler = () => console.log("I should remain");

e.listen("multi", specificHandler);
e.listen("multi", stayHandler);

console.log("Before selective remove:", e.getEventListeners()["multi"].length); // 2

e.removeListener("multi", specificHandler);

console.log("After selective remove:", e.getEventListeners()["multi"].length); // 1
console.log("Firing 'multi' (only stayHandler should run):");

e.emit("multi");

console.log("\n--- 5. Testing Full removeListener (By Identity) ---");

e.removeListener("test");

console.log("Is 'test' event deleted?", e.getEventListeners()["test"] === undefined); // true

console.log("\n--- 6. Testing Silent Failure for Non-existent Events ---");
console.log("Emitting 'ghost' event (should be silent):");

e.emit("ghost", "no error here");

console.log("\n--- 7. Testing Parameter Validation ---");

e.listen(null, () => { }); // Should log: "Expected parameters were not passed"
e.maxListeners = "ten";    // Should log: "Expected number as parameter..."

console.log("\n--- Final Object State ---");
console.dir(e.getEventListeners());
