#!/usr/bin/env node
#!/usr/bin/env node
import { routerMapper } from "./node/router/mapper";
import { reactRouterWriter } from "./node/router/writers/react";
routerMapper({
  pages: { dir: "src/pages" },
  output: { dir: "src/shared/router" },
  importBase: "../../pages",
  writer: reactRouterWriter()
});
console.log("\u2714 zarrcore router generated");
