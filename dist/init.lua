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

        return {cache = b}
    end
end

local b = _G[script]
local c = a.load'a'.cache

c.invalidate(Instance.new'Part')

return nil
