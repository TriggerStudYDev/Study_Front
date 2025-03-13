<!-- src/components/sign-in/register/EditQuestionnaire/ModalWindows/Skill.vue -->
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
                        <input class="w-full outline-none" type="text" placeholder="Дисциплина"
                            v-model="form.discipline">
                        <button @click="form.discipline = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input class="w-full outline-none" type="text" placeholder="О себе" v-model="form.about_self">
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInput" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdateCustomerFeedback" multiple />

                                <div @click="$refs.fileInput.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.customer_feedback">Отзывы заказчиков</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <a class="bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl"
                            :href="form.reviews" target="_blank" v-if="form.customer_feedback">Фото.png</a>
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInput" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdateProfile" multiple />

                                <div @click="$refs.fileInput.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.portfolio">Портфолио</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <a v-for="item in form.portfolio"
                            class="bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl" :href="item"
                            target="_blank" v-if="item">Фото.png</a>
                    </div>
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
import { onMounted, ref, watch } from 'vue';
import { useEditingStore } from '@/stores/useEditingStore';
import UserDataService from '@/services/UserDataService';

const editingStore = useEditingStore();
const animation = ref(false);
const emit = defineEmits(['close']);
const form = ref({ ...editingStore.profile });
console.log("form", form.value);

watch(form, (newForm) => {
    editingStore.setChanges(newForm);
}, { deep: true })

const handleFileUpdateCustomerFeedback = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            form.value.customer_feedback = reader.result;
        };
        reader.readAsDataURL(file);
        console.log("Файл успешно загружен");
    }
};

const handleFileUpdateProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            form.value.portfolio = reader.result;
        };
        reader.readAsDataURL(file);
        console.log("Файл успешно загружен");
    }
};

const closeButton = () => {
    editingStore.setChanges(form.value);
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
};
</script>