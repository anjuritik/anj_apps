<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte'
	import { Search } from 'lucide-svelte'
	import { remarkStore } from '../store'
	import Input from '$lib/components/ui/input/input.svelte'

	export let remarks_da: any[] = []
	$: updatedRemarks = remarks_da.copyWithin(0, remarks_da.length)
	let lastSearchKeyLength = 0

	const handleRemarkClick = (da_no: string) => {
		remarkStore.setRemark(da_no)
	}

	const handleSearch = (e: any) => {
		const value = e.target.value?.trim().toLowerCase()
		if (!value) {
			updatedRemarks = remarks_da.copyWithin(0, remarks_da.length)
			return
		}

		if (lastSearchKeyLength > value.length) {
			updatedRemarks = remarks_da.copyWithin(0, remarks_da.length)
			lastSearchKeyLength = 0
		}

		updatedRemarks = updatedRemarks.filter((remark) => {
			return remark.da_no.toLowerCase().includes(value)
		})

		lastSearchKeyLength = value.length
	}
</script>

<ScrollArea>
	<div class="relative mb-5 px-3">
		<Search class="absolute left-5 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground" />
		<Input placeholder="Search" class="pl-8" on:input={handleSearch} />
	</div>
	<div class="flex flex-col gap-2 px-3">
		{#each updatedRemarks as remark}
			<button class="text-start" on:click={() => handleRemarkClick(remark.da_no)}>
				<div
					class="rounded-md border px-4 py-3 font-mono text-sm hover:cursor-pointer hover:bg-accent {$remarkStore.selected ===
						remark.da_no && 'bg-accent'}"
				>
					{remark.da_no}
				</div>
			</button>
		{/each}
	</div>
</ScrollArea>
