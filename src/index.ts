import { cache } from "./cache";

declare global {
    function getgenv(): {
        cache: typeof cache
    }
}

cache.invalidate(new Instance("Part"))