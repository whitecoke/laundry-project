import * as path from "https://deno.land/std@0.146.0/path/mod.ts";
import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));
const publicDir = path.join(moduleDir, "pages");

export const router = new Router();

function getPublicFile(...filePath: string[]): Promise<Uint8Array> {
  return Deno.readFile(path.join(publicDir, ...filePath));
}

router.get("/", async (context: any, next: any) => {
  context.response.body = await getPublicFile("build/index.html");
  context.response.type = "text/html";
  await next();
});