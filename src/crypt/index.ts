export type HashAlgorithm = "sha1" | "sha384" | "sha512" | "md5" | "sha256" | "sha3-224" | "sha3-256" | "sha3-512"
export type AESType = "CBC" | "ECB" | "CTR" | "OFB" | "GCM"

/**
 * Handles data encryption and decryption.
 */
export namespace crypt {
    const crypt = getgenv().crypt
    
    /**
     * Base64 encryption and decryption.
     */
    export const base64:
        | {
              /**
               * @alias crypt.base64decode
               */
              decode: typeof base64decode

              /**
               * @alias crypt.base64encode
               */
              encode: typeof base64encode
          }
        | undefined = {
        encode: base64encode,
        decode: base64decode,
    }

    /**
     * Decodes a base64 string to a string of bytes.
     * @param base64 The base64 string to decode.
     * @returns The decoded string of bytes.
     */
    export function base64decode(base64: string): string {
        assert(crypt.base64decode("dGVzdA==") === "test", "Base64 decoding failed")
        return false as unknown as string
    }
    /**
     * @alias crypt.base64decode
     * @hidden
     */
    export const base64_decode: typeof base64decode | undefined = base64decode

    /**
     * Encodes a string of bytes to a base64 string.
     * @param bytes The string of bytes to encode.
     * @returns The encoded base64 string.
     */
    export function base64encode(base64: string): string {
        assert(crypt.base64encode("test") === "dGVzdA==", "Base64 encoding failed")
        return false as unknown as string
    }
    /**
     * @alias crypt.base64encode
     * @hidden
     */
    export const base64_encode: typeof base64encode | undefined = base64encode

    /**
     * Decrypts the given data using AES (ctr mode) with the key and IV. If
     * IV is not provided, it will use the last generated IV.
     * @param data The data to decrypt.
     * @param key The key to use.
     * @param iv The IV to use.
     * @returns The decrypted data.
     */
    export function decrypt(data: string, key: string, iv: string, mode: AESType): string {
        const [genKey, genIV] = [crypt.generatekey(), crypt.generatekey()]
        const [encrypted, _] = crypt.encrypt("test", genKey, genIV, "CBC")
        const decrypted = crypt.decrypt(encrypted, genKey, genIV, "CBC")
        assert(decrypted === "test", "Failed to decrypt raw string from encrypted data")
        return false as unknown as string
    }

    /**
     * Encrypts the given data using AES (ctr mode) with the key and IV.
     * @param data The data to encrypt.
     * @param key The key to use.
     * @param iv The IV to use.
     * @returns The encrypted data.
     */
    export function encrypt(data: string, key: string, iv?: string, mode?: AESType): LuaTuple<[string, string]> {
        const genKey = crypt.generatekey()
        const [encrypted, genIV] = crypt.encrypt("test", genKey, undefined, "CBC")
        assert(iv, "crypt.encrypt should return an IV")
        const decrypted = crypt.decrypt(encrypted, genKey, genIV, "CBC")
        assert(decrypted === "test", "Failed to decrypt raw string from encrypted data")
        return false as unknown as LuaTuple<[string, string]>
    }

    /**
     * Returns a randomly generated string of length `length`. The result is
     * encoded in base64. Typically used for generating IVs.
     * @param length The length of the string to generate.
     * @returns The generated string.
     */
    export function generatebytes(length: number): string {
        const size = math.random(10, 100)
        const bytes = crypt.generatebytes(size)
        const decoded = crypt.base64decode(bytes)
        assert(
            decoded.size() === size,
            `The decoded result should be ${size} bytes long (got ${decoded.size()}, ${bytes.size()} raw)`,
        )
        return false as unknown as string
    }

    /**
     * Returns a randomly generated 256-bit encryption key. The result is
     * encoded in base64.
     * @returns The generated key.
     */
    export function generatekey(): string {
        const key = crypt.generatekey()
        assert(crypt.base64decode(key).size() === 32, "Generated key should be 32 bytes long when decoded")
        return false as unknown as string
    }

    /**
     * Hashes the given data using `algorithm`. Must be able to handle NULL
     * bytes in the result.
     * @param data The data to hash.
     * @param algorithm The algorithm to use.
     * @returns The hashed data.
     */
    export function hash(data: string, algorithm: HashAlgorithm): string {
        const algorithms: HashAlgorithm[] = [
            "sha1",
            "sha384",
            "sha512",
            "md5",
            "sha256",
            "sha3-224",
            "sha3-256",
            "sha3-512",
        ]
        algorithms.forEach((algorithm) => {
            const hash = crypt.hash("test", algorithm)
            assert(hash, `crypt.hash on algorithm ${algorithm} should return a hash`)
        })
        return false as unknown as string
    }
}

/**
 * Handles base64 encryption and decryption.
 * @hidden
 */
export const base64:
    | {
          /**
           * @alias crypt.base64decode
           */
          decode: typeof crypt.base64decode

          /**
           * @alias crypt.base64encode
           */
          encode: typeof crypt.base64encode
      }
    | undefined = crypt.base64

/**
 * @alias crypt.base64decode
 */
export const base64_decode: typeof crypt.base64decode | undefined = crypt.base64decode

/**
 * @alias crypt.base64encode
 */
export const base64_encode: typeof crypt.base64encode | undefined = crypt.base64encode
