import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";

export const highlightjsProvider = {
  provide: HIGHLIGHT_OPTIONS,
  useValue: {
    coreLibraryLoader: () => import('highlight.js/lib/core'),
    lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, only if you want the line numbers
    languages: {
      typescript: () => import('highlight.js/lib/languages/typescript'),
    }
  }
}
