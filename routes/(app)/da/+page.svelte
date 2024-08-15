<script lang="ts">
	import { currency, date, dateOnly } from '$lib/utils'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	// import * as Select from '$lib/components/ui/select/index'
	import * as Select from '$lib/components/ui/select/index.js'
	import { Button, buttonVariants } from '$lib/components/ui/button/index'
	import * as Dialog from '$lib/components/ui/dialog/index'
	import { Input } from '$lib/components/ui/input/index'
	import { Label } from '$lib/components/ui/label/index'
	import { Pencil2 } from 'radix-icons-svelte'
	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	import { schema } from './config'
	import PrimaryButton from '$lib/components/misiki/PrimaryButton.svelte'
	import { Textarea } from '$lib/components/ui/textarea'
	import { SendIcon, MessageCircle, PlusIcon } from 'lucide-svelte'
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte'
	import { onMount } from 'svelte'
	let open = [false]
	let showQueryDialog = false
	let checked = false
	export let data
	const roles = [
		{ name: 'ADMIN', value: 'ADMIN' },
		{ name: 'VENDOR', value: 'VENDOR' }
	]

	let records: any = data.records || []
	// $: console.log(records)

	async function getVendorRemark({ da_no }: any) {
		try {
			const res = await axios.get(`api/da/${da_no}/vendor_remark`)
			// console.log("vendor remark", res)
			if (res.status === 200) {
				return res.data
			}
		} catch (e) {
			toast.error(e.message)
		}
	}

	async function saveVendorRemark({ ix, id, vendor_remark, da_no }: any) {
		// console.log('vendor_remark', vendor_remark, 'da_no', da_no, 'id', id, 'ix', ix)
		// If status show error toast
		if (vendor_remark.some((r: any) => !r.status)) {
			toast.error('Please select status for all remarks')
			return
		}
		try {
			const res = await axios.post('api/da/vendor_remark', { id, vendor_remark, da_no })
			if (res.status === 200) {
				// console.log(res.data)
				toast.success('Remark saved')
				records = records.map((item: any) => {
					if (item.da_no == da_no) {
						item.vendor_remark = res.data.length
							? res.data[0].vendor_remark
							: res.data.vendor_remark
					}
					return item
				})
				open[ix] = false
			}
		} catch (e) {
			toast.error(e.message)
		}
	}
	let selectedRemarkText = ''

	type RemarkRecord = {
		batch_no: string
		quantity: string
		remark: string
		status: string
	}

	let remarkArray: RemarkRecord[] = Array.from({ length: 5 }, () => ({
		batch_no: '',
		quantity: '',
		remark: '',
		status: ''
	}))

	function handleRemarkInputChange(
		index: number,
		key: string,
		event: InputEvent | { target: { value: string } }
	) {
		// console.log('index', index, 'key', key, 'event', event.target?.value)
		const input = event.target as HTMLInputElement
		remarkArray = remarkArray.map((record, i) => {
			if (i === index) {
				return { ...record, [key]: input.value }
			}
			return record
		})
	}

	$: openedRemarkDaNo = null

	const handleEditRemarkClick = async (index: number, value: unknown, da_no: any) => {
		// console.log('index', index, 'value', value, 'da_no', da_no)
		open[index] = true
		openedRemarkDaNo = da_no
		selectedRemarkText = (value as string) || ''
		remarkArray = await getRemarkFromRecordsForDaNo(da_no)
	}

	const getRemarkFromRecordsForDaNo = async (da_no: string) => {
		const r = await getVendorRemark({ da_no })

		// const remark = (records as Array<any>).find((r) => r.remark?.da_no === da_no)
		const remarks: RemarkRecord[] = []

		r.forEach((record: any) => {
			remarks.push({
				batch_no: record.batch_no,
				quantity: record.qty,
				remark: record.vendor_remark,
				status: record.status
			})
		})

		return remarks.length ? remarks : [{ batch_no: '', quantity: '', remark: '', status: '' }]
	}

	let messages: any = []

	onMount(async () => {
		await getMessages()

		// const messagesArea = document.getElementById('messages_area')
		// if (messagesArea) messagesArea.scrollTop = messagesArea.scrollHeight
		// console.log('messages =>', messagesArea)
	})

	const addMessageFromVendor = (message: string) => {
		messages = [
			...messages,
			{
				sender: 'vendor',
				message,
				updated_at: new Date().toISOString()
			}
		]
		scrollMessageAreaToBottom()
	}

	const getMessages = async () => {
		const res = await axios.get('/api/message')
		// console.log('GET =>', res.data)
		if (res.status === 200) {
			messages = [...res.data]
		}
		scrollMessageAreaToBottom()
	}

	const scrollMessageAreaToBottom = () => {
		if (messagesAreaRef) messagesAreaRef.scrollIntoView(false)
	}

	const handleSendMessage = async () => {
		addMessageFromVendor(currentMessage)
		const res = await axios.post('/api/message', {
			message: currentMessage,
			receiver: 'admin'
		})

		if (res.status === 200) {
			toast.success('Message sent successfully')
		}
		// console.log('res =>', res)
		currentMessage = ''
	}
	let messagesAreaRef: HTMLDivElement | null = null

	let currentMessage = ''
