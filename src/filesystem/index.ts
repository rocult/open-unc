/**
 * Append to the given file's contents. Creates a new file if it doesn't exist.
 * @param file The path to the file.
 * @param text The text to append.
 */
export function appendfile(file: string, text: string): void {
    writefile(".tests/appendfile.txt", "su")
    appendfile(".tests/appendfile.txt", "cce")
    appendfile(".tests/appendfile.txt", "ss")
    assert(readfile(".tests/appendfile.txt") === "success", "Did not append the file")
}

/**
 * Removes the file at the given path.
 * @param file The path to the file.
 */
export function delfile(file: string): void {
    writefile(".tests/delfile.txt", "Hello, world!")
    delfile(".tests/delfile.txt")
    assert(
        isfile(".tests/delfile.txt") === false,
        `Failed to delete file (isfile = ${tostring(isfile(".tests/delfile.txt"))})`,
    )
}

/**
 * Removes the directory at the given path.
 * @param directory The path to the directory.
 */
export function delfolder(directory: string): void {
    makefolder(".tests/delfolder")
    delfolder(".tests/delfolder")
    assert(
        isfolder(".tests/delfolder") === false,
        `Failed to delete folder (isfolder = ${tostring(isfolder(".tests/delfolder"))})`,
    )
}

/**
 * Attempts to load and run the given file.
 * @param file The path to the file.
 */
export function dofile(file: string): void {
    // TODO: make a test
}

/**
 * Check whether the given path points to a file.
 * @param path The path to verify.
 * @returns Whether the path is a file.
 */
export function isfile(path: string): boolean {
    writefile(".tests/isfile.txt", "success")
    assert(isfile(".tests/isfile.txt") === true, "Did not return true for a file")
    assert(isfile(".tests") === false, "Did not return false for a folder")
    assert(
        isfile(".tests/doesnotexist.exe") === false,
        `Did not return false for a nonexistent path (got ${tostring(isfile(".tests/doesnotexist.exe"))})`,
    )
    return false
}

/**
 * Check whether the given path points to a directory.
 * @param path The path to verify.
 * @returns Whether the path is a directory.
 */
export function isfolder(path: string): boolean {
    assert(isfolder(".tests") === true, "Did not return false for a folder")
    assert(
        isfolder(".tests/doesnotexist.exe") === false,
        `Did not return false for a nonexistent path (got ${tostring(isfolder(".tests/doesnotexist.exe"))})`,
    )
    return false
}

/**
 * Returns a list of file paths in the given directory.
 * @param directory The path to the directory.
 * @returns The list of files.
 */
export function listfiles(directory: string): readonly string[] {
    makefolder(".tests/listfiles")
    writefile(".tests/listfiles/test_1.txt", "success")
    writefile(".tests/listfiles/test_2.txt", "success")
    const files = listfiles(".tests/listfiles")
    assert(files.size() === 2, "Did not return the correct number of files")
    assert(isfile(files[1]), "Did not return a file path")
    assert(readfile(files[1]) === "success", "Did not return the correct files")
    makefolder(".tests/listfiles_2")
    makefolder(".tests/listfiles_2/test_1")
    makefolder(".tests/listfiles_2/test_2")
    const folders = listfiles(".tests/listfiles_2")
    assert(folders.size() === 2, "Did not return the correct number of folders")
    assert(isfolder(folders[0]), "Did not return a folder path")
    return false as unknown as readonly string[]
}

/**
 * Create a new directory at the given path.
 * @param directory The path to the directory.
 */
export function makefolder(directory: string): void {
    makefolder(".tests/makefolder")
    assert(isfolder(".tests/makefolder"), "Did not create the folder")
}

/**
 * Load the given file and return its contents.
 * @param file The path to the file.
 * @returns The file's contents.
 */
export function readfile(file: string): string {
    writefile(".tests/readfile.txt", "success")
    assert(readfile(".tests/readfile.txt") === "success", "Did not return the contents of the file")
    return false as unknown as string
}

/**
 * Change the given file's contents. Creates a new file if it doesn't exist.
 * @param file The path to the file.
 * @param text The text to write.
 */
export function writefile(file: string, text: string): void {
    writefile(".tests/writefile.txt", "success")
    assert(readfile(".tests/writefile.txt") === "success", "Did not write the file")
    const [requiresFileExt, _] = pcall(() => {
        writefile(".tests/writefile", "success")
        assert(isfile(".tests/writefile.txt"))
    })
    assert(requiresFileExt, "This executor requires a file extension in writefile")
}
