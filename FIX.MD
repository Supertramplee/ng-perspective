1.  ```bash
    Error: node_modules/@finos/perspective/index.d.ts:2:25 - error TS7016: Could not find a declaration file for module 'ws'. 'C:/Project/Perspective/ng-perspective/node_modules/ws/index.js' implicitly has an 'any' type.
      Try `npm i --save-dev @types/ws` if it exists or add a new declaration (.d.ts) file containing `declare module 'ws';`
    
    2     import * as ws from "ws";
                              ~~~~
    ```

    fix:   `npm i --save-dev @types/ws`

2.   ```bash
    Error: node_modules/@finos/perspective-viewer/dist/esm/extensions.d.ts:10:23 - error TS2688: Cannot find type definition file for 'react'.
    
    10 /// <reference types="react" />
    Error: node_modules/@finos/perspective-viewer/dist/esm/extensions.d.ts:32:52 - error TS2503: Cannot find namespace 'React'.
    
    32 declare type ReactPerspectiveViewerAttributes<T> = React.HTMLAttributes<T>;
                                                          ~~~~~
    Error: node_modules/@finos/perspective-viewer/dist/esm/extensions.d.ts:35:5 - error TS2503: Cannot find namespace 'React'.
    
    35 } & React.DetailedHTMLProps<ReactPerspectiveViewerAttributes<PerspectiveViewerElement>, PerspectiveViewerElement>;
           ~~~~~
    
    ```

    fix:  `npm i --save-dev @types/react`

3.  ```bash
    ✔ Browser application bundle generation complete.
    ✔ Copying assets complete.
    ⠋ Generating index html...1 rules skipped due to selector errors:
      400&display=swap);@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono@200;400&display=swap);@import url(https://unpkg.com/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css);.perspective-viewer-material -> Unmatched selector: &display=swap);@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono@200;400&display=swap);@import url(https://unpkg.com/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css);.perspective-viewer-material
    ✔ Index html generation complete.
    ```

    error after production build... and will cause style error...

    ![image-20211021143137843](docs\image-20211021143137843.png)

    ![image-20211021143017012](docs\image-20211021143017012.png)

  4.  Errors below if add `"@finos/perspective-webpack-plugin": "^1.0.0"`, seems still related to monaco-editor.

      ```bash
     ...............................
     ./node_modules/monaco-editor/esm/vs/platform/actions/browser/menuEntryActionViewItem.css - Error: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):
     SyntaxError
     
     (1:1) C:\Project\Perspective\ng-perspective-webpack\node_modules\monaco-editor\esm\vs\platform\actions\browser\menuEntryActionViewItem.css Unknown word        
     
     > 1 | exports = module.exports = require("../../../../../../@finos/perspective-webpack-plugin/node_modules/css-loader/lib/css-base.js")(false);
         | ^
       2 | // imports
       3 | 
     
     
     ./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css - Error: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):
     SyntaxError
     
     (1:1) C:\Project\Perspective\ng-perspective-webpack\node_modules\monaco-editor\esm\vs\platform\contextview\browser\contextMenuHandler.css Unknown word
     
     > 1 | exports = module.exports = require("../../../../../../@finos/perspective-webpack-plugin/node_modules/css-loader/lib/css-base.js")(false);
         | ^
       2 | // imports
      ```

     