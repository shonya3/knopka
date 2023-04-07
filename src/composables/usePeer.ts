import Peer, { DataConnection } from 'peerjs';
import { DataMessage, RefDataConnection, RefPeer } from '../types';
import { appWindow } from '@tauri-apps/api/window';
import { ref } from 'vue';

export const usePeer = () => {
	const onConnectionOpened = (conn: DataConnection) => {
		connected.value = true;
		connection.value = conn;

		connection.value.on('data', async data => {
			if ((data as DataMessage).kind === 'ping') {
				try {
					await appWindow.maximize();
					await appWindow.setFullscreen(true);
				} catch (err) {
					console.log(err);
				}
			}
		});
	};

	const connected = ref(false);
	const connection: RefDataConnection = ref(null);
	const peer: RefPeer = ref(new Peer());

	peer.value.on('connection', onConnectionOpened);

	return {
		connected,
		connection,
		peer,
		onConnectionOpened,
	};
};
