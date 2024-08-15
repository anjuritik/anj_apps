<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Separator } from '$lib/components/ui/separator'
	import { Textarea } from '$lib/components/ui/textarea'
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte'
	import axios from 'axios'
	import { toast } from 'svelte-sonner'

	export let chat: any = null
	export let messages: any[] = []
	export let loading: boolean = false

	const addMessageFromAdmin = (message: string) => {
		messages = [
			...messages,
			{
				sender: 'admin',
				message,
				updated_at: new Date().toISOString()
			}
		]
		scrollMessageAreaToBottom()
	}

	function getCookie(name: string) {
		if (!document) return null
		const value = `; ${document.cookie}`
		const parts = value.split(`; ${name}=`)
		if (parts.length === 2) {
			const encoded = parts.pop()?.split(';').shift()
			if (encoded) {
				return JSON.parse(decodeURIComponent(encoded))
			}
		}
		return null
	}

	const handleSendMessage = async () => {
		if (getCookie('me')?.role !== 'admin') {
			toast.error('You are not authorized to send messages')
			return
		}
		addMessageFromAdmin(currentMessage)
		const res = await axios.post('/api/message', {
			message: currentMessage,
			sender: 'admin',
			receiver: chat?.name
		})

		if (res.status === 200) {
			toast.success('Message sent successfully')
		}
		// console.log('res =>', res)
		currentMessage = ''
	}
	let messagesAreaRef: HTMLDivElement | null = null

	const scrollMessageAreaToBottom = () => {
		// console.log('scrolling')
		if (messagesAreaRef) {
			// console.log(
			// 	'actual scroll',
			// 	messagesAreaRef.scrollHeight,
			// 	messagesAreaRef.scrollTo(0, messagesAreaRef.scrollHeight)
			// )
			messagesAreaRef.scrollIntoView(false)
		}
	}

	let currentMessage = ''
</script>

<div class="flex h-full flex-col">
	{#if chat && chat.name}
		<div class="flex h-full flex-col overflow-hidden">
			<div>
				<div class="mb-2 mt-3 px-5 text-start text-xl font-semibold">{chat.name}</div>
			</div>
			<Separator />
			<ScrollArea class="flex max-h-[70vh] min-w-[500px] flex-col gap-2 overflow-y-auto text-sm">
				<div bind:this={messagesAreaRef} id="messages_area" class="p-3">
					{#if loading}
						<div
							class="flex h-[350px] w-full items-center justify-center text-center text-gray-500"
						>
							Loading...
						</div>
					{:else if messages?.length >= 1}
						{#each messages as message}
							<div
								class={`my-1 flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									class={`${message.sender === 'admin' ? 'bg-slate-50 text-black' : 'border border-input bg-transparent'} flex flex-col rounded-lg p-2`}
								>
									<div class="max-w-64 flex-1 pr-10">
										{message.message}
									</div>
									<div class={`self-end text-xs text-gray-400`}>
										{new Date(message.updated_at).toTimeString().slice(0, 5)}
									</div>
								</div>
							</div>
						{/each}
					{:else}
						<div
							class="flex h-[350px] w-full items-center justify-center text-center text-gray-500"
						>
							No messages
						</div>
					{/if}
				</div>
			</ScrollArea>
			<Separator class="mt-auto" />
			<div class="p-4">
				<form on:submit|preventDefault={handleSendMessage}>
					<div class="grid gap-4">
						<Textarea
							bind:value={currentMessage}
							class="p-4"
							placeholder={`Reply ${chat.name}...`}
						/>
						<div class="flex items-center">
							<Button type="submit" size="sm" class="ml-auto">Send</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{:else}
		<div class="p-8 text-center text-muted-foreground">No chat selected</div>
	{/if}
</div>
