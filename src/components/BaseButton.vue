<script setup lang="ts">
export interface BaseButtonProps {
	disabled?: boolean;
	type?: 'submit' | 'button';
}

withDefaults(defineProps<BaseButtonProps>(), { disabled: false, type: 'button' });
</script>

<template>
	<button :type="type" :disabled="disabled"><slot /></button>
</template>

<style></style>
