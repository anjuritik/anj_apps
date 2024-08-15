<script lang="ts">
	import { onMount } from 'svelte'
	import { remarkStore } from '../store'
	import axios from 'axios'
	import * as Card from '$lib/components/ui/card'
	import { formatTime } from '../utils'
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte'
	import Separator from '$lib/components/ui/separator/separator.svelte'

	let loading = false
	let remarks_da: any[] = []

	onMount(() => {
		remarkStore.subscribe(async (value) => {
			// console.log('value', value)
			if (value.selected) {
				loading = true
				const res = await axios.get(`/api/da/${value.selected}/vendor_remark`)
				// console.log('res', res)
				if (res.data?.length) {
					remarks_da = res.data
				}
				loading = false
			}
		})
	})
</script>

<div class="h-full py-3">
	{#if loading}
		<div class="flex w-full items-center justify-center">
			<p class="text-gray-400">Loading...</p>
		</div>
	{:else if remarks_da.length}
		<div>
			<h1 class="mb-2 px-5 text-start text-xl font-semibold">Remarks ({$remarkStore.selected})</h1>
		</div>
		<Separator />
		<ScrollArea class="mt-3">
			<div class="flex max-h-[calc(100vh-5rem)] flex-col gap-3">
				{#each remarks_da as remark}
					<Card.Root class="mx-5 ">
						<Card.Header>
							<Card.Title>Batch number: {remark.batch_no}</Card.Title>
							<Card.Description
								>Edited at: {formatTime(new Date(remark.updatedAt))}</Card.Description
							>
						</Card.Header>
						<Card.Content>
							<div class="flex flex-col">
								<span>
									Quantity:
									<span class="text-gray-400">{remark.qty}</span>
								</span>
								<span>
									Status:
									<span class="uppercase text-gray-400">{remark.status}</span>
								</span>
								<span>
									Vendor Remark:
									<span class="text-gray-400">{remark.vendor_remark}</span>
								</span>
							</div>
						</Card.Content>
						<Card.Footer class="justify-end">
							<Card.Description
								>Created at: {formatTime(new Date(remark.createdAt))}</Card.Description
							>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</ScrollArea>
	{:else if !$remarkStore.selected}
		<div class="flex w-full items-center justify-center">
			<p class="text-gray-400">Select a DA number to view remarks</p>
		</div>
	{:else}
		<div class="flex w-full items-center justify-center">
			<p class="text-gray-400">No remarks found</p>
		</div>
	{/if}
</div>
