<!-- src/components/AuthorizationForm.vue -->
<template>
    <div class="flex justify-center items-center min-h-screen">
        <LoginUserInformation @toggle-auth="$emit('toggle-auth')" :typeAuth="typeAuth" />
    </div>
</template>

<script setup>
import LoginUserInformation from '@/components/sign-in/login/LoginUserInformation.vue';

const emit = defineEmits(['toggle-auth']);

const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
})
</script>