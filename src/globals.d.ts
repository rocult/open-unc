import { cache, cloneref, compareinstances } from "./cache"
import {
    checkcaller,
    checkclosure,
    clonefunc,
    clonefunction,
    getcallingscript,
    getscriptclosure,
    getscriptfunction,
    hookfunction,
    iscclosure,
    isexecutorclosure,
    islclosure,
    isourclosure,
    loadstring,
    newcclosure,
    replaceclosure,
} from "./closures"
import {
    consoleclear,
    consolecreate,
    consoleinput,
    consoleprint,
    consolesettitle,
    rconsoleclear,
    rconsolecreate,
    rconsoledestroy,
    rconsoleinput,
    rconsolename,
    rconsoleprint,
    rconsolesettitle,
} from "./console"
import { base64_decode, base64_encode, crypt } from "./crypt"
import { debug } from "./debug"

declare global {
    function getgenv(): {
        cache: typeof cache
        cloneref: typeof cloneref
        compareinstances: typeof compareinstances
        crypt: typeof crypt
        debug: typeof debug

        checkcaller: typeof checkcaller
        clonefunction: typeof clonefunction
        clonefunc: typeof clonefunc
        getcallingscript: typeof getcallingscript
        getscriptclosure: typeof getscriptclosure
        getscriptfunction: typeof getscriptfunction
        hookfunction: typeof hookfunction
        replaceclosure: typeof replaceclosure
        iscclosure: typeof iscclosure
        isexecutorclosure: typeof isexecutorclosure
        checkclosure: typeof checkclosure
        isourclosure: typeof isourclosure
        islclosure: typeof islclosure
        loadstring: typeof loadstring
        newcclosure: typeof newcclosure

        rconsoleclear: typeof rconsoleclear
        consoleclear: typeof consoleclear
        rconsolecreate: typeof rconsolecreate
        consolecreate: typeof consolecreate
        rconsoledestroy: typeof rconsoledestroy
        rconsoleinput: typeof rconsoleinput
        consoleinput: typeof consoleinput
        rconsoleprint: typeof rconsoleprint
        consoleprint: typeof consoleprint
        rconsolesettitle: typeof rconsolesettitle
        rconsolename: typeof rconsolename
        consolesettitle: typeof consolesettitle

        base64_decode: typeof base64_decode
        base64_encode: typeof base64_encode

        getscriptbytecode: (script: Script) => string
    }
    function getrenv(): {
        require: typeof require
    }
}
