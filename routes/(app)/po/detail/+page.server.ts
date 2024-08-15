import { makeClient } from '$lib/make-client'

export const load = async ({ fetch, url }) => {
	let result = {}
	try {
		const po_no = url.searchParams.get('po_no')
		const client = makeClient(fetch)
		result = await (await client['po-detl'].$get({ query: { blanket_po: po_no } })).json()
	} catch (e) {
		console.log(e.toString())
	}
	return {
		result
	}
}
