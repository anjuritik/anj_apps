import { makeClient } from '$lib/make-client'
import log from '$lib/utils/log'
import { redirect } from '@sveltejs/kit'
export const load = async ({ cookies, fetch }) => {
  const me = cookies.get('me') || "{}"
  log.layout('(app)/+layout.server.ts (load)' + me)
  const userId = JSON.parse(me)?.id
  if (!userId) {
    redirect(307, '/auth/login')
  }
  const client = makeClient(fetch)
  const summary = await (await client.summary.$get()).json()
  return { me, summary }
}
