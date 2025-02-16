<!-- src/pages/RegisterPages.vue -->
<template>
    <div class="px-4">
        <RegisterForm v-if="!typeAuth" @toggle-auth="toggleAuth" :typeAuth="typeAuth" />
        <AuthorizationForm v-else @toggle-auth="toggleAuth" :typeAuth="typeAuth" />
    </div>
</template>

<script setup>
import RegisterForm from '@/components/RegisterForm.vue';
import AuthorizationForm from '@/components/AuthorizationForm.vue';
import { ref } from 'vue';

const typeAuth = ref(false);

const toggleAuth = () => {
    typeAuth.value = !typeAuth.value;
};
</script>