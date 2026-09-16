const STORAGE_BASE = (process.env.INTEGRATION_PROXY_URL || "").trim() || "https://integrations.emergentagent.com";
const STORAGE_URL = `${STORAGE_BASE.replace(/\/$/, "")}/objstore/api/v1/storage`;
const EMERGENT_KEY = process.env.EMERGENT_LLM_KEY;

let storageKey = null;

export async function initStorage(force = false) {
  if (storageKey && !force) return storageKey;
  const resp = await fetch(`${STORAGE_URL}/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emergent_key: EMERGENT_KEY }),
    signal: AbortSignal.timeout(30000),
  });
  if (!resp.ok) throw new Error(`Storage init failed: ${resp.status}`);
  storageKey = (await resp.json()).storage_key;
  return storageKey;
}

export async function putObject(path, data, contentType) {
  let key = await initStorage();
  let resp = await fetch(`${STORAGE_URL}/objects/${path}`, {
    method: "PUT",
    headers: { "X-Storage-Key": key, "Content-Type": contentType },
    body: data,
    signal: AbortSignal.timeout(120000),
  });
  if (resp.status === 404) {
    key = await initStorage(true);
    resp = await fetch(`${STORAGE_URL}/objects/${path}`, {
      method: "PUT",
      headers: { "X-Storage-Key": key, "Content-Type": contentType },
      body: data,
      signal: AbortSignal.timeout(120000),
    });
  }
  if (!resp.ok) throw new Error(`Storage upload failed: ${resp.status}`);
  return resp.json();
}

export async function getObject(path) {
  const key = await initStorage();
  const resp = await fetch(`${STORAGE_URL}/objects/${path}`, {
    headers: { "X-Storage-Key": key },
    signal: AbortSignal.timeout(60000),
  });
  if (!resp.ok) throw new Error(`Storage download failed: ${resp.status}`);
  const buffer = Buffer.from(await resp.arrayBuffer());
  return { data: buffer, contentType: resp.headers.get("content-type") || "application/octet-stream" };
}
