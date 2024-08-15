import { makeClient } from '$lib/make-client'

export const load = async ({ fetch }) => {
	let result = {}
	try {
		const client = makeClient(fetch)
		result = await (await client.da.$get()).json()
	} catch (e) {
		console.log(e.toString())
	}
	return {
		records: result
	}
}
