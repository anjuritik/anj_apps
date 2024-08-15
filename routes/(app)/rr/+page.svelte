<script lang="ts">
	import { currency, date, dateOnly } from '$lib/utils'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	// import * as Select from '$lib/components/ui/select/index'
	import Select from '$lib/components/Select.svelte'
	import { Button, buttonVariants } from '$lib/components/ui/button/index'
	import * as Dialog from '$lib/components/ui/dialog/index'
	import { Input } from '$lib/components/ui/input/index'
	import { Label } from '$lib/components/ui/label/index'
	import { Pencil2 } from 'radix-icons-svelte'
	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	import { schema } from './config'

	let open = [false]
	let checked = false
	export let data
	const roles = [
		{ name: 'ADMIN', value: 'ADMIN' },
		{ name: 'VENDOR', value: 'VENDOR' }
	]

	let records = data.records || []

	async function saveVendorRemark({ ix, id, vendor_remark }) {
		try {
			const res = await axios.post('api/rr', { id, vendor_remark })
			if (res.status === 200) {
				console.log(res.data)
				toast.success('Remark saved')
				records = records.map((item) => {
					if (item.id == id) {
						item.vendor_remark = res.data.vendor_remark
					}
					return item
				})
				open[ix] = false
			}
		} catch (e) {
			toast.error(e.response.data)
		}
	}
	let selectedRemarkText = ''
</script>

<div class="flex items-center justify-center py-4">
	<div class="flex w-full flex-col items-center text-center">
		<h1 class="mb-6 text-center text-2xl font-bold">Receivings ({records.length})</h1>
		{#if records.length === 0}
			No RR found
		{:else}
			<div
				class="container relative h-[75vh] overflow-x-auto border text-left shadow-md sm:rounded-lg"
			>
				<table class="w-full text-left text-xs rtl:text-right">
					<thead class="whitespace-nowrap uppercase">
						<tr>
							{#each Object.keys(records[0]) as key, dx}
								{#if schema[key]?.visible != false}
									<th scope="col" class="bg-primary px-6 py-3 text-muted">
										{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
									</th>
								{/if}
							{/each}
						</tr>
					</thead>

					<tbody>
						{#each records as item, ix}
							<tr class="border-b">
								{#each Object.entries(item) as [key, value], vx}
									{#if schema[key]?.visible != false}
										<th scope="row" class={vx % 2 === 0 ? 'bg-muted' : 'bg-background'}>
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
												{:else if schema[key]?.type === 'edit-modal'}
													<div class="flex items-center">
														<div class="mr-4">{value}</div>
														<Dialog.Root bind:open={open[ix]}>
															<Dialog.Trigger
																class={buttonVariants({ variant: 'ghost' })}
																on:click={() => (selectedRemarkText = value)}
															>
																<Pencil2 />
															</Dialog.Trigger>
															<Dialog.Content class="sm:max-w-[425px]">
																<form
																	on:submit={() =>
																		saveVendorRemark({
																			ix,
																			id: item.id,
																			vendor_remark: selectedRemarkText
																		})}
																>
																	<Dialog.Header>
																		<Dialog.Title>Edit Remark</Dialog.Title>
																		<Dialog.Description>
																			Make changes to your remark here. Click save when you're done.
																		</Dialog.Description>
																	</Dialog.Header>
																	<div class="grid gap-4 py-4">
																		<div class="grid grid-cols-4 items-center gap-4">
																			<Label for="remark" class="text-right">Remark</Label>
																			<Input
																				id="remark"
																				bind:value={selectedRemarkText}
																				class="col-span-3"
																			/>
																		</div>
																	</div>
																	<Dialog.Footer>
																		<Button type="submit">Save changes</Button>
																	</Dialog.Footer>
																</form>
															</Dialog.Content>
														</Dialog.Root>
													</div>
												{:else if key === 'item_cost' || key === 'item_price' || key === 'total_cost' || key === 'total_price' || key === 'landed_value'}
													{currency(value)}
												{:else if key === 'dob'}
													{dateOnly(value)}
												{:else if key === 'approved_at'}
													{date(value)}
												{:else if schema[key]?.type === 'currency'}
													{currency(value)}
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
									{/if}
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
