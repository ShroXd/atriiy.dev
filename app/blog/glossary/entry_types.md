The entry types are defined in the following Enum.

```rust
pub enum EntryPointKind {
    UserDefined = 0,
    DynamicImport = 1,
    EmittedUserDefined = 2,
}
```

__User-defined entry__. It's the user defined entry points from the configuration file.

__Dynamic import entry__. This is created for code-splitting. When something is reached via a dynamic import, Rolldown may treat the dynamically loaded module as an entry for generating a separate chunk. 

__Emitted user-defined entry__. These come from plugins call `this.emitFile({ type: 'chunk', ...})`. You can get more information [here](https://rolldown.rs/reference/Interface.PluginContext#emitfile).
