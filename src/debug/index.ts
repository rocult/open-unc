export interface ChunkInfo {
    source: string
    what: string
    numparams: number
    func: Callback
    short_src: string
    currentline: number
    nups: number
    is_vararg: number
    name: string
}

export namespace debug {
    const debug = getgenv().debug

    /**
     * Returns the constant at index `index` in the function or level `fn`.
     * @param fn The function or level to look up.
     * @param index The index of the constant to look up.
     * @returns The constant at index `index` in the function or level `fn`.
     * @example
     * function foo() {
     * 	print("Hello, world!");
     * }
     * debug.getconstant(foo, 1); // print
     * debug.getconstant(foo, 2); // "Hello, world!"
     */
    export function getconstant(fn: Callback | number, index: number): unknown {
        const test = () => "Hello, world!"
        assert(debug.getconstant(test, 1) === "print", "First constant must be print")
        assert(debug.getconstant(test, 2) === undefined, "Second constant must be nil")
        assert(debug.getconstant(test, 3) === "Hello, world!", "Third constant must be 'Hello, world!'")
        return false
    }

    /**
     * Returns a list of constants in the function or level `fn`.
     * @param fn The function or level to look up.
     * @returns A list of constants in the function or level `fn`.
     * @example
     * function foo() {
     * 	const B = 123456;
     * 	print(B, "Hello", warn);
     * }
     * debug.getconstants(foo).forEach(print); // "print", 123456, "Hello", "warn"
     */
    export function getconstants(fn: Callback | number): readonly (string | number)[] {
        const test = () => {
            const num = 5000 + 50000
            print("Hello, world!", num, warn)
        }
        const constants = debug.getconstants(test)
        assert(constants[1] === 50000, "First constant must be 50000")
        assert(constants[2] === "print", "Second constant must be print")
        assert(constants[3] === undefined, "Third constant must be nil")
        assert(constants[4] === "Hello, world!", "Fourth constant must be 'Hello, world!'")
        assert(constants[5] === "warn", "Fifth constant must be warn")
        return false as unknown as string[]
    }

    /**
     * Returns information about the function or level `fn`.
     */
    export function getinfo(fn: Callback | number): ChunkInfo {
        const types = {
            source: "string",
            short_src: "string",
            func: "function",
            what: "string",
            currentline: "number",
            name: "string",
            nups: "number",
            numparams: "number",
            is_vararg: "number",
        }

        const test = (...params: unknown[]) => print(params)
        const info = debug.getinfo(test)
        for (const [k, v] of pairs(types)) {
            assert(info[k] !== undefined, `Did not return a table with a '${k}' field`)
            assert(type(info[k]) === v, `Did not return a table with ${k} as a ${v}, got (${type(info[k])})`)
        }

        return false as unknown as ChunkInfo
    }

    /**
     * Returns the proto at `index` in the function or level `fn`. If `active` is
     * true, it will return a table of every active closure for the proto.
     * @param fn The function or level to look up.
     * @param index The index of the proto to look up.
     * @param active Whether to return a table of active closures for the proto.
     * @returns The proto at `index` of `fn`, or a list of protos.
     * @example
     * function foo() {
     * 	const bar = () => "baz";
     * 	print(bar, bar());
     * }
     *
     * foo();
     *
     * const [bar] = debug.getproto(foo, 1, true); // () => "baz"
     * print(bar()); // baz
     */
    export function getproto<T extends boolean>(
        fn: Callback | number,
        index: number,
        active?: T,
    ): T extends true ? readonly Callback[] : Callback {
        const test = () => {
            const proto = () => true
        }
        const proto = debug.getproto(test, 1, true)[1]
        assert(proto, "Failed to get the inner function")
        assert((proto() as boolean) === true, "The inner function did not return anything")

        return false as unknown as T extends true ? readonly Callback[] : Callback
    }

    /**
     * Returns a list of protos in the function or level `fn`.
     * @param fn The function or level to look up.
     * @returns A list of functions.
     */
    export function getprotos(fn: Callback | number): readonly Callback[] {
        const test = () => {
            const _1 = () => true
            const _2 = () => true
            const _3 = () => true
        }

        const protos = debug.getprotos(test)
        for (let i = 1; i <= protos.size(); i++) {
            const proto = debug.getproto(test, i, true)[1]
            assert(proto(), `Failed to get inner function ${i}`)
        }

        return false as unknown as Callback[]
    }

