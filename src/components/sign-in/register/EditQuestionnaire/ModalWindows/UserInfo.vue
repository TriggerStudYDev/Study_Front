<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        :class="{ 'fade-out': animation }">
        <div class="bg-white rounded-2xl px-6 py-10 w-[542px] slide-up" :class="{ 'slide-down': animation }">
            <button @click="closeButton" class="absolute top-4 right-4">
                <img src="/image/auth/Close_MD.svg" alt="Close">
            </button>
            <div class="flex flex-col">
                <h1 class="text-2xl font-semibold mt-2 text-PrimaryDark">Личная информация</h1>
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
                        <input v-model="form.email" type="text" placeholder="Email*" class="w-full outline-none" />
                        <button @click="form.email = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.vk_profile" type="text" placeholder="Профиль VK"
                            class="w-full outline-none" />
                        <button @click="form.vk_profile = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.telegram_username" type="text" placeholder="Telegram"
                            class="w-full outline-none" />
                        <button @click="form.telegram_username = ''"><img src="/image/modal/closeInput.svg"
                                alt=""></button>
                    </div>
                </div>
                <button @click="saveChanges"
                    class="px-8 py-3 bg-AccentViolet text-white rounded-lg text-xl font-medium leading-7 mt-8">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEditingStore } from '@/stores/useEditingStore';

const editingStore = useEditingStore();
const animation = ref(false)
const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    vk_profile: '',
    telegram_username: '',
});

const closeButton = () => {
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
};


watch(() => editingStore.profile, (newProfile) => {
    if (newProfile) {
        form.value = {
            first_name: newProfile.user.first_name || '',
            last_name: newProfile.user.last_name || '',
            email: newProfile.user.email || '',
            vk_profile: newProfile.profile.vk_profile || '',
            telegram_username: newProfile.profile.telegram_username || '',
        };
    }
}, { immediate: true });

const saveChanges = async () => {
    try {
        await editingStore.updateProfile(form.value);
        closeButton();
    } catch (error) {
        console.error('Ошибка при сохранении изменений:', error);
    }
};

const emit = defineEmits(['close']);
</script>
