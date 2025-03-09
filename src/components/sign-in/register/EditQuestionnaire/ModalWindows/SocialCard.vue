<template>
    <div class="fixed inset-0">
        <div class="bg-white px-6 pt-5 pb-12 rounded-2xl max-w-[510px] mx-auto mt-[20vh] w-full slide-up">
            <button @click="closeModal" class="mb-4">
                <img src="/image/auth/left.svg" alt="Left" loading="lazy">
            </button>
            <div class="flex flex-col items-center">
                <img width="56" :src="socialData.icon" :alt="socialData.title">
                <h4 class="mt-4 text-2xl text-PrimaryDark font-medium">{{ socialData.title }}</h4>
                <span class="mt-2 text-LightDark">{{ socialData.subtitle }}</span>
            </div>
            <div class="flex flex-col mt-8">
                <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg font-medium focus:outline-none" type="text"
                    :placeholder="socialData.placeholder" v-model="editingStore.profile.profile[socialData.storeField]">
                <button class="mt-8 w-full py-3 bg-AccentViolet text-white text-xl font-medium rounded-xl"
                    @click="saveSocial">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore';
import { useEditingStore } from '@/stores/useEditingStore';
import { computed, watch, ref } from 'vue';

const modalStore = useModalStore();
const editingStore = useEditingStore();
const emit = defineEmits(['file-selected']);
const { closeModal } = modalStore;
const form = ref({
    vk_profile: '',
    telegram_username: '',
})

watch(() => editingStore.profile, (newProfile) => {
    if (newProfile) {
        form.value = {
            vk_profile: newProfile.profile.vk_profile || '',
            telegram_username: newProfile.profile.telegram_username || '',
        };
    }
})
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
            icon: '/image/auth/telegram.svg',
            title: 'Telegram',
            subtitle: 'Добавить контакт',
            placeholder: '@username',
            storeField: 'telegram_username',
        },
        vk: {
            icon: '/image/auth/vk.svg',
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
