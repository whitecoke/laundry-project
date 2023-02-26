import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { router } from "./router.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticFiles("pages/build"));

function printStartupMessage({ hostname, port, secure }: {
  hostname: string;
  port: number;
  secure?: boolean;
}): void {
  const address = new URL(
    `http${secure ? "s" : ""}://${
      hostname === "0.0.0.0" ? "localhost" : hostname
    }:${port}/`,
  ).href;
  console.log(`Listening at ${address}`);
  console.log("Use ctrl+c to stop");
}

app.addEventListener("listen", printStartupMessage);

await app.listen({ port: 8080 });