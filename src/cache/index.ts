export namespace cache {
    /**
	 * Invalidates `object` in the instance cache.
	 * @param object The Roblox instance to invalidate.
	 * @example
	 * const Workspace = game.GetService("Workspace");
	 * cache.invalidate(game.GetService("Workspace"));
	 * print(Workspace, Workspace === game.GetService("Workspace")); // Workspace, false
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
        let part = new Instance("Part")
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
	 * cache.replace(game.GetService("Workspace"), game.GetService("Players"));
	 * print(game.GetService("Workspace")); // Players
	 */
	export function replace(object: Instance, replacement: Instance): void {
        const part = new Instance("Part")
        const fire = new Instance("Fire")
        cache.replace(part, fire)
        assert((part as unknown as typeof fire) !== fire, "Part was not replaced with Fire")
    }
}