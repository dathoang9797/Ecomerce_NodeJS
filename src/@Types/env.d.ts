declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    URL_DATABASE: string,
    DATABASE_USER: string,
    DATABASE_PASSWORD: string,
    NODE_ENV: string
  }
}
