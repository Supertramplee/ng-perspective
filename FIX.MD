1.  

    ```bash
    Error: node_modules/@finos/perspective/index.d.ts:2:25 - error TS7016: Could not find a declaration file for module 'ws'. 'C:/Project/Perspective/ng-perspective/node_modules/ws/index.js' implicitly has an 'any' type.
      Try `npm i --save-dev @types/ws` if it exists or add a new declaration (.d.ts) file containing `declare module 'ws';`
    
    2     import * as ws from "ws";
                              ~~~~
    ```

    fix:   `npm i --save-dev @types/ws`

2.   

     ```bash
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

3.   then seems it works well, but there's some error with workspace:

    <img src="docs\Snipaste_2021-10-21_14-11-23.png" alt="Snipaste_2021-10-21_14-11-23" style="zoom:60%;" />

4.  try to have a production build `ng build` , show some build error:

    ```bash
    ✔ Browser application bundle generation complete.
    ✔ Copying assets complete.
    ⠋ Generating index html...1 rules skipped due to selector errors:
      400&display=swap);@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono@200;400&display=swap);@import url(https://unpkg.com/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css);.perspective-viewer-material -> Unmatched selector: &display=swap);@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono@200;400&display=swap);@import url(https://unpkg.com/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css);.perspective-viewer-material
    ✔ Index html generation complete.
    ```

    and too many css error for this build:

    ![image-20211021143137843](docs\image-20211021143137843.png)

    ![image-20211021143017012](docs\image-20211021143017012.png)

  5.  then, try to add `"@finos/perspective-webpack-plugin": "^1.0.0"`  Errors below, related to monaco-editor.

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

6.  try with your  [webpack demo](https://github.com/finos/perspective/tree/master/examples/webpack), after i fix some package missing/upgrade,  similar issue related with monaco-editor.. 

    ```javascript
        "dependencies": {
            "@finos/perspective": "^1.0.0",
            "@finos/perspective-viewer": "^1.0.0",
            "@finos/perspective-viewer-d3fc": "^1.0.0",
            "@finos/perspective-viewer-datagrid": "^1.0.0"
        },
        "devDependencies": {
            "@finos/perspective-webpack-plugin": "^1.0.0",
            "css-loader": "^5.2.7",
            "file-loader": "^6.2.0",
            "html-webpack-plugin": "^4.5.1",
            "less": "^4.1.2",
            "less-loader": "^10.2.0",
            "style-loader": "^3.3.0",
            "webpack": "^5.14.0",
            "webpack-cli": "^4.3.1",
            "webpack-dev-server": "^4.3.1"
        }
    ```

    