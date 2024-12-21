export function shallowEqual<T>(t1: Map<string, T>, t2: Map<string, T>): boolean {
    if (t1 === t2) {
        return true
    }

    const UNIQUE_TYPES: Record<string, boolean> = {
        function: true,
        object: true, // 'table' in Lua is 'object' in JavaScript/TypeScript
        symbol: true, // 'userdata' in Lua can be considered 'symbol' in JavaScript/TypeScript
        undefined: true, // 'thread' in Lua doesn't have a direct equivalent, using 'undefined' as a placeholder
    }

    for (const [k, v] of t1) {
        if (UNIQUE_TYPES[typeOf(v)]) {
            if (typeOf(t2.get(k)) !== typeOf(v)) {
                return false
            }
        } else if (t2.get(k) !== v) {
            return false
        }
    }

    for (const [k, v] of t2) {
        if (UNIQUE_TYPES[typeOf(v)]) {
            if (typeOf(t2.get(k)) !== typeOf(v)) {
                return false
            }
        } else if (t1.get(k) !== v) {
            return false
        }
    }

    return true
}

export default shallowEqual
