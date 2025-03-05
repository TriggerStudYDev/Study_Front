<!-- src/App.vue -->
<template>
    <div>
        <main class="">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { useAuthStore } from './stores/useAuthStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.checkAuth();
});

authStore.initializeMockData();
</script>