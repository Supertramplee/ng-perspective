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

3.  