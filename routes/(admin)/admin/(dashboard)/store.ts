import { writable } from "svelte/store";

type ChatStore = {
	selected: any;
	name?: string;
	lastMessage?: string;
	time?: string;
};

function createChatStore() {
	const store = writable<ChatStore>({ selected: null });

	return {
		subscribe: store.subscribe,
		setChat: ({ id, name, lastMessage, time }: any) => {
			store.update((store) => (
				{ ...store, selected: id, name, lastMessage, time }
			));
		},
	};
}

type RemarkStore = {
	selected: any;
};

function createRemarkStore() {
	const store = writable<RemarkStore>({ selected: null });

	return {
		subscribe: store.subscribe,
		setRemark: (da_no: any) => {
			store.update((store) => ({ ...store, selected: da_no }));
		},
	};
}

export const chatStore = createChatStore();
export const remarkStore = createRemarkStore();
