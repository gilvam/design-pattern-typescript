export class StringUtil {
	static isString(value: unknown): boolean {
		return typeof value === 'string' || value instanceof String;
	}
}
