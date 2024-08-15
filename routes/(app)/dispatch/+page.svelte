<script lang="ts">
	import { date, dateOnly } from '$lib/utils'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	// import * as Select from '$lib/components/ui/select/index'
	import Select from '$lib/components/Select.svelte'

	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	import { Value } from 'radix-icons-svelte'
	let checked = false
	export let data
	const roles = [
		{ name: 'ADMIN', value: 'ADMIN' },
		{ name: 'WINDOW', value: 'WINDOW' },
		{ name: 'BACKUP', value: 'BACKUP' }
	]

	const records = JSON.parse(data.records || '[]') || []
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-4 sm:px-6 lg:px-8">
	<div class="w-full text-center">
		<h1 class="mb-6 text-center text-2xl font-bold">Dispatch</h1>
		{#if records.length === 0}
			No dispatch found
		{:else}
			<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
				<table class="w-full text-left text-xs rtl:text-right">
					<thead class="whitespace-nowrap uppercase">
						<tr>
							{#each Object.keys(records[0]) as key, dx}
								<th
									scope="col"
									class="px-6 py-3
						{dx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}"
								>
									{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
								</th>
							{/each}
						</tr>
					</thead>

					<tbody>
						{#each records as item, ix}
							<tr class="border-b border-gray-200">
								{#each Object.entries(item) as [key, value], vx}
									<th scope="row" class={vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
										<div class="max-w-60 truncate whitespace-pre-wrap px-6 py-4 font-normal">
											{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront'}
												{#if value}
													<img
														src={value}
														alt={value}
														class="h-20 w-20 object-contain object-left"
													/>
												{:else}
													-
												{/if}
											{:else if key === 'dob'}
												{dateOnly(value)}
											{:else if key === 'approved_at'}
												{date(value)}
											{:else if key === 'role'}
												<div class="flex items-center space-x-2">
													<Select
														title="Select role"
														{value}
														data={roles || []}
														on:value={async ({ detail }) => {
															// selectedRole = detail
															try {
																const res = await axios.post('/api/admin/records', {
																	id: item.id,
																	role: detail
																})
																toast.success(`Role changed successfully`)
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/>
												</div>
											{:else if key === 'approved'}
												<div class="flex items-center space-x-2">
													<Checkbox
														id="terms"
														checked={value}
														onCheckedChange={async (v) => {
															try {
																const res = await axios.post('/api/admin/records', {
																	id: item.id,
																	approved: v
																})
																if (res.status == 200) {
																	v === true
																		? toast.success(`${item.name} approved successfully`)
																		: toast.error(`${item.name} rejected successfully`)
																}
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/>
												</div>
											{:else}
												{value || '_'}
											{/if}
										</div>
									</th>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
