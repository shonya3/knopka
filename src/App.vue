<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { minimize, connect } from './lib';

import PingButton from './components/PingButton.vue';
import BaseButton from './components/BaseButton.vue';
import MyId from './components/MyId.vue';
import ConnectForm from './components/ConnectForm.vue';

import { usePingButton } from './composables/usePingButton';
import { useMyId } from './composables/useMyId';
import { usePeer } from './composables/usePeer';

const receiverIdInput = ref('');
const partnerDisconnectedDialog = ref<HTMLDialogElement | null>(null);
const {
	connected,
	connection,
	peer,
	onConnectionOpened,
	isPartnerAlive,
	partnerLastAliveTimestamp,
	disconnectionTimeString,
} = usePeer();
const { canPing, canPingTimeout, onPingButtonClick } = usePingButton(connection);
const { myId, idCopied, onCopyId } = useMyId();
peer.value.on('open', (peerId: string) => (myId.value = peerId));

onMounted(() => {
	console.log(partnerDisconnectedDialog.value);
});

watch(
	() => isPartnerAlive.value,
	(val, oldVal) => {
		if (val === false && oldVal === true) {
			partnerDisconnectedDialog.value?.show();
		}
	}
);

const onDialog = () => {
	connected.value = false;
	connection.value = null;
};
</script>

<template>
	<dialog ref="partnerDisconnectedDialog">
		<p>Your partner is disconnected</p>
		<p v-if="disconnectionTimeString">{{ disconnectionTimeString }}</p>
		<form @submit="onDialog" method="dialog">
			<button>OK, back to connect form</button>
		</form>
	</dialog>
	<div v-if="connected" class="connected-buttons"></div>
	<BaseButton class="minimize" v-if="connected" @click="minimize">Minimize</BaseButton>
	<PingButton
		class="main-item"
		v-if="connected"
		@click="onPingButtonClick"
		:canPing="canPing"
		:canPingTimeout="canPingTimeout"
	/>

	<ConnectForm
		v-if="!connected"
		@submit.prevent="connect(peer, receiverIdInput, onConnectionOpened)"
		v-model="receiverIdInput"
	/>
	<MyId v-if="!connected && myId" :myId="myId" :idCopied="idCopied" @click="onCopyId" />
</template>

<style scoped>
.main-item {
	position: absolute;
	display: block;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.minimize {
	position: absolute;
	top: 1rem;
	right: 1rem;
}
</style>
