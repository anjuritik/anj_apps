<script lang="ts">
	import axios from 'axios'
	import { onMount } from 'svelte'
	import { chatStore } from '../store'
	import ChatDisplay from '../(components)/chat-display.svelte'

	let chat: any = {}
	let messages: any[] = []
	let loading = false

	const getMessagesByParticipants = async ({ participant1, participant2 }: any) => {
		const res = await axios.get(`/api/admin/messages?p1=${participant1}&p2=${participant2}`)
		// console.log(res)
		return res.data
	}

	onMount(() => {
		chatStore.subscribe(async (value) => {
			if (value.selected) {
				loading = true
				const [p1, p2] = value.selected.split('-')
				chat = {
					id: value.selected,
					name: value.name,
					time: value.time,
					lastMessage: value.lastMessage
				}
				const m = await getMessagesByParticipants({ participant1: p1, participant2: p2 })
				messages = [...m]
				loading = false
				// console.log('messages', messages)
			}
		})
	})
</script>

<ChatDisplay {chat} {messages} {loading} />
