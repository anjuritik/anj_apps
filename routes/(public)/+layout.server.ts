import log from '$lib/utils/log.js'

export const load = async ({ cookies }) => {
  const me = cookies.get('me') || "{}"
  log.layout('(public)/+layout.server.ts (load)')
  return { me }
}
