/**
 * Clears the console window.
 */
export function rconsoleclear(): void {
    /// erm how do you test this
}
/**
 * @alias rconsoleclear
 * @hidden
 */
export const consoleclear: typeof rconsoleclear | undefined = rconsoleclear

/**
 * Opens an empty console window.
 */
export function rconsolecreate(): void {
    /// erm how do you test this
}
/**
 * @alias rconsolecreate
 * @hidden
 */
export const consolecreate: typeof rconsolecreate | undefined = rconsolecreate

/**
 * Closes the console window after clearing it.
 */
export function rconsoledestroy(): void {
    /// erm how do you test this
}
/**
 * @alias rconsoledestroy
 * @hidden
 */
export const consoledestroy: typeof rconsoledestroy | undefined = rconsoledestroy

/**
 * Waits for the user to input text into the console window. Returns the text.
 * @returns The text entered by the user.
 */
export function rconsoleinput(): string {
    /// erm how do you test this
    return true as unknown as string
}
/**
 * @alias rconsoleinput
 * @hidden
 */
export const consoleinput: typeof rconsoleinput | undefined = rconsoleinput

/**
 * Prints the text to the console window. Some engines may allow you to change
 * text color via `@@@RED@@@`, `@@@BLUE@@@`, etc.
 * @param text The text to print.
 */
export function rconsoleprint(text: string): void {
    /// erm how do you test this
}
/**
 * @alias rconsoleprint
 * @hidden
 */
export const consoleprint: typeof rconsoleprint | undefined = rconsoleprint

/**
 * Sets the title of the console window.
 * @param title The title to set.
 */
export function rconsolesettitle(title: string): void {
    /// erm how do you test this
}
/**
 * @alias rconsolesettitle
 * @hidden
 */
export const rconsolename: typeof rconsolesettitle | undefined = rconsolesettitle
/**
 * @alias rconsolesettitle
 * @hidden
 */
export const consolesettitle: typeof rconsolesettitle | undefined = rconsolesettitle
