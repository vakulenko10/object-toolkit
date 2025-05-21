# 🧰 @vakulenko10/object-toolkit

A compact, type-safe, and extensible toolkit for **deep manipulation of nested objects and arrays** in JavaScript and TypeScript.

## ✍️ About the Project

I originally created this utility set **for my personal use**, as I often deal with **deeply nested objects in React projects**, especially when working with data returned from APIs.

Instead of rewriting the same helper functions over and over again, I decided to build a **reusable toolkit** that allows me to:

- 🔍 Access nested properties safely and easily  
- 🧭 Extract values using dynamic paths  
- 📊 Group, count, and analyze data structures  
- 🧱 Work with objects and arrays in a more expressive and type-safe way  

Eventually, I decided to **publish it as an npm package**, in case it helps other developers facing similar challenges.

[![npm version](https://img.shields.io/npm/v/@vakulenko10/object-toolkit)](https://www.npmjs.com/package/@vakulenko10/object-toolkit)
[![License](https://img.shields.io/npm/l/@vakulenko10/object-toolkit)](LICENSE)

---

## 📦 Installation

```bash
npm install @vakulenko10/object-toolkit
# or
yarn add @vakulenko10/object-toolkit

```
---
📚 Usage
```bash
import {
  flattenObject,
  unflattenObject,
  getValueByPath,
  getAllKeys,
  getAllValues,
  findKeyDeep,
  findAllByKey,
  findKeysByValue,
  getPathsToKey,
  findDeepByPredicate,
  groupBy,
  countOccurrences
} from '@vakulenko10/object-toolkit';
```

🔧 API Reference

🔄 Object Structure Utilities

flattenObject(obj) -
Flattens a nested object into a single-level object using dot notation.

```bash
flattenObject({ a: { b: 1 }, c: 2 });
// ➜ { 'a.b': 1, c: 2 }
```

unflattenObject(obj, separator = '.')-
Restores a flattened object into its original nested form.
```bash
unflattenObject({ 'a.b': 1, c: 2 });
// ➜ { a: { b: 1 }, c: 2 }
```

getValueByPath(obj, path, separator = '.') -
Retrieves a deeply nested value from an object using a string path.
```bash
getValueByPath({ user: { profile: { name: 'Alice' } } }, 'user.profile.name');
// ➜ 'Alice'

getValueByPath(obj, 'user/profile/name', '/');
// ➜ 'Alice' with custom separator
```

🔍 Deep Inspection Utilities

getAllKeys(obj, separator = '.') - 
Returns all keys from a deeply nested object in dotted path format by default, or with custom separator passed inside as a parameter.

```bash
getAllKeys({ a: { b: 2 }, c: 3 });
// ➜ ['a', 'a.b', 'c']
```

getAllValues(obj) -
Returns all primitive values from a deeply nested object.

```bash
getAllValues({ a: { b: 2 }, c: 3 });
// ➜ [2, 3]
```

findKeyDeep(obj, key)
Finds the first occurrence of a key in a deeply nested object.

```bash
findKeyDeep({ user: { profile: { name: 'Alice' } } }, 'name');
// ➜ 'Alice'
```

findAllByKey(obj, key)
Finds all values associated with a key, regardless of nesting level.

```bash
findAllByKey({
  users: [{ name: 'John' }, { name: 'Jane' }],
  meta: { name: 'meta' }
}, 'name');
// ➜ ['John', 'Jane', 'meta']
```
findKeysByValue(obj, value)
Finds all dotted key paths where the given value occurs.
```bash
findKeysByValue({ a: 1, b: { c: 1 } }, 1);
// ➜ ['a', 'b.c']
```
getPathsToKey(obj, key)
Finds all key paths that lead to a specific key name.
```bash
getPathsToKey({ user: { profile: { name: 'Alice' } } }, 'name');
// ➜ ['user.profile.name']
```

findDeepByPredicate(obj, predicate)
Recursively finds all key-value pairs that match a predicate function.
```bash
findDeepByPredicate(
  { a: { b: 1 }, c: 2 },
  (key, value) => typeof value === 'number'
);
// ➜ { 'a.b': 1, 'c': 2 }
```
📊 Array & Value Utilities
groupBy(array, key)
Groups an array of objects by the specified key.
```bash
groupBy([{ age: 20 }, { age: 30 }, { age: 20 }], 'age');
// ➜ { '20': [{ age: 20 }, { age: 20 }], '30': [{ age: 30 }] }
```
countOccurrences(array)
Counts the number of times each value appears in an array.
```bash
countOccurrences(['a', 'b', 'a']);
// ➜ { a: 2, b: 1 }
```
🧪 Testing
This library is fully tested using Vitest. To run tests:

```bash
npm run test
```
✅ TypeScript Support
All utilities are written in TypeScript with complete typings. Example:
```bash
const email = getValueByPath<string>(user, 'profile.contact.email');
```


This is an open-source project — feel free to fork the repository, contribute new utilities, suggest improvements, or submit pull requests. Let’s make it better together!
