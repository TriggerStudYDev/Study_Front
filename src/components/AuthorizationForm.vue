<!-- src/components/AuthorizationForm.vue -->
<template>
    <div class="flex justify-between items-center min-h-screen">
        <img src="/image/auth/Group 67.png" alt="Group">
        <div class="flex flex-col justify-center items-center">
            <LoginUserInformation class="mr-36" @toggle-auth="$emit('toggle-auth')" :typeAuth="typeAuth" />
        </div>
    </div>
</template>

<script setup>
import LoginUserInformation from '@/widgets/LoginUserInformation.vue';

const emit = defineEmits(['toggle-auth']);

const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
})
</script>