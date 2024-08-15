import { makeClient } from '$lib/make-client'

export const load = async ({ fetch, parent }) => {
	const data = await parent()
	const summary = data.summary
	return {
		po_count: summary.po_count,
		rr_count: summary.rr_count,
		da_count: summary.da_count
	}
}
