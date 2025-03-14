<template>
    <div class="fixed inset-0">
        <div class="bg-white px-6 pt-5 pb-12 rounded-2xl max-w-[510px] mx-auto mt-[20vh] w-full slide-up">
            <button @click="closeModal" class="mb-4">
                <img src="/image/auth/left.svg" alt="Left" loading="lazy">
            </button>
            <div class="flex flex-col items-center">
                <img width="56" :src="socialData.icon" :alt="socialData.title">
                <h4 class="mt-4 text-2xl font-medium text-PrimaryDark">{{ socialData.title }}</h4>
                <span class="mt-2 text-LightDark">{{ socialData.subtitle }}</span>
            </div>
            <div class="flex flex-col mt-8">
                <input
                    class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                    type="text" :placeholder="socialData.placeholder" v-model="profile[socialData.storeField]">
                <button class="w-full py-3 mt-8 text-xl font-medium text-white bg-AccentViolet rounded-xl"
                    @click="saveSocial">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import iconTg from '/image/auth/telegram.svg';
import iconVk from '/image/auth/vk.svg';
import { computed } from 'vue';

const modalStore = useModalStore();
const emit = defineEmits(['file-selected']);
const profile = computed(() => authStore.data.profile);
const authStore = useAuthStore();
const { closeModal } = modalStore;

const props = defineProps({
    socialType: {
        type: String,
        required: true,
        validator: value => ['telegram', 'vk'].includes(value),
    },
});

const socialData = computed(() => {
    return {
        telegram: {
            icon: iconTg,
            title: 'Telegram',
            subtitle: 'Добавить контакт',
            placeholder: '@username',
            storeField: 'telegram_username',
        },
        vk: {
            icon: iconVk,
            title: 'ВКонтакте',
            subtitle: 'Добавить контакт',
            placeholder: 'vk.com/username',
            storeField: 'vk_profile',
        },
    }[props.socialType];
});

const saveSocial = () => {
    closeModal();
};
</script>
