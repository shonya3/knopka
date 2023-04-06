<script setup lang="ts">
import { Peer, DataConnection } from 'peerjs';
import { ref } from 'vue';
import { fullscreenLater, minimize } from './lib';

const connect = (peer: Peer, id: string, onOpen: (connection: DataConnection) => void) => {
	const connection = peer.connect(id);
	connection.on('open', () => onOpen(connection));
};

const onConnectionOpened = (conn: DataConnection) => {
	state.value.connected = true;
	connection.value = conn;

	connection.value.on('data', () => {
		fullscreenLater(5000);
	});
};

const connection = ref<null | DataConnection>(null);
const state = ref({
	peer: new Peer(),
	connection: null,
	myId: '',
	connected: false,
	idCopied: false,
});

const receiverIdInput = ref('');

state.value.peer.on('open', peerId => {
	state.value.myId = peerId;
});
state.value.peer.on('connection', onConnectionOpened);

const onCopyId = () => {
	navigator.clipboard.writeText(state.value.myId);
	state.value.idCopied = true;
};
</script>

<template>
	<form
		v-if="!state.connected"
		class="form-partner-id"
		@submit.prevent="connect(state.peer, receiverIdInput, onConnectionOpened)"
	>
		<label for="partnerPeer">parner id: </label>
		<input v-model="receiverIdInput" type="text" id="partnerPeer" />
		<button type="submit">Connect</button>
	</form>
	<div class="my-id">
		<button
			:class="{ 'btn--copied': state.idCopied, 'btn--disabled': !Boolean(state.myId) }"
			@click="onCopyId"
			:disabled="!Boolean(state.myId)"
		>
			{{ state.idCopied ? 'Copied!' : 'Copy' }}
		</button>
		<p>
			my id: <span>{{ state.myId }}</span>
		</p>
	</div>
	<div class="window-buttons" style="" v-if="connection">
		<button type="button" @click="minimize">Minimize</button>
		<button class="ping-button" type="button" @click="connection?.send('ping')">Ping</button>
	</div>
	<div class="messages"></div>
</template>

<style scoped>
.window-buttons {
	margin-top: 1rem;
	display: flex;
	align-items: center;
	margin-inline: auto;
	max-width: 300px;
	gap: 2rem;
}
.ping-button {
	background-color: #dc2626;
	padding: 4rem 8rem;
	font-weight: 500;
	font-size: 2rem;
}

.ping-button:active {
	filter: saturate(120%);
}

.form-partner-id {
	margin-inline: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	max-width: 700px;
}

.form-partner-id > input {
	flex-grow: 1;
}

.my-id {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	position: absolute;
	right: 1rem;
	bottom: 1rem;
}

.my-id > p > span {
	font-size: 1.2rem;
}

.btn--copied {
	filter: drop-shadow(0 0 2em #249b73);
	/* color: green; */
}

.btn--disabled {
	background-color: #333;
}

.logo.vite:hover {
	filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #249b73);
}
</style>
