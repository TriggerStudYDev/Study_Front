<!-- src/components/sign-in/register/EditQuestionnaire/ModalWindows/SocialCard.vue -->
<template>
    <div class="fixed inset-0" :class="{ 'fade-out': animation }">
        <div class="bg-white px-6 pt-5 pb-12 rounded-2xl max-w-[510px] mx-auto mt-[20vh] w-full slide-up"
            :class="{ 'slide-down': animation }">
            <button @click="closeModal" class="mb-4">
                <img src="/image/auth/left.svg" alt="Left" loading="lazy">
            </button>
            <div class="flex flex-col items-center">
                <img width="56" :src="socialData.icon" :alt="socialData.title">
                <h4 class="mt-4 text-2xl font-medium text-PrimaryDark">{{ socialData.title }}</h4>
                <span class="mt-2 text-LightDark">{{ socialData.subtitle }}</span>
            </div>
            <div class="flex flex-col mt-8">
                <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg font-medium focus:outline-none" type="text"
                    :placeholder="socialData.placeholder" v-model="form[socialData.storeField]">
                <button @click="closeButton"
                    class="px-8 py-3 mt-8 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet">
                    Закрыть
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
const { closeModal } = modalStore;
const form = ref({ ...editingStore.profile }); // Данные из хранилища

// Следим за изменениями в форме и обновляем хранилище
watch(
    () => form.value,
    (newForm) => {
        editingStore.setChanges(newForm); // Сохраняем изменения сразу
    },
    { deep: true }
);

const props = defineProps({
    socialType: {
        type: String,
        required: true,
        validator: value => ['telegram', 'vk'].includes(value),
    },
});

const socialData = computed(() => ({
    telegram: {
        icon: '/image/auth/telegram.svg',
        title: 'Telegram',
        placeholder: '@username',
        storeField: 'telegram_username',
    },
    vk: {
        icon: '/image/auth/vk.svg',
        title: 'ВКонтакте',
        placeholder: 'vk.com/username',
        storeField: 'vk_profile',
    },
}[props.socialType]));

const closeButton = () => {
    editingStore.setChanges(form.value); // Финализируем изменения
    emit('close');
};

const emit = defineEmits(['close']);
</script>
