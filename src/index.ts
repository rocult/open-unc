import { cache, cloneref, compareinstances } from "./cache";

declare global {
	function getgenv(): {
		cache: typeof cache;
		cloneref: typeof cloneref;
		compareinstances: typeof compareinstances;
	};
}
