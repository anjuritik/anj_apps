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
	import { goto, invalidateAll } from '$app/navigation'
	import { schema } from './config'
	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	import { TextboxFloating } from '$lib/components/misiki'
	import Fuse from 'fuse.js'
	import { onMount } from 'svelte'

	let open = [false]
	let checked = false
	export let data
	const roles = [
		{ name: 'ADMIN', value: 'ADMIN' },
		{ name: 'VENDOR', value: 'VENDOR' }
	]

	let query = ''
	let searchResult = []

	// Fuse.js options
	let fuseOptions = { isCaseSensitive: false, keys: ['blanket_po'] }
	let records = data.records || []

	const searchRecords = () => {
		const fuse = new Fuse(records, fuseOptions)
		searchResult = fuse.search(query)
		searchResult = searchResult.map((r) => r.item)
		if (!searchResult.length) {
			searchResult = data.records
		}
	}
	onMount(() => {
		searchRecords()
	})
	async function saveVendorRemark({ ix, po_no, vendor_remark }) {
		try {
			const res = await axios.post('/api/po', { po_no, vendor_remark })
			if (res.status === 200) {
				toast.success('Remark saved')
				records = records.map((item) => {
					if (item.po_no == po_no) {
						item.vendor_remark = res.data.vendor_remark
					}
					return item
				})
				open[ix] = false
			}
		} catch (e) {
			console.log(e)
			toast.error(e.response?.data)
		}
	}
	let selectedRemarkText = ''

	let file: File | null = null

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		if (target.files && target.files.length > 0) {
			file = target.files[0]
		}
	}

	async function uploadCsvFile() {
		console.log('Uploading file:', file)
		if (!file) {
			// alert('Please select a file first.')
			return
		}

		const formData = new FormData()
		formData.append('csv_file', file)

		try {
			const response = await axios.post('/api/admin/upload?t=po', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			const result = await response.data
			// console.log('File uploaded successfully', result)
			// alert('File uploaded successfully')
		} catch (error) {
			console.error('Error uploading file:', error)
			alert('Error uploading file')
		}
	}
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-4 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">
			<div class="flex items-center justify-between text-center">
				<div>Purchase Orders ({records.length})</div>
				<TextboxFloating
					type="text"
					placeholder="Search PO No"
					bind:value={query}
					on:input={searchRecords}
				/>
			</div>
		</h1>
		<div class="my-5 flex w-full flex-row items-center justify-center">
			<form on:submit|preventDefault={uploadCsvFile} class="flex w-[50%] flex-col items-center">
				<div class="flex w-full flex-row items-center gap-2">
					<Label for="fileInput" class="text-[#000]">CSV File</Label>
					<Input
						id="fileInput"
						type="file"
						accept=".csv"
						class="flex-1"
						name="csv_file"
						on:change={handleFileChange}
					/>
				</div>
				<Button variant="secondary" class="mt-3" type="submit">Upload</Button>
			</form>
		</div>
		<div class="flex w-full flex-col text-center text-[#000]">
			<h1 class="mb-6 text-center text-2xl font-bold">Purchase Orders ({records.length})</h1>

			{#if records.length === 0}
				No purchase order found
			{:else}
				<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
					<table class="w-full text-left text-xs rtl:text-right">
						<thead class="whitespace-nowrap uppercase">
							<tr>
								{#each Object.keys(records[0]) as key, dx}
									{#if schema[key]?.visible != false}
										<th
											scope="col"
											class="px-6 py-3
						{dx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}"
										>
											{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
										</th>
									{/if}
								{/each}
							</tr>
						</thead>

						<tbody>
							{#each searchResult as item, ix}
								<tr class="border-b border-gray-200">
									{#each Object.entries(item) as [key, value], vx}
										<!-- {value} -->
										{#if schema[key]?.visible != false}
											<th scope="row" class={vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
												<div class="max-w-60 truncate whitespace-pre-wrap px-6 py-4 font-normal">
													{#if schema[key]?.type === 'img'}
														{#if value}
															<img
																src={value}
																alt={value}
																class="h-20 w-20 object-contain object-left"
															/>
														{:else}
															-
														{/if}
													{:else if schema[key]?.type === 'currency'}
														{currency(value)}
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
																				po_no: item.po_no,
																				vendor_remark: selectedRemarkText
																			})}
																	>
																		<Dialog.Header>
																			<Dialog.Title>Edit Remark</Dialog.Title>
																			<Dialog.Description>
																				Make changes to your remark here. Click save when you're
																				done.
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
													{:else if key === 'date'}
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
																				? toast.success(`${item?.name} approved successfully`)
																				: toast.error(`${item?.name} rejected successfully`)
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
</div>
