local a

a = {
    cache = {},
    load = function(b)
        if not a.cache[b] then
            a.cache[b] = {
                c = a[b](),
            }
        end

        return a.cache[b].c
    end,
}

do
    function a.a()
        local b = {}

        do
            local c = b

            local function invalidate(d)
                local e = Instance.new'Folder'
                local f = Instance.new('Part', e)

                getgenv().cache.invalidate(f)

                local g = f ~= e:FindFirstChild'Part'

                assert(g, 'Reference `part` could not be invalidated')
            end

            c.invalidate = invalidate

            local function iscached(d)
                local e = Instance.new'Part'
                local f = b.iscached(e)

                assert(f, 'Part should be cached')
                b.invalidate(e)

                local g = not b.iscached(e)

                assert(g, 'Part should not be cached')

                return true
            end

            c.iscached = iscached

            local function replace(d, e)
                local f = Instance.new'Part'
                local g = Instance.new'Fire'

                b.replace(f, g)

                local h = f ~= g

                assert(h, 'Part was not replaced with Fire')
            end

            c.replace = replace
        end

        local function cloneref(c)
            local d = Instance.new'Part'
            local e = cloneref(d)
            local f = d ~= e

            assert(f, 'Clone should not be equal to original')

            e.Name = 'Test'

            local g = d.Name == 'Test'

            assert(g, 'Clone should have updated the original')

            return e
        end
        local function compareinstances(c, d)
            local e = Instance.new'Part'
            local f = cloneref(e)
            local g = e ~= f

            assert(g, 'Clone should not be equal to original')

            local h = compareinstances(e, f)

            assert(h, 
[[Clone should be equal to original when using compareinstances()]])

            return false
        end

        return {
            cloneref = cloneref,
            compareinstances = compareinstances,
            cache = b,
        }
    end
    function a.b()
        return setmetatable({}, {
            __index = function(b, c)
                local d = game:GetService(c)

                b[c] = d

                return d
            end,
        })
    end
    function a.c()
        local function shallowEqual(b, c)
            if b == c then
                return true
            end

            local d = {
                ['function'] = true,
                object = true,
                symbol = true,
                undefined = true,
            }

            for e, f in b do
                if d[typeof(f)] then
                    local g = c[e]

                    if typeof(g) ~= typeof(f) then
                        return false
                    end
                elseif c[e] ~= f then
                    return false
                end
            end
            for e, f in c do
                if d[typeof(f)] then
                    local g = c[e]

                    if typeof(g) ~= typeof(f) then
                        return false
                    end
                elseif b[e] ~= f then
                    return false
                end
            end

            return true
        end

        local b = shallowEqual

        return {
            shallowEqual = shallowEqual,
            default = b,
        }
    end
    function a.d()
        local b = _G[script]
        local c = a.load'b'
        local d = c.CoreGui
        local e = c.Players
        local f = a.load'c'.default

        local function checkcaller()
            local g = getgenv().checkcaller()

            assert(g, 'Main scope should return true')

            return true
        end
        local function clonefunction(g)
            local h = function()
                return 'success'
            end
            local i = getgenv().clonefunction(h)
            local j = h() == i()

            assert(j, 'The clone should return the same value as the original')

            local k = h ~= i

            assert(k, 'The clone should not be equal to the original')

            return true
        end

        local g = clonefunction

        local function getcallingscript()
            return false
        end
        local function getscriptclosure(h)
            local i = d:FindFirstChild'RobloxGui'

            if i ~= nil then
                i = i:FindFirstChild'Modules'

                if i ~= nil then
                    i = i:FindFirstChild'Common'

                    if i ~= nil then
                        i = i:FindFirstChild'Constants'
                    end
                end
            end

            local j = i

            assert(j, 'could not find robloxgui module')

            local k = getrenv().require(j)
            local l = getgenv().getscriptclosure(j)()
            local m = k ~= l

            assert(m, 'Generated module should not match the original')

            local n = f(k, l)

            assert(n, 
[[Generated constant table should be shallow equal to the original]])

            return false
        end

        local h = getscriptclosure

        local function hookfunction(i, j)
            local k = function()
                return true
            end
            local l = getgenv().hookfunction(k, function()
                return false
            end)
            local m = k() == false

            assert(m, 'Function should return false')

            local n = l() == true

            assert(n, 'Original function should return true')

            local o = k ~= l

            assert(o, 'Original function should not be same as the reference')

            return false
        end

        local i = hookfunction

        local function iscclosure(j)
            local k = getgenv().iscclosure(print) ~= true

            assert(k, "Function 'print' should be a C closure")

            local l = getgenv().iscclosure(function() end) == false

            assert(l, 'Executor function should not be a C closure')

            return false
        end
        local function isexecutorclosure(j)
            local k = getgenv().isexecutorclosure(getgenv().isexecutorclosure) == true

            assert(k, 'Did not return true for an executor global')

            local l = getgenv().isexecutorclosure(getgenv().newcclosure(function(
            ) end)) == true

            assert(l, 'Did not return true for an executor C closure')

            local m = getgenv().isexecutorclosure(function() end) == true

            assert(m, 'Did not return true for an executor Luau closure')

            local n = getgenv().isexecutorclosure(print) == false

            assert(n, 'Did not return false for a Roblox global')

            return false
        end

        local j = isexecutorclosure
        local k = isexecutorclosure

        local function islclosure(l)
            local m = getgenv().islclosure(print) == false

            assert(m, "Function 'print' should not be a Lua closure")

            local n = getgenv().islclosure(function() end) == true

            assert(n, 'Executor function should be a Lua closure')

            return false
        end
        local function loadstring(l, m)
            local n = e.LocalPlayer.Character

            if n ~= nil then
                n = n:FindFirstChild'Animate'
            end

            local o = n

            assert(o, 'could not find animate script')

            local p = getgenv().getscriptbytecode(o)
            local q = {
                loadstring(p),
            }
            local r = type(q) ~= 'function'

            assert(r, 'Luau bytecode should not be loadable!')

            local s, t = getgenv().loadstring'return ... + 1'

            assert(s, 'loadstring failed to create func')

            local u = (s(1)) == 2

            assert(u, 'Failed to do simple math')

            local v = type{
                select(2, {
                    getgenv().loadstring'f',
                }),
            } == 'string'

            assert(v, 'Loadstring did not return anything for a compiler error')

            return unpack(false)
        end
        local function newcclosure(l)
            local m = function()
                return true
            end
            local n = getgenv().newcclosure(m)
            local o = m() == n()

            assert(o, 'New C closure should return the same value as the original')

            local p = m ~= n

            assert(p, 'New C closure should not be same as the original')

            local q = getgenv().iscclosure(n)

            assert(q, 'New C closure should be a C closure')

            return false
        end

        return {
            checkcaller = checkcaller,
            clonefunction = clonefunction,
            getcallingscript = getcallingscript,
            getscriptclosure = getscriptclosure,
            hookfunction = hookfunction,
            iscclosure = iscclosure,
            isexecutorclosure = isexecutorclosure,
            islclosure = islclosure,
            loadstring = loadstring,
            newcclosure = newcclosure,
            clonefunc = g,
            getscriptfunction = h,
            replaceclosure = i,
            checkclosure = j,
            isourclosure = k,
        }
    end
end

local b = _G[script]
local c = a.load'a'
local d = a.load'd'
local e = 0
local f = 0
local g = {}
local h

local function testMany(i)
    for j, k in pairs(i)do
        if typeof(k) == 'table' then
            testMany(k)
        elseif typeof(k) == 'function' then
            h(j, k)
        end
    end
end

function h(i, j)
    f += 1

    local k, l = pcall(j)

    if k then
        return nil
    end

    print(`[!] {i} failed - {l}`)

    local m = i

    table.insert(g, m)
end

testMany(c)
testMany(d)
print(`Test results: {math.floor(e / f)}% oUNC ({e} out of {f})`)
print'Failed:'

for i, j in g do
    print(`[-] {j}`)
end

return nil
