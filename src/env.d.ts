interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_REST_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
