# Unified Naming Convention
aka UNC, is an organization between executor developers to provide a unified scripting API for our scripters.

## Why?
Over the years scripting has gotten more and more complex to support multiple executors. This is because of the many unique naming conventions various executors use.

Consider the following scenario. You want to know if a function belongs to the executor or not. In order for this code to be cross compatiable with all executors code like this is needed:
```lua
local is_executor_closure = is_syn_closure or is_fluxus_closure or is_sentinel_closure or is_krnl_closure or is_proto_closure or is_calamari_closure or is_electron_closure or is_elysian_closure
```
This is reality for scripters who want cross compatibilty in their scripts. Scripters shouldn't have to do such laborous work just to attain cross compatability. The UNC seeks to solve this problem using naming conventions everyone agrees upon and follows.

One variant of a script should naturally work on all script executors which have their environment properly fitted to the UNC. 

## How?
The UNC provides standards for naming conventions as well as API functionality. The standard is written in markdown on this GitHub. Edits or additions are done through pull requests. Edits and additions are manually approved by the UNC council and discussed by everyone.

## How is this different from regular UNC?

This version of UNC aims to be open, like the original, while incorperating more rigorous tests. It's also written in TypeScript to make the test more robust, and to allow creating Luau types from the TypeScript types. It's apart of an effort to encourage better and higher quality script development in the Roblox exploiting community.

## Checking your environment

You can run the UNC environment checking script to see how well your executor environment supports the UNC standard. Find the script [here.](./dist/init.lua) The script determines what is missing, and writes the results to file under workspace.