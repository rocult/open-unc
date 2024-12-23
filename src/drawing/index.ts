export interface Drawings {
    Line: DrawingLine
    Text: DrawingText
    Image: DrawingImage
    Circle: DrawingCircle
    Square: DrawingSquare
    Quad: DrawingQuad
    Triangle: DrawingTriangle
}

export interface DrawingConstructor {
    /**
     * Creates a new drawing of type `drawingType`.
     */
    "new"<T extends keyof Drawings>(drawingType: T): Drawings[T]

    /**
     * Maps the supported font styles to numbers.
     */
    readonly Fonts: {
        UI: 0
        System: 1
        Plex: 2
        Monospace: 3
    }
}

/**
 * The Drawing library. Uses Luau objects to create and manipulate drawings.
 * @example
 * const circle = new Drawing("Circle");
 * circle.Radius = 50;
 * circle.Color = Color3.fromRGB(255, 255, 255);
 * circle.Filled = false;
 * circle.NumSides = 32;
 * circle.Position = new Vector2(20, 20);
 * circle.Transparency = 0.9;
 * circle.Destroy();
 */
export const Drawing: DrawingConstructor = {
    Fonts: {
        UI: 0,
        System: 1,
        Plex: 2,
        Monospace: 3,
    },
    new<T extends keyof Drawings>(drawingType: T): Drawings[T] {
        const drawing = getgenv().Drawing.new("Square")
        drawing.Visible = false
        const canDestroy = pcall(() => drawing.Destroy())
        assert(canDestroy, "Drawing:Destroy() should not throw an error")
        return false as unknown as Drawings[T]
    },
}
/**
 * The base class for all drawings. Cannot be instantiated directly.
 */
export interface Drawing {
    Visible: boolean
    ZIndex: number
    Transparency: number
    Color: Color3
    Destroy(): void

    /** @deprecated */
    Remove(): void
}

/**
 * Draws a line from `From` to `To`.
 */
export interface DrawingLine extends Drawing {
    Thickness: number
    From: Vector2
    To: Vector2
}

/**
 * Renders text to the screen.
 */
export interface DrawingText extends Drawing {
    Text: string
    readonly TextBounds: Vector2
    Size: number
    Center: boolean
    Outline: boolean
    OutlineColor: Color3
    Position: Vector2
    Font: number
}

/**
 * Renders an image to the screen. Set `Data` to the image data, **not a URL!**
 */
export interface DrawingImage extends Drawing {
    Data: string
    Size: Vector2
    Position: Vector2
    Rounding: number
}

/**
 * Draws a circle centered at `Position`.
 *
 * **NOTE:** Circles are not drawn perfectly; the more "sides" rendered, the
 * greater the performance hit.
 */
export interface DrawingCircle extends Drawing {
    Thickness: number
    NumSides: number
    Radius: number
    Filled: boolean
    Position: Vector2
}

/**
 * Draws a square starting at `Position` and ending at `Position + Size`.
 */
export interface DrawingSquare extends Drawing {
    Thickness: number
    Size: Vector2
    Position: Vector2
    Filled: boolean
}

/**
 * Draws a quadrilateral with the given points.
 */
export interface DrawingQuad extends Drawing {
    Thickness: number
    PointA: Vector2
    PointB: Vector2
    PointC: Vector2
    PointD: Vector2
    Filled: boolean
}

/**
 * Draws a triangle with the given points.
 */
export interface DrawingTriangle extends Drawing {
    Thickness: number
    PointA: Vector2
    PointB: Vector2
    PointC: Vector2
    Filled: boolean
}

// Drawing functions

/**
 * Clears all Drawings from the screen. Invalidates all references to pre-existing Drawing objects.
 */
export function cleardrawcache(): void {
    // erm how to test this
}

/**
 * Gets the value of a Drawing's property. Invokes `__index`.
 * @param drawing The Drawing to get the property of.
 * @param property The property to get.
 * @returns The value of the property.
 * @example
 * const circle = new Drawing("Circle");
 * getrenderproperty(circle, "Position"); // Vector2
 */
export function getrenderproperty<T extends Drawing, K extends keyof T>(drawing: T, property: K): T[K] {
    const image = getgenv().Drawing.new("Image")
    image.Visible = true
    assert(
        type(getgenv().getrenderproperty(image, "Visible")) === "boolean",
        "Did not return a boolean value for Image.Visible",
    )
    const [success, result] = pcall(() => getgenv().getrenderproperty(image, "Color"))
    assert(!success || !result, "Image.Color is not supported")
    return false as unknown as T[K]
}

/**
 * Returns whether `object` is a valid Drawing.
 * @param object The object to check.
 * @returns Whether `object` is a valid Drawing.
 */
export function isrenderobj(object: unknown): object is Drawing {
    const image = getgenv().Drawing.new("Image")
    image.Visible = true
    assert(getgenv().isrenderobj(image) === true, "Did not return true for an Image")
    assert(getgenv().isrenderobj(newproxy()) === false, "Did not return false for a blank table")
    return false
}

/**
 * Sets the value of a Drawing's property to `value`. Invokes `__newindex`.
 * @param drawing The Drawing to set the property of.
 * @param property The property to set.
 * @param value The value to set.
 * @example
 * const circle = new Drawing("Circle");
 * setrenderproperty(circle, "Position", new Vector2());
 */
export function setrenderproperty<T extends Drawing, K extends keyof T>(drawing: T, property: K, value: T[K]): void {
    const square = getgenv().Drawing.new("Square")
    square.Visible = true
    getgenv().setrenderproperty(square, "Visible", false)
    assert((square.Visible as boolean) === false, "Did not set the value for Square.Visible")
}
