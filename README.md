# AS-Audio 🔊
**AssemblyScript Audio API for NodeJS and Browser**

## Installation

```bash
~ npm install as-audio
```
Install optional dependencies
```bash
~ npm install speaker
```

## Setting up

**NodeJS**

```js
...
const loader = require('@assemblyscript/loader')
+ const AudioImport = require('as-audio')
+ const audio = new AudioImport({
+    asBind: false
+    // Can toggle this to true
+ })
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
+ import { AudioImport } from 'https://unpkg.com/as-audio@latest/imports.browser.js'
+ const audio = new AudioImport({
+    asBind: false
+ })
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
import { Audio } from 'as-audio'

const audio = new Audio('https://listen.moe/kpop/opus')
// Kpop stream! 🎶

audio.play()
// Listen away! 🎧
```

## Notes/To-do
- Pause/Resume does not work yet on NodeJS