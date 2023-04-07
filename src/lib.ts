import { appWindow } from '@tauri-apps/api/window';
import Peer, { DataConnection } from 'peerjs';

const wait = (timeout: number) => new Promise(r => setTimeout(r, timeout));

export const minimize = async () => {
	await appWindow.setFullscreen(false);
	const isMaximazed = await appWindow.isMaximized();
	if (isMaximazed) {
		await appWindow.unmaximize();
	}
	// await appWindow.minimize();
};

export const fullscreenLater = (timeout: number) => {
	setTimeout(() => {
		appWindow.setFullscreen(true);
	}, timeout);
};

export const connect = (peer: Peer, id: string, onOpen: (connection: DataConnection) => void) => {
	const connection = peer.connect(id);
	connection.on('open', () => onOpen(connection));
};
