import { DataConnection } from 'peerjs';
import { Ref, ref } from 'vue';

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
		connection.value.send({ kind: 'ping' });
		const timeout = 5000;
		canPingTimeout.value = timeout / 1000;
		disableTimeout(canPing, timeout);

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
