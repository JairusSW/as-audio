# AS-Audio 🔊
**AssemblyScript Audio API for NodeJS and Browser**

## Installation

```bash
~ npm install audio-as
```
Install optional dependencies
```bash
~ npm install speaker
```

## Features
- Build for AssemblyScript
- Works with As-Bind
- Isomorphic (Node/Browser)
- ESM/CJS Builds
- Small (~950 bytes)
- Simple API

## Setting up

**NodeJS**

```js
...
const loader = require('@assemblyscript/loader')
+ const AudioImport = require('audio-as')
+ const audio = new AudioImport()
const imports = {
+     ...audio.wasmImports
}
const wasmModule = loader.instantiateSync(..., imports);
+ audio.wasmExports = wasmModule.exports
...
```

**Browser**

```js
...
import * as loader from '...'
+ import { AudioImport } from 'https://unpkg.com/audio-as@latest/imports.browser.js'
+ const audio = new AudioImport()
const imports = {
+    ...audio.wasmImports
}
loader.instantiate(..., imports).then((wasmModule) => {
+    audio.wasmExports = wasmModule.exports
})
...
```

## Usage

**AssemblyScript**
```js
import { Audio } from 'audio-as'

const audio = new Audio('https://.../')

audio.play()
// Listen away! 🎧
```

## Notes/To-do
- Pause/Resume does not work yet on NodeJS