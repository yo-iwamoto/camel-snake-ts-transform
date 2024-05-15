# camel-snake-ts-transform

An example modules that transforms camelCase to snake_case and vice versa.

```ts
const camelCaseObject = convertObjectKeysFromSnakeToCamel({
  foo_bar_baz: {
    deep_key: 'value',
  },
  array_key: [1, 2, 3],
}); // { fooBarBaz: { deepKey: 'value' }, arrayKey: [1, 2, 3] }

const snake_case_object = convertObjectKeysFromCamelToSnake({
  fooBarBaz: {
    deepKey: 'value',
  },
  arrayKey: [1, 2, 3],
}); // { foo_bar_baz: { deep_key: 'value' }, array_key: [1, 2, 3] }
```

There are also test suites for them.

```shell
pnpm run test
```
