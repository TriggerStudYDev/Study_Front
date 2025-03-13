<!-- src/components/sign-in/register/EditQuestionnaire/ModalWindows/UserInfo.vue -->
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        :class="{ 'fade-out': animation }">
        <div class="bg-white rounded-2xl px-6 py-10 w-[542px] slide-up" :class="{ 'slide-down': animation }">
            <button @click="closeButton" class="absolute top-4 right-4">
                <img src="/image/auth/Close_MD.svg" alt="Close">
            </button>
            <div class="flex flex-col">
                <h1 class="mt-2 text-2xl font-semibold text-PrimaryDark">Личная информация</h1>
                <p class="text-PrimaryDark">
                    Здесь хранятся твои основные данные: ФИО, почта и другие контактные данные. Убедись, что всё
                    актуально, чтобы
                    мы могли легко связаться с тобой.
                </p>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.first_name" type="text" placeholder="Имя*" class="w-full outline-none" />
                        <button @click="form.first_name = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.last_name" type="text" placeholder="Фамилия*"
                            class="w-full outline-none" />
                        <button @click="form.last_name = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.email" type="text" placeholder="Email*" class="w-full outline-none"
                            disabled />
                    </div>
                    <socialMedia @click="openModal('telegram')">
                        <template #image>
                            <img src="/image/auth/telegram.svg" alt="socialMedia">
                        </template>
                        <template #title>
                            <h4 class="text-[#29A9EB] text-xl font-medium">Telegram</h4>
                        </template>
                    </socialMedia>
                    <socialMedia @click="openModal('vk')">
                        <template #image>
                            <img src="/image/auth/vk.svg" alt="socialMedia">
                        </template>
                        <template #title>
                            <h4 class="text-[#0077FF] text-xl font-medium">ВКонтакте</h4>
                        </template>
                    </socialMedia>
                </div>
                <button @click="closeButton"
                    class="px-8 py-3 mt-8 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEditingStore } from '@/stores/useEditingStore';
import SocialMedia from '@/components/sign-in/widgets/SocialMedia.vue';
import { useModalStore } from '@/stores/useModalStore';

const editingStore = useEditingStore();
const modalStore = useModalStore();
const { openModal } = modalStore;
const animation = ref(false);
const form = ref({ ...editingStore.profile });

watch(form, (newForm) => {
    editingStore.setChanges(newForm);
}, { deep: true });

const closeButton = () => {
    editingStore.setChanges(form.value);
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
};

const emit = defineEmits(['close']);
</script>