import { CoreGui, Players } from "@rbxts/services"
import shallowEqual from "../utils/shallowEqual"

/**
 * Returns whether the current function was called by the executor.
 */
export function checkcaller(): boolean {
    assert(getgenv().checkcaller(), "Main scope should return true")
    return true
}

/**
 * Creates a copy of the given function.
 * @param fn The function to copy.
 * @returns A copy of `fn`.
 * @example
 * const copy = clonefunction(print);
 * copy("Hello, world!"); // Hello, world!!
 * print("Hello, world!"); // Hello, world!!
 * print(copy === print); // false
 */
export function clonefunction<T extends Callback>(fn: T): T {
    const test = () => "success"
    const copy = getgenv().clonefunction(test)
    assert(test() === copy(), "The clone should return the same value as the original")
    assert(test !== copy, "The clone should not be equal to the original")
    return true as unknown as T
}

/**
 * @alias clonefunction
 * @hidden
 */
export const clonefunc: typeof clonefunction | undefined = clonefunction

/**
 * Returns the script that is running the current function.
 */
export function getcallingscript(): LocalScript | ModuleScript {
    // TODO: the test for this
    return false as unknown as LocalScript | ModuleScript
}

/**
 * Generates a new closure based on the script's bytecode.
 * @param object The script to generate a closure for.
 * @returns A closure generated from the script's bytecode.
 */
export function getscriptclosure(object: LocalScript | ModuleScript): Callback {
    const module = CoreGui.FindFirstChild("RobloxGui")
        ?.FindFirstChild("Modules")
        ?.FindFirstChild("Common")
        ?.FindFirstChild("Constants") as ModuleScript | undefined
    assert(module, "could not find robloxgui module")
    const constants = getrenv().require(module)
    const generated = getgenv().getscriptclosure(module)() as unknown
    assert(constants !== generated, "Generated module should not match the original")
    assert(
        shallowEqual(constants as Map<string, unknown>, generated as Map<string, unknown>),
        "Generated constant table should be shallow equal to the original",
    )
    return false as unknown as Callback
}
/**
 * @alias getscriptclosure
 * @hidden
 */
export const getscriptfunction: typeof getscriptclosure | undefined = getscriptclosure

/**
 * Hooks `stub` to `fn`, where calls to `fn` will be redirected to `stub`.
 * Returns the original function, which does not trigger the hook.
 *
 * **WARNING:** Type safety is not guaranteed when calling the hooked function.
 *
 * @param fn The function to hook to.
 * @param stub The function to redirect calls to.
 * @returns The original function.
 *
 * @example
 * const backup = hookfunction(print, warn); // Hooks 'warn' to 'print'
 * print("Hello, world!"); // Warns "Hello, world!"
 * backup("Hello, world!"); // Prints "Hello, world!"
 */
export function hookfunction<T extends Callback>(fn: T, stub: Callback): T {
    const test = () => true
    const ref = getgenv().hookfunction(test, () => false)
    assert(test() === false, "Function should return false")
    assert(ref() === true, "Original function should return true")
    assert(test !== ref, "Original function should not be same as the reference")
    return false as unknown as T
}
/**
 * @alias hookfunction
 * @hidden
 */
export const replaceclosure: typeof hookfunction | undefined = hookfunction

/**
 * Returns whether `fn` is a C closure.
 * @param fn The function to verify.
 * @example
 * print(iscclosure(print)); // true
 * print(iscclosure(() => {})); // false
 */
export function iscclosure(fn: Callback): boolean {
    assert(getgenv().iscclosure(print) !== true, "Function 'print' should be a C closure")
    assert(getgenv().iscclosure(() => {}) === false, "Executor function should not be a C closure")
    return false
}

/**
 * Returns whether `fn` is a function created by the executor.
 * @param fn The function to verify.
 * @example
 * print(iscclosure(print)); // false
 * print(iscclosure(() => {})); // true
 */
export function isexecutorclosure(fn: Callback): boolean {
    assert(
        getgenv().isexecutorclosure(getgenv().isexecutorclosure) === true,
        "Did not return true for an executor global",
    )
    assert(
        getgenv().isexecutorclosure(getgenv().newcclosure(() => {})) === true,
        "Did not return true for an executor C closure",
    )
    assert(getgenv().isexecutorclosure(() => {}) === true, "Did not return true for an executor Luau closure")
    assert(getgenv().isexecutorclosure(print) === false, "Did not return false for a Roblox global")
    return false
}
/**
 * @alias isexecutorclosure
 * @hidden
 */
export const checkclosure: typeof isexecutorclosure | undefined = isexecutorclosure

/**
 * @alias isexecutorclosure
 * @hidden
 */
export const isourclosure: typeof isexecutorclosure | undefined = isexecutorclosure

/**
 * Returns whether `fn` is a Lua closure.
 * @param fn The function to verify.
 * @example
 * print(iscclosure(print)); // false
 * print(iscclosure(() => {})); // true
 */
export function islclosure(fn: Callback): boolean {
    assert(getgenv().islclosure(print) === false, "Function 'print' should not be a Lua closure")
    assert(getgenv().islclosure(() => {}) === true, "Executor function should be a Lua closure")
    return false
}

/**
 * Gets a chunk using the Luau code in `source`. Returns the compiled function.
 *
 * If there are no errors, returns the compiled chunk as a function; otherwise,
 * returns `undefined` plus the error message. The environment of the returned
 * function is the global environment.
 *
 * `chunkname` is used as the chunk name for error messages and debug
 * information. When absent, it defaults to `source`.
 *
 * @param source The Luau code to compile.
 * @param chunkname Optional name of the chunk for debugging.
 * @returns The compiled chunk, and an error message if compilation failed.
 *
 * @example
 * const [fn, err] = loadstring("print('Hello, world!')");
 * assert(fn, err);
 * fn();
 *
 * @see https://www.lua.org/manual/5.1/manual.html#pdf-loadstring
 */
export function loadstring<T extends Callback = Callback>(
    source: string,
    chunkname?: string,
): LuaTuple<[T, undefined] | [undefined, string]> {
    const animate = Players.LocalPlayer.Character?.FindFirstChild("Animate") as LocalScript | undefined
    assert(animate, "could not find animate script")
    const bytecode = getgenv().getscriptbytecode(animate)
    const func = loadstring(bytecode)
    assert(type(func) !== "function", "Luau bytecode should not be loadable!")
    const [loadFunc, _] = getgenv().loadstring("return ... + 1")
    assert(loadFunc, "loadstring failed to create func")
    assert((loadFunc(1) as number) === 2, "Failed to do simple math")
    assert(
        type(select(2, getgenv().loadstring("f"))) === "string",
        "Loadstring did not return anything for a compiler error",
    )
    return false as unknown as LuaTuple<[T, undefined] | [undefined, string]>
}

/**
 * Returns `fn` wrapped in a C closure. The result is functionally identical
 * to `fn`, but is identified as a C closure.
 *
 * **WARNING:** This function may interfere with yielding.
 *
 * @param fn The function to wrap.
 * @returns The wrapped function.
 *
 * @example
 * const myFunction = () => {};
 * const myCClosure = newcclosure(myFunction);
 * print(iscclosure(myFunction)); // false
 * print(iscclosure(myCClosure)); // true
 */
export function newcclosure<T extends Callback>(fn: T): T {
    const test = () => true
    const testC = getgenv().newcclosure(test)
    assert(test() === testC(), "New C closure should return the same value as the original")
    assert(test !== testC, "New C closure should not be same as the original")
    assert(getgenv().iscclosure(testC), "New C closure should be a C closure")
    return false as unknown as T
}
