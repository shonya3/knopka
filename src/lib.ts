import { appWindow } from '@tauri-apps/api/window';

export const minimize = async () => {
	await appWindow.setFullscreen(false);
	await appWindow.minimize();
};

export const fullscreenLater = (timeout: number) => {
	setTimeout(() => {
		appWindow.setFullscreen(true);
	}, timeout);
};
