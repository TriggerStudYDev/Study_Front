<!-- src/layout/ProfileSettingLayout.vue -->
<template>
    <div class="bg-[#171717] min-h-screen">
        <header class="px-[60px] py-6">
            <h1 class="text-4xl font-semibold text-white">LOGO</h1>
        </header>
        <main class="max-w-[828px] mx-auto" :class="{ ' opacity-0': activeSocial || activeSocial === 'true' }">
            <RouterView />
        </main>
        <div>
            <SocialCard v-if="activeSocial" :social-type="activeSocial" @close="closeModal" />
        </div>
    </div>
</template>

<script setup>
import SocialCard from '@/components/sign-in/register/EditQuestionnaire/ModalWindows/SocialCard.vue';
import { useModalStore } from '@/stores/useModalStore';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { activeSocial } = storeToRefs(modalStore);
const { closeModal } = modalStore;
</script>
