<script setup lang="ts">
withDefaults(
	defineProps<{
		idCopied: boolean;
		myId: string;
	}>(),
	{
		copied: false,
		myId: '',
	}
);
</script>

<template>
	<div class="my-id">
		<button :class="{ 'btn--copied': idCopied, 'btn--disabled': !Boolean(myId) }" :disabled="!Boolean(myId)">
			{{ idCopied ? 'Copied!' : 'Copy' }}
		</button>
		<p>
			my id: <span>{{ myId }}</span>
		</p>
	</div>
</template>

<style scoped>
.my-id {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	position: absolute;
	right: 1rem;
	bottom: 1rem;
}

.my-id > p > span {
	font-size: 1.2rem;
}

.btn--copied {
	filter: drop-shadow(0 0 2em #249b73);
}
</style>
