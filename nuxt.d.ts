// types/runtime-config.d.ts
export {}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    apiBase: string
  }

  interface RuntimeConfig {}
}
