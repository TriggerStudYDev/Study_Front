<template>
    <div class="bg-[#171717] min-h-screen">
        <header class="px-[60px] py-6">
            <h1 class="text-4xl font-semibold text-white">LOGO</h1>
        </header>
        <main class="max-w-[828px] mx-auto" :class="{ ' opacity-0': activeSocial || activeSocial === 'true' }">
            <RouterView />
        </main>
        <div>
            <SocialCard v-if="activeSocial" :social-type="activeSocial" @close="handleClose" />
        </div>
    </div>
</template>

<script setup>
import SocialCard from '@/components/sign-in/register/EditQuestionnaire/ModalWindows/SocialCard.vue';
import { useModalStore } from '@/stores/useModalStore';
import { useEditingStore } from '@/stores/useEditingStore';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const editingStore = useEditingStore();
const { activeSocial } = storeToRefs(modalStore);
const { closeModal } = modalStore;

const handleClose = (updatedData) => {
    editingStore.setChanges(updatedData);
    closeModal();
};
</script>