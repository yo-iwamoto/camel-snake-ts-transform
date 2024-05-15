/**
 * Type to convert string literal type from snake case to camel case
 *
 * @example type CamelCaseString = CamelCase<'foo_bar_baz'> // 'fooBarBaz'
 */
type CamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<CamelCase<U>>}` : S;

/**
 * Type to recursively convert object key strings from snake case to camel case
 *
 * @example type CamelCaseObject = CamelCaseObject<{ foo_bar_baz: { deep_key: string } }> // { fooBarBaz: { deepKey: string } }
 */
type CamelCaseObject<T> = T extends any[]
  ? { [K in keyof T]: CamelCaseObject<T[K]> }
  : T extends object
  ? { [K in keyof T as CamelCase<K & string>]: CamelCaseObject<T[K]> }
  : T;

/**
 * Convert a string from snake case to camel case
 *
 * @example toCamelCase('foo_bar_baz') // 'fooBarBaz'
 */
function convertStringFromSnakeToCamel(str: string) {
  return str.replace(/(_\w)/g, (m) => m[1].toUpperCase());
}

/**
 * Recursively convert object key strings from snake case to camel case
 *
 * @example convertObjectKeysFromSnakeToCamel({ foo_bar_baz: { deep_key: 'value' } }) // { fooBarBaz: { deepKey: 'value' } }
 */
export function convertObjectKeysFromSnakeToCamel<T>(obj: T): CamelCaseObject<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj as CamelCaseObject<T>;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeysFromSnakeToCamel(item)) as any;
  }
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelCaseKey = convertStringFromSnakeToCamel(key);
    result[camelCaseKey] = convertObjectKeysFromSnakeToCamel(value);
  }
  return result;
}

/**
 * Type to convert string literal type from camel case to snake case
 *
 * @example type SnakeCaseString = SnakeCase<'fooBarBaz'> // 'foo_bar_baz'
 */
type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${SnakeCase<U>}`
    : `${Uncapitalize<T>}_${SnakeCase<Uncapitalize<U>>}`
  : S;

/**
 * Type to recursively convert object key strings from camel case to snake case
 *
 * @example type SnakeCaseObject = SnakeCaseObject<{ fooBarBaz: { deepKey: string } }> // { foo_bar_baz: { deep_key: string } }
 */
type SnakeCaseObject<T> = T extends any[]
  ? { [K in keyof T]: SnakeCaseObject<T[K]> }
  : T extends object
  ? { [K in keyof T as SnakeCase<K & string>]: SnakeCaseObject<T[K]> }
  : T;

/**
 * Convert a string from camel case to snake case
 *
 * @example toSnakeCase('fooBarBaz') // 'foo_bar_baz'
 */
function convertStringFromCamelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
}

/**
 * Recursively convert object key strings from camel case to snake case
 *
 * @example convertObjectKeysFromCamelToSnake({ fooBarBaz: { deepKey: 'value' } }) // { foo_bar_baz: { deep_key: 'value' } }
 */
export function convertObjectKeysFromCamelToSnake<T>(obj: T): SnakeCaseObject<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj as SnakeCaseObject<T>;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeysFromCamelToSnake(item)) as any;
  }
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeCaseKey = convertStringFromCamelToSnake(key);
    result[snakeCaseKey] = convertObjectKeysFromCamelToSnake(value);
  }
  return result;
}
