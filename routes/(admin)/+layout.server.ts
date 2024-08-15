import log from '$lib/utils/log'
import { redirect } from '@sveltejs/kit'
export const load = async ({ cookies }) => {
  const me = cookies.get('me') || "{}"
  log.layout('(admin)/+layout.server.ts (load)')
  const userId = JSON.parse(me)?.id
  if (!userId) {
    redirect(307, '/auth/login')
  }
  return { me }
}
