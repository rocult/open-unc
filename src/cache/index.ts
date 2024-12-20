export namespace cache {
    /**
	 * Invalidates `object` in the instance cache.
	 * @param object The Roblox instance to invalidate.
	 * @example
	 * const Workspace = game.GetService("Workspace")
	 * cache.invalidate(game.GetService("Workspace"))
	 * print(Workspace, Workspace === game.GetService("Workspace")) // Workspace, false
	 */
    export function invalidate(object: Instance): void {
        const container = new Instance("Folder")
        const part = new Instance("Part", container)
        getgenv().cache.invalidate(part)
        assert(part !== container.FindFirstChild("Part"), "Reference `part` could not be invalidated")
    }

    /**
	 * Checks whether `object` exists in the instance cache.
	 * @param object The Roblox instance to check.
	 * @returns Whether `object` exists in the instance cache.
	 */
	export function iscached(object: Instance): boolean {
        const part = new Instance("Part")
        assert(cache.iscached(part), "Part should be cached")
        cache.invalidate(part)
        assert(!cache.iscached(part), "Part should not be cached")
        return true
    }

	/**
	 * Replaces `object` with `replacement` in the instance cache.
	 * @param object The Roblox instance to replace.
	 * @param replacement The replacement instance.
	 * @example
	 * // The cached instance for Workspace is now Players.
	 * // Every time Workspace is accessed from the cache, it will receive Players.
	 * cache.replace(game.GetService("Workspace"), game.GetService("Players"))
	 * print(game.GetService("Workspace")) // Players
	 */
	export function replace(object: Instance, replacement: Instance): void {
        const part = new Instance("Part")
        const fire = new Instance("Fire")
        cache.replace(part, fire)
        assert((part as unknown as typeof fire) !== fire, "Part was not replaced with Fire")
    }
}

/**
 * Returns a copy of `object`'s instance reference. This can be used to access
 * an instance without referencing it.
 * @param object The Roblox instance to clone.
 * @returns A copy of the instance reference for `object`.
 * @example
 * const copy = cloneref(game.GetService("Workspace"))
 * print(clone === game.GetService("Workspace")) // false
 */
export function cloneref(object: Instance): Instance {
    const part = new Instance("Part")
	const clone = cloneref(part)
	assert(part !== clone, "Clone should not be equal to original")
	clone.Name = "Test"
	assert(part.Name === "Test", "Clone should have updated the original")
    return clone
}

/**
 * Compares the first instance with the second instance, regardless of whether
 * the reference is a copy.
 * @param a The first instance to compare.
 * @param b The second instance to compare.
 * @returns Whether `a` and `b` reference the same instance.
 * @example
 * const copy = cloneref(game.GetService("Workspace"))
 * print(copy === game.GetService("Workspace")) // false
 * print(compareinstances(copy, game.GetService("Workspace"))) // true
 */
export function compareinstances(a: Instance, b: Instance): boolean {
    const part = new Instance("Part")
	const clone = cloneref(part)
	assert(part !== clone, "Clone should not be equal to original")
	assert(compareinstances(part, clone), "Clone should be equal to original when using compareinstances()")
    return false
}