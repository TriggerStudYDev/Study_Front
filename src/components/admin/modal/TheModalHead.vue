<template>
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-x-4">
            <img class="w-14" src="/image/avatar/LogoUser.png" alt="">
            <div>
                <h1 class="text-xl font-medium">{{ user.user.first_name + ' ' + user.user.last_name }}</h1>
                <span class="text-sm">{{ user.user.role }}</span>
            </div>
        </div>
        <button @click="$emit('close-modal')"><img src="/image/modal/Close_LG.svg" alt="Close"></button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    user: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close-modal']);
</script>