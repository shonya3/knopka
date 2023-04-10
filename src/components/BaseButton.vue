<script setup lang="ts">
export interface BaseButtonProps {
	disabled: boolean;
	type: 'submit' | 'button';
}

withDefaults(defineProps<BaseButtonProps>(), { disabled: false, type: 'button' });
</script>

<template>
	<button type="button"><slot /></button>
</template>

<style></style>
