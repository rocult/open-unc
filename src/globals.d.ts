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

declare global {
    function getgenv(): {
        cache: typeof cache
        cloneref: typeof cloneref
        compareinstances: typeof compareinstances

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

        getscriptbytecode: (script: Script) => string
    }
    function getrenv(): {
        require: typeof require
    }
}
