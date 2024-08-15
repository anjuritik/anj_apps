<script lang="ts">
	import '../../app.pcss'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Footer from '$lib/components/seva/Footer.svelte'
	import Nav from '$lib/components/seva/Nav.svelte'
	import { fade, fly } from 'svelte/transition'

	export let data
</script>

<main class="mx-auto flex min-h-screen w-full flex-col justify-between">
	<div class="h-full">
		<Nav summary={data.summary} />
		<div class="flex-1 px-3 py-1">
			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					<slot />
				</div>
			{/key}
		</div>
	</div>
</main>