</script>

<div class="flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
	<div class="flex w-full flex-col items-center text-center">
		<div class="flex flex-row gap-5">
			<h1 class="mb-6 text-center text-2xl font-bold">Dispatch Advice ({records.length})</h1>
			<Dialog.Root bind:open={showQueryDialog} closeOnOutsideClick={false}>
				<Dialog.Trigger
					class="{buttonVariants({
						variant: 'default'
					})} absolute bottom-5 right-7 z-[100] h-12 w-12 !rounded-full !bg-accent !text-accent-foreground shadow-md"
					on:click={async () => {
						!showQueryDialog
						await getMessages()
					}}
				>
					<MessageCircle />
				</Dialog.Trigger>
				<Dialog.Content class="max-w-max">
					<form on:submit|preventDefault={handleSendMessage}>
						<Dialog.Header>
							<Dialog.Title>Message to HAL</Dialog.Title>
							<!-- <Dialog.Description>Ask your queries</Dialog.Description> -->
						</Dialog.Header>

						<!-- Message UI -->
						<div class="mt-5 flex flex-col gap-4">
							<div class="flex flex-col gap-2">
								<Label for="message" class="self-center">Messages</Label>
								<!-- Previous messages -->
								<ScrollArea
									class="flex h-[350px] min-w-[500px] flex-col gap-2 overflow-y-auto text-sm"
								>
									<div id="messages_area" bind:this={messagesAreaRef} class="h-full">
										{#if messages?.length >= 1}
											{#each messages as message}
												<div
													class={`my-1 flex ${message.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
												>
													<div
														class={`${message.sender === 'admin' ? 'border border-input bg-transparent' : 'bg-slate-50 text-black'} flex flex-col rounded-lg p-2 `}
													>
														<div class="max-w-64 flex-1 pr-10">
															{message.message}
														</div>
														<div class={`self-end text-xs `}>
															{new Date(message.updated_at).toTimeString().slice(0, 5)}
														</div>
													</div>
												</div>
											{/each}
										{:else}
											<div class="flex h-[350px] w-full items-center justify-center text-center">
												No messages
											</div>
										{/if}
									</div>
								</ScrollArea>
								<Textarea
									bind:value={currentMessage}
									id="message"
									name="message"
									placeholder="Type your message here"
									rows={2}
									class="w-full"
								/>
							</div>
						</div>

						<Dialog.Footer>
							<Button type="submit" class="mt-5 text-base">
								Send
								<SendIcon class="ml-2" strokeWidth="1px" size={20} />
							</Button>
						</Dialog.Footer>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		{#if records.length === 0}
			No DA found
		{:else}
			<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
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
										<th scope="row">
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
												{:else if schema[key]?.type === 'currency'}
													{currency(value)}
												{:else if schema[key]?.type === 'edit-modal'}
													<div class="flex items-center">
														<div class="mr-4">{value}</div>
														<Dialog.Root bind:open={open[ix]}>
															<Dialog.Trigger
																class={buttonVariants({ variant: 'ghost' })}
																on:click={() => handleEditRemarkClick(ix, value, item.da_no)}
															>
																<Pencil2 />
															</Dialog.Trigger>
															<Dialog.Content class="max-w-max">
																<form
																	on:submit={() =>
																		saveVendorRemark({
																			ix,
																			id: item.id,
																			vendor_remark: remarkArray,
																			da_no: item.da_no
																		})}
																>
																	<Dialog.Header>
																		<Dialog.Title
																			>Edit Remark <span class=""
																				>for DA NO: {openedRemarkDaNo}</span
																			></Dialog.Title
																		>
																		<Dialog.Description>
																			Make changes to your remark here. Click save when you're done.
																		</Dialog.Description>
																	</Dialog.Header>
																	<div class="grid py-4">
																		<!-- <div class="grid grid-cols-5 items-center gap-4"> -->
																		<!--  border-separate border-spacing-4 border-spacing-x-2 -->
																		<table class="w-full border-collapse">
																			<tr>
																				<th class="border border-accent p-3 text-start uppercase"
																					>Batch No</th
																				>
																				<th class="border border-accent p-3 text-start uppercase"
																					>Quantity</th
																				>
																				<th class="border border-accent p-3 text-start uppercase"
																					>Remark</th
																				>
																				<th class="border border-accent p-3 text-start uppercase"
																					>Status</th
																				>
																			</tr>
																			{#each remarkArray as record, index}
																				<tr>
																					<td class="border border-accent">
																						<Input
																							placeholder="Batch No"
																							required
																							bind:value={record.batch_no}
																							on:input={(e) =>
																								handleRemarkInputChange(index, 'batch_no', e)}
																							class="min-w-48 border-none"
																						/>
																					</td>
																					<td class="border border-accent">
																						<Input
																							type="number"
																							placeholder="Quantity"
																							bind:value={record.quantity}
																							on:input={(e) =>
																								handleRemarkInputChange(index, 'quantity', e)}
																							class="min-w-48 border-none"
																						/>
																					</td>
																					<!-- <Label for="remark" class="text-right">Remark</Label> -->
																					<td class="border border-accent">
																						<Input
																							id="remark"
																							required
																							placeholder="Remark"
																							bind:value={record.remark}
																							on:input={(e) =>
																								handleRemarkInputChange(index, 'remark', e)}
																							class="min-w-48 border-none"
																						/>
																					</td>
																					<td class="border border-accent">
																						<Select.Root
																							onSelectedChange={(ev) => {
																								const e = {
																									target: {
																										value: ev?.value
																									}
																								}
																								handleRemarkInputChange(index, 'status', e)
																							}}
																						>
																							<Select.Trigger class="min-w-48 border-none">
																								<Select.Value
																									class="uppercase"
																									placeholder={record.status || 'Select status'}
																								/>
																							</Select.Trigger>
																							<Select.Content>
																								<Select.Group>
																									<Select.Item value="pending" label="PENDING">
																										PENDING
																									</Select.Item>
																									<Select.Item value="started" label="STARTED">
																										STARTED
																									</Select.Item>
																									<Select.Item value="complete" label="COMPLETE">
																										COMPLETE
																									</Select.Item>
																								</Select.Group>
																							</Select.Content>
																						</Select.Root>
																					</td>
																				</tr>
																			{/each}
																		</table>
																		<div class="flex justify-center">
																			<PrimaryButton
																				class="mt-5 !border-accent text-sm hover:bg-[#212122] hover:bg-opacity-50"
																				type="button"
																				on:click={() => {
																					remarkArray = [
																						...remarkArray,
																						{
																							batch_no: '',
																							quantity: '',
																							remark: '',
																							status: ''
																						}
																					]
																				}}
																			>
																				<PlusIcon /> Add New
																			</PrimaryButton>
																		</div>
																		<!-- </div> -->
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
