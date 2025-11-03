/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    // add other env vars here
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};