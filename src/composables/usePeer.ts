import Peer, { DataConnection } from 'peerjs';
import { DataMessage, MessageAlive, RefDataConnection, RefPeer } from '../types';
import { appWindow } from '@tauri-apps/api/window';
import { computed, ref } from 'vue';
import { sendDataMessage, isDataMessage } from '../lib';
import { CHECK_ALIVE_TIMEOUT } from '../consts';

const isAlive = (lastAliveTimestamp: number, aliveTimeout: number) => {
	return Date.now() - lastAliveTimestamp < aliveTimeout * 10;
};

export const usePeer = () => {
	const partnerLastAliveTimestamp = ref<number | null>(null);
	const isPartnerAlive = ref<null | boolean>(null);

	const connected = ref(false);
	const connection: RefDataConnection = ref(null);
	const disconnectionTimeString = computed(() => {
		if (partnerLastAliveTimestamp.value == null) return null;
		return `time: ${new Date(partnerLastAliveTimestamp.value).toLocaleTimeString('ru')}`;
	});
	const peer: RefPeer = ref(new Peer());

	const onConnectionOpened = (conn: DataConnection) => {
		connected.value = true;
		connection.value = conn;
		partnerLastAliveTimestamp.value = Date.now();
		isPartnerAlive.value = true;

		const onData = async (data: DataMessage) => {
			switch (data.kind) {
				case 'red-button': {
					try {
						await appWindow.maximize();
						await appWindow.setFullscreen(true);
						await appWindow.show();
					} catch (err) {
						console.log(err);
					} finally {
						break;
					}
				}

				case 'alive': {
					partnerLastAliveTimestamp.value = Date.now();
					break;
				}
			}
		};

		const setAliveObservation = () => {
			const interval = setInterval(() => {
				if (!connection.value || !isPartnerAlive.value) {
					clearInterval(interval);
					return;
				}
				sendDataMessage(connection.value, { kind: 'alive' });
				if (partnerLastAliveTimestamp.value !== null) {
					isPartnerAlive.value = isAlive(partnerLastAliveTimestamp.value, CHECK_ALIVE_TIMEOUT);
				}
			}, CHECK_ALIVE_TIMEOUT);
		};

		connection.value.on('data', async data => {
			if (!isDataMessage(data)) return;
			onData(data);
		});

		setAliveObservation();
	};

	peer.value.on('connection', onConnectionOpened);

	return {
		connected,
		connection,
		peer,
		onConnectionOpened,
		isPartnerAlive,
		partnerLastAliveTimestamp,
		disconnectionTimeString,
	};
};
