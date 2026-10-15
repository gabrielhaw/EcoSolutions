// Development only: browser errors are posted here and printed in the dev
// server's terminal, so problems on another device/browser can be diagnosed.
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
  const body = await req.text();
  console.log("[browser]", req.headers.get("user-agent")?.slice(0, 120), body.slice(0, 1500));
  return new Response(null, { status: 204 });
}
