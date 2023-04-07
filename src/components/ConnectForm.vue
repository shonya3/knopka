<script setup lang="ts">
import BaseButton from './BaseButton.vue';
defineProps<{
	modelValue: string;
}>();
defineEmits<{
	(event: '@update:modelValue', id: string): void;
}>();
</script>

<template>
	<form class="form-partner-id">
		<label for="partnerPeer">partner id: </label>
		<input
			@input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
			:value="modelValue"
			type="text"
		/>
		<BaseButton type="submit">Connect</BaseButton>
	</form>
</template>

<style scoped>
.form-partner-id {
	margin-inline: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	max-width: 700px;
}

.form-partner-id > input {
	flex-grow: 1;
}
</style>
