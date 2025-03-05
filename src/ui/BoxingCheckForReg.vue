<!-- src/ui/BoxingCheckForReg.vue -->
<template>
    <div class="flex gap-x-2 items-start">
        <input v-model="isChecked" type="checkbox" class="mt-1" @change="$emit('update:isChecked', isChecked)">
        <div class="text-[#8C8C8E] font-medium leading-5">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isChecked = ref(false);

const emit = defineEmits(['update:isChecked']);
</script>