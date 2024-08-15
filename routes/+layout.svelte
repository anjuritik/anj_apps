<script lang="ts">
	import '../app.pcss'
	import Footer from '$lib/components/seva/Footer.svelte'
	import { fade, fly } from 'svelte/transition'
	import { Toaster } from '$lib/components/ui/sonner'
	import { ModeWatcher } from 'mode-watcher'

	export let data
	import { setContext } from 'svelte'
	import createUserStore from '$lib/store/create-user-store'

	// In a real app, you would fetch the user data from an API
	const userStore = createUserStore(JSON.parse(data?.me) || {})
	setContext('user', userStore)
	userStore.updateMe(JSON.parse(data.me))
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Karla:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<main
	class="mx-auto flex min-h-screen w-full flex-col justify-between
"
>
	<div class="h-full">
		<div class="flex-1 px-3 py-1">
			<ModeWatcher />
			<Toaster theme="light" richColors />

			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					<slot />
				</div>
			{/key}
		</div>
	</div>

	<Footer />
</main>
