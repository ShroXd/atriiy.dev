An _entry_ is a root module that Rolldown treats as a chunk starting point. It includes three different kinds: 

```Rust
pub enum EntryPointKind {
    UserDefined = 0,
    DynamicImport = 1,
    EmittedUserDefined = 2,
}
```

User-defined entry. It's the user defined entry points from the configuration file.

Dynamic import entry. This is created for code-splitting. When something is reached via a dynamic import, Rolldown may treat the dynamically loaded module as an entry for generating a separate chunk. 

Emitted user-defined entry. These come from plugins call `this.emitFile({ type: 'chunk', ...})`. You can get more information [here](https://rolldown.rs/reference/Interface.PluginContext#emitfile).
