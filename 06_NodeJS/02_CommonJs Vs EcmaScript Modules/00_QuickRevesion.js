/*
+-----------------------------+---------------------------------+-----------------------------------------+
|        Feature              |      CommonJS (CJS)             |     ES Modules (ESM)                    |
+-----------------------------+---------------------------------+-----------------------------------------+
| Definition                  | CommonJS is a module            | ES6 Modules (ESM) are                   |
|                             | system designed for             | the official JavaScript                 |
|                             | Node.js, using `require()`      | module system introduced                |
|                             | and `module.exports`.           | in ES6, using `import` and              |
|                             | It loads modules                | `export` for modular code.              |
|                             | synchronously.                  | Loads asynchronously.                   |
+-----------------------------+---------------------------------+-----------------------------------------+
| Syntax                      | require() / module.exports      | import / export                         |
+-----------------------------+---------------------------------+-----------------------------------------+
| Default in Node.js?         | ✅ Yes (by default)             | ❌ No (must enable)                    |
+-----------------------------+---------------------------------+-----------------------------------------+
| File Extension              | .js                             | .js or .mjs                             |
+-----------------------------+---------------------------------+-----------------------------------------+
| Loading Type                | Synchronous (Blocking)          | Asynchronous (Non-blocking)             |
+-----------------------------+---------------------------------+-----------------------------------------+
| Use of __dirname/__filename | ✅ Available                    | ❌ Not available (use import.meta.url) |
+-----------------------------+---------------------------------+-----------------------------------------+
| Browser Compatibility       | ❌ No (Node.js only)            | ✅ Yes (Works in browsers)             |
+-----------------------------+---------------------------------+-----------------------------------------+
| Performance                 | ⚡ Faster for small scripts     | 🚀 Better for large apps               |
+-----------------------------+----------------------------------+----------------------------------------+


*/