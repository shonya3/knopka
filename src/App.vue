<script setup lang="ts">
import { ref } from 'vue';
import { minimize, connect } from './lib';

import PingButton from './components/PingButton.vue';
import BaseButton from './components/BaseButton.vue';
import MyId from './components/MyId.vue';
import ConnectForm from './components/ConnectForm.vue';

import { usePingButton } from './composables/usePingButton';
import { useMyId } from './composables/useMyId';
import { usePeer } from './composables/usePeer';

const receiverIdInput = ref('');
const { connected, connection, peer, onConnectionOpened } = usePeer();
const { canPing, canPingTimeout, onPingButtonClick } = usePingButton(connection);
const { myId, idCopied, onCopyId } = useMyId();
peer.value.on('open', (peerId: string) => (myId.value = peerId));
</script>

<template>
	<div v-if="connected" class="connected-buttons">
		<BaseButton @click="minimize">Minimize</BaseButton>
		<PingButton @click="onPingButtonClick" :canPing="canPing" :canPingTimeout="canPingTimeout" />
	</div>

	<ConnectForm
		v-if="!connected"
		@submit.prevent="connect(peer, receiverIdInput, onConnectionOpened)"
		v-model="receiverIdInput"
	/>
	<MyId v-if="!connected && myId" :myId="myId" :idCopied="idCopied" @click="onCopyId" />
</template>

<style scoped>
.connected-buttons {
	margin-inline: auto;
	margin-top: 1rem;
	display: flex;
	align-items: center;
	max-width: 300px;
	gap: 2rem;
}
</style>
