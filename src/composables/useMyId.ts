import { ref } from 'vue';

export const useMyId = (id = '') => {
	const myId = ref(id);
	const idCopied = ref(false);

	const onCopyId = () => {
		navigator.clipboard.writeText(myId.value);
		idCopied.value = true;
	};

	return {
		myId,
		idCopied,
		onCopyId,
	};
};
