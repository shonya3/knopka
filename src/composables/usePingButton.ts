import { DataConnection } from 'peerjs';
import { Ref, ref } from 'vue';
import { DataMessage } from '../types';
import { PING_BUTTON_TIMEOUT } from '../consts';
import { sendDataMessage } from '../lib';

const disableTimeout = (boolRef: Ref<boolean>, timeout: number) => {
	boolRef.value = false;
	setTimeout(() => {
		boolRef.value = true;
	}, timeout);
};

export const usePingButton = (connection: Ref<DataConnection | null>) => {
	const canPing = ref(true);
	const canPingTimeout = ref(0);

	const onPingButtonClick = () => {
		if (!connection.value) return;
		sendDataMessage(connection.value, { kind: 'red-button' });
		canPingTimeout.value = PING_BUTTON_TIMEOUT / 1000;
		disableTimeout(canPing, PING_BUTTON_TIMEOUT);

		const intervalId = setInterval(() => {
			if (canPing.value) {
				clearTimeout(intervalId);
			}
			canPingTimeout.value--;
		}, 1000);
	};

	return {
		canPing,
		canPingTimeout,
		onPingButtonClick,
	};
};
