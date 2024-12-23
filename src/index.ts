import * as cache from "./cache"
import * as closures from "./closures"
import * as console from "./console"

const SuccessCount = 0
let TotalCount = 0
const Failed = new Array<string>()

function testMany<T extends object>(object: T) {
    for (const [name, item] of pairs(object)) {
        if (typeOf(item) === "table") {
            testMany(item as object)
        } else if (typeOf(item) === "function") {
            test(name as string, item as unknown as Callback)
        }
    }
}

function test(name: string, f: Callback) {
    TotalCount += 1

    const [success, err] = pcall(f)
    if (success) return

    print(`[!] ${name} failed - ${err}`)
    Failed.push(name)
}

testMany(cache)
testMany(closures)
testMany(console)
testMany(debug)

print(`Test results: ${math.floor(SuccessCount / TotalCount)}% oUNC (${SuccessCount} out of ${TotalCount})`)
print("Failed:")
for (const FailedTest of Failed) {
    print(`[-] ${FailedTest}`)
}
