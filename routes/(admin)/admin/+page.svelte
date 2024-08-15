<script lang="ts">
	import { date, dateOnly } from '$lib/utils'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	import Label from '$lib/components/ui/label/label.svelte'
	import { tick } from 'svelte'
	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	let checked = false
	export let data
	const users = JSON.parse(data.users || '[]') || []
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center">
		<h1 class="mb-6 text-center text-2xl font-bold">Admin</h1>
		<div></div>
	</div>
</div>
