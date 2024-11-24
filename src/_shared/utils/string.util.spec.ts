import { StringUtil } from './string.util';

describe('StringUtil', () => {
	it('should return true for string primitives', () => {
		expect(StringUtil.isString('hello')).toBe(true);
	});

	it('should return true for String objects', () => {
		expect(StringUtil.isString(new String('hello'))).toBe(true);
	});

	it('should return false for non-string types', () => {
		expect(StringUtil.isString(123)).toBe(false);
		expect(StringUtil.isString({})).toBe(false);
		expect(StringUtil.isString([])).toBe(false);
		expect(StringUtil.isString(null)).toBe(false);
		expect(StringUtil.isString(undefined)).toBe(false);
	});
});
