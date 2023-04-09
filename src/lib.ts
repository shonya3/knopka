import { appWindow } from '@tauri-apps/api/window';
import Peer, { DataConnection } from 'peerjs';
import { DataMessage } from './types';

export const wait = (timeout: number) => new Promise(r => setTimeout(r, timeout));

export const minimize = async () => {
	await appWindow.setFullscreen(false);
	const isMaximazed = await appWindow.isMaximized();
	if (isMaximazed) {
		await appWindow.unmaximize();
	}
	await appWindow.minimize();
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

export const sendDataMessage = <T extends DataMessage>(connection: DataConnection, obj: T) => {
	connection.send(obj);
};

export const isDataMessage = (data: unknown): data is DataMessage => {
	if (typeof data === 'object' && data != null && Object.hasOwn(data, 'kind')) {
		return true;
	} else {
		return false;
	}
};
