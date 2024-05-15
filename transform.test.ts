import { convertObjectKeysFromCamelToSnake, convertObjectKeysFromSnakeToCamel } from './transform';

describe('convertObjectKeysFromSnakeToCamel', () => {
  it('Recursively converts object keys from snake to camel', () => {
    expect(
      convertObjectKeysFromSnakeToCamel({
        foo_bar_baz: {
          deep_key: 'value',
        },
        array_key: [1, 2, 3],
      }),
    ).toStrictEqual({
      fooBarBaz: {
        deepKey: 'value',
      },
      arrayKey: [1, 2, 3],
    });
  });

  describe('For unexpected argument types', () => {
    it.each([null, 'string', 1, true, Symbol('symbol')])(
      'Returns the same value if obj is a non-object primitive - %s',
      (value) => {
        expect(convertObjectKeysFromSnakeToCamel(value)).toBe(value);
      },
    );
  });

  describe('type', () => {
    it('Recursively converts object keys from snake to camel', () => {
      expectTypeOf(
        convertObjectKeysFromSnakeToCamel({
          foo_bar_baz: {
            deep_key: 'value',
          },
          array_key: [1, 2, 3],
        }),
      ).toEqualTypeOf<{
        fooBarBaz: {
          deepKey: string;
        };
        arrayKey: number[];
      }>;
    });
  });
});

describe('convertObjectKeysFromCamelToSnake', () => {
  it('Recursively converts object keys  from camel to snake', () => {
    expect(
      convertObjectKeysFromCamelToSnake({
        fooBarBaz: {
          deepKey: 'value',
        },
        arrayKey: [1, 2, 3],
      }),
    ).toStrictEqual({
      foo_bar_baz: {
        deep_key: 'value',
      },
      array_key: [1, 2, 3],
    });
  });

  describe('For unexpected argument types', () => {
    it.each([null, 'string', 1, true, Symbol('symbol')])(
      'Returns the same value if obj is a non-object primitive - %s',
      (value) => {
        expect(convertObjectKeysFromCamelToSnake(value)).toBe(value);
      },
    );
  });

  describe('type', () => {
    it('Recursively converts object keys from camel to snake', () => {
      expectTypeOf(
        convertObjectKeysFromCamelToSnake({
          fooBarBaz: {
            deepKey: 'value',
          },
          arrayKey: [1, 2, 3],
        }),
      ).toEqualTypeOf<{
        foo_bar_baz: {
          deep_key: string;
        };
        array_key: number[];
      }>;
    });
  });
});
