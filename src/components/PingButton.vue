<script setup lang="ts">
import BaseButton from './BaseButton.vue';
const props = defineProps<{
	canPing: boolean;
	canPingTimeout: number;
}>();
</script>

<template>
	<BaseButton
		class="ping-button"
		:class="{ 'btn--disabled': !Boolean(canPing) }"
		:disabled="!Boolean(canPing)"
		type="button"
	>
		{{ canPing ? 'Ping' : `timeout: ${canPingTimeout}` }}
	</BaseButton>
</template>

<style scoped>
.ping-button {
	background-color: #dc2626;
	padding: 4rem 8rem;
	font-weight: 500;
	font-size: 2rem;
}

.ping-button:active {
	filter: saturate(120%);
}

.btn--disabled {
	background-color: #333;
}
</style>
