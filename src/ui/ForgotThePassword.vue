<!-- src/ui/ForgotThePassword.vue -->
<template>
    <div class="text-xl font-medium mt-5">
        <button @click="toggle">{{ typeAuth ? 'Создать профиль' : 'Войти в аккаунт' }}</button>
    </div>
</template>

<script setup>
const props = defineProps({
    typeAuth: {
        type: Boolean,
        required: true,
    }
});

const emit = defineEmits(['toggle-auth']);

</script>