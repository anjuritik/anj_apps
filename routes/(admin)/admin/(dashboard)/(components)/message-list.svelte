<script lang="ts">
	import { chatStore } from '../store'
	import { formatTimeAgo } from '../utils'
	import { cn } from '$lib/utils'
	import { ScrollArea } from '$lib/components/ui/scroll-area'

	export let items: any[]
</script>

<ScrollArea class="h-[83vh]">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each items as item}
			<button
				class={cn(
					'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
					$chatStore.selected === item.id && 'bg-muted'
				)}
				on:click={() => {
					chatStore.setChat({
						id: item.id,
						name: item.name,
						time: item.time,
						lastMessage: item.lastMessage
					})
				}}
			>
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="font-semibold">{item.name}</div>
							<!-- {#if !item.read}
								<span class="flex h-2 w-2 rounded-full bg-blue-600" />
							{/if} -->
						</div>
						<div
							class={cn(
								'ml-auto text-xs',
								$chatStore.selected === item.id ? 'text-foreground' : 'text-muted-foreground'
							)}
						>
							{formatTimeAgo(new Date(item.time || new Date()))}
						</div>
					</div>
				</div>
				<div class="line-clamp-2 text-xs text-muted-foreground">
					{item.lastMessage?.substring(0, 300)}
				</div>
			</button>
		{/each}
	</div>
</ScrollArea>
