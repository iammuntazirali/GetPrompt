const STORAGE_KEY = "prompt_votes";

type VoteRecord = Record<string, "up" | "down">;

function readStore(): VoteRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as VoteRecord;
  } catch (err) {
    return {};
  }
}

function writeStore(store: VoteRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (err) {
    // ignore
  }
}

export function hasVoted(id: string): boolean {
  if (!id) return false;
  return Boolean(readStore()[id]);
}

export function getVote(id: string): "up" | "down" | undefined {
  if (!id) return undefined;
  return readStore()[id];
}

export function recordVote(id: string, direction: "up" | "down") {
  if (!id) return;
  const store = readStore();
  if (store[id]) return; // don't overwrite
  store[id] = direction;
  writeStore(store);
}

export function clearVote(id: string) {
  const store = readStore();
  if (store[id]) {
    delete store[id];
    writeStore(store);
  }
}

export function handleVote(id: string, direction: "up" | "down") {
  recordVote(id, direction);
}
