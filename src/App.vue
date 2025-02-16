<template>
    <div>
        <header class="mb-10">
            <Header />
        </header>
        <main v-if="authStore.isAuth" class="mx-10">
            <RouterView />
        </main>
        <main v-else class="mx-10">
            <RegisterPages />
        </main>
        <footer class="mt-10">
            <Footer />
        </footer>
    </div>
</template>

<script setup>
import Header from './widgets/TheHeader.vue';
import Footer from './widgets/TheFooter.vue';
import RegisterPages from './pages/RegisterPages.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

</script>