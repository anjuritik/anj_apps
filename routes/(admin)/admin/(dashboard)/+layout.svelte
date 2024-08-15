<script lang="ts">
	import { navigating, page } from '$app/stores'
	import { primaryRoutes, secondaryRoutes } from './config'
	import MessageList from './(components)/message-list.svelte'
	import Nav from './(components)/nav.svelte'
	import * as Resizable from '$lib/components/ui/resizable'
	import { Separator } from '$lib/components/ui/select'
	import * as Tabs from '$lib/components/ui/tabs'
	import axios from 'axios'
	import { onMount } from 'svelte'
	import RemarkList from './(components)/remark-list.svelte'
	import PageTransitions from '$lib/components/PageTransitions.svelte'
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte'

	// export let data
	$: innerWidth = 0
	export let chats: any[] = []
	export let defaultLayout = [265, 440, 655]
	export let defaultCollapsed = false
	export let navCollapsedSize: number = 4

	let isCollapsed = defaultCollapsed

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`
	}

	function onCollapse() {
		isCollapsed = true
		document.cookie = `PaneForge:collapsed=${true}`
	}

	function onExpand() {
		isCollapsed = false
		document.cookie = `PaneForge:collapsed=${false}`
	}

	let tabSelected = 'messages'
	let remarks_da: any[] = []

	// change tab selected based on last path
	$: {
		const path = $page.data?.url.split('/').pop()
		// console.log('path', path)
		tabSelected = path
	}

	onMount(async () => {
		const res = await axios.get('/api/admin/chats')
		// console.log(res)
		if (res.status === 200) {
			res.data.forEach((chat: any) => {
				const c = {
					id: chat.participant2 + '-' + chat.participant1,
					name: chat.participant1 === 'admin' ? chat.participant2 : chat.participant1,
					lastMessage: chat.lastMessage,
					time: chat.created_at,
					messages: []
				}
				chats = [...chats, c]
				// console.log('chats', chats)
			})
		}

		const remarks = await axios.get('/api/da/vendor_remark/all')
		remarks_da = remarks.data
		// console.log('remarks', remarks_da)
	})
</script>

<svelte:window bind:innerWidth />

{#if $navigating}
	<PreloadingIndicator />
{/if}

<section class="h-screen w-full">
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="h-full max-h-[800px] items-stretch"
	>
		<Resizable.Pane
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={15}
			maxSize={20}
			{onCollapse}
			{onExpand}
		>
			<Nav {isCollapsed} routes={primaryRoutes} />
			<Separator />
			<Nav {isCollapsed} routes={secondaryRoutes} />
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
			<Tabs.Root value={tabSelected}>
				<Tabs.Content value="messages" class="m-0">
					<div class="flex items-center px-4 py-2">
						<h1 class="text-xl font-bold">Messages</h1>
					</div>
					<Separator class="mb-3" />

					<MessageList items={chats} />
				</Tabs.Content>
				<Tabs.Content value="status" class="m-0">
					<div class="flex items-center px-4 py-2">
						<h1 class="text-xl font-bold">Vendor Remarks</h1>
					</div>
					<Separator class="mb-3" />

					<RemarkList {remarks_da} />
				</Tabs.Content>
			</Tabs.Root>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[2]}>
			<PageTransitions url={$page.data?.url}>
				<slot />
			</PageTransitions>
			<!-- <slot /> -->
		</Resizable.Pane>
	</Resizable.PaneGroup>
</section>