    /**
     * Returns the value at `index` in the stack frame `level`.
     * @param level The stack frame to look up.
     * @param index The index of the value to look up.
     * @returns The value in the stack.
     *
     * @example
     * print(1, 5, debug.getstack(1, 3)); // 1 5 5
     * print(1, 5, debug.getstack(1, 2)); // 1 5 1
     */
    export function getstack<T>(level: number, index?: T): T extends number ? unknown : readonly unknown[] {
        const _ = "a" + "b"
        assert(debug.getstack(1, 1) === "ab", "The first item in the stack should be 'ab'")
        assert(debug.getstack(1)[1] === "ab", "The first item in the stack table should be 'ab'")
        return false as unknown as T extends number ? unknown : readonly unknown[]
    }

    /**
     * Returns the upvalue at `index` in the function or level `fn`.
     * @param fn The function or level to look up.
     * @param index The index of the upvalue to look up.
     * @returns The upvalue in the function or level.
     * @example
     * const upvalue = "Hello, world!";
     * const foo = () => print(upvalue);
     * debug.getupvalue(foo, 1); // "Hello, world!"
     */
    export function getupvalue(fn: Callback | number, index: number): unknown {
        const upvalue = () => {}
        const test = () => print(upvalue)
        assert(debug.getupvalue(test, 1) === upvalue, "Unexpected value returned from debug.getupvalue")
        return false as unknown
    }

    /**
     * Returns a list of upvalues in the function or level `fn`.
     *
     * **WARNING:** Upvalues can be undefined, so normal array iteration is risky.
     * Instead, iterate through `Object.entries` from `@rbxts/object-utils`.
     *
     * @param fn The function or level to look up.
     * @returns A list of values.
     *
     * @example
     * const up0 = "Hello, ";
     * const up1 = "world!";
     * const foo = () => print(up0, up1);
     * debug.getupvalues(foo); // ["Hello, ", "world!"]
     */
    export function getupvalues(fn: Callback | number): readonly unknown[] {
        const upvalue = () => {}
        const test = () => print(upvalue)
        const upvalues = debug.getupvalues(test)
        assert(upvalues[0] === upvalue, "Unexpected value returned from debug.getupvalues")
        return false as unknown as unknown[]
    }

    /**
     * Sets the constant at `index` in the function or level `fn` to `value`.
     *
     * **NOTE:** The type of `value` must match the type of the constant at `index`.
     *
     * @param fn The function or level to look up.
     * @param index The index of the constant to look up.
     * @param value The value to set.
     *
     * @example
     * const foo = () => print("Hello, world!");
     * debug.setconstant(foo, 2, "Goodbye, world!");
     * debug.getconstant(foo, 2); // "Goodbye, world!"
     */
    export function setconstant(fn: Callback | number, index: number, value: unknown): void {
        const test = () => "fail"
        debug.setconstant(test, 1, "success")
        assert(test() === "success", "debug.setconstant did not set the first constant")
    }

    /**
     * Sets the register at `index` in the stack frame `level` to `value`.
     *
     * **NOTE:** The type of `value` must match the type of the register at `index`.
     *
     * @param level The stack frame to look up.
     * @param index The index of the register to look up.
     * @param value The value to set.
     *
     * @example
     * print(1, 2); // 1, 2
     * print(1, 2, debug.setstack(1, 2, 500)); // 1, 500
     * print(1, 2, debug.setstack(1, 2, 2000)); // 1, 2000
     */
    export function setstack(level: number, index: number, value: unknown): void {
        const test = () => ["fail", debug.setstack(1, 1, "success")]
        const [ret, _] = test()
        assert(ret === "success", "debug.setstack did not set the first stack item")
    }

    /**
     * Sets the upvalue at `index` in the function or level `fn` to `value`.
     * @param fn The function or level to look up.
     * @param index The index of the upvalue to look up.
     * @param value The value to set.
     * @example
     * const upvalue = "Hello, world!";
     * const foo = () => print(upvalue);
     * foo(); // Hello, world!
     * debug.setupvalue(foo, 1, "Goodbye, world!");
     * foo(); // Goodbye, world!
     */
    export function setupvalue(fn: Callback | number, index: number, value: unknown): void {
        const upvalue = () => "fail"
        const test = () => upvalue()
        debug.setupvalue(test, 1, () => "success")
        assert(test() === "success", "debug.setupvalue did not set the first upvalue")
    }
}
