<!-- /* src/layout/AuthLayout.vue -->
<template>
    <div class="min-h-screen main" :class="{ 'bg-[#171717]': activeSocial || status === 'true' }"
        :style="activeSocial || status === 'true' ? {} : { backgroundImage: 'url(/image/auth/Background_img.png)' }">
        <header class="px-[60px] py-6">
            <Header @open-modal="modalGift = true" />
        </header>

        <router-view v-if="showRoiterView" class="min-h-screen" />

        <footer :class="!showRoiterView ? 'mt-[80vh]' : ''">
            <Footer />
        </footer>

        <AddSocialCard v-if="activeSocial" :social-type="activeSocial" @close="closeModal" />
        <ModalGift v-if="modalGift" @close-modal="modalGift = false" />
    </div>
</template>

<script setup>
import Header from '@/components/sign-in/widgets/HeaderSign-in.vue';
import Footer from '@/components/sign-in/widgets/FooterSign-in.vue'
import AddSocialCard from '@/components/sign-in/widgets/AddSocialCard.vue';
import ModalGift from '@/components/sign-in/widgets/ModalGift.vue';
import { useModalStore } from '@/stores/useModalStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const modalGift = ref(false);
const modalStore = useModalStore();
const { activeSocial } = storeToRefs(modalStore);
const { closeModal } = modalStore;

const showRoiterView = computed(() => {
    return !activeSocial.value && !modalGift.value
})

</script>

<style scoped>
.main {
    background-size: cover;
    background-repeat: no-repeat;
}
</style>