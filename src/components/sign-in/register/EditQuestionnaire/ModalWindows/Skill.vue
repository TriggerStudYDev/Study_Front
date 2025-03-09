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
                        <input class="outline-none w-full" type="text" placeholder="Дисциплина"
                            v-model="form.disciplines">
                        <button @click="form.disciplines = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input class="outline-none w-full" type="text" placeholder="О себе" v-model="form.about_self">
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInput" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdate" />

                                <div @click="$refs.fileInput.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.reviews">Отзывы заказчиков</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <a class="bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl"
                            :href="form.reviews" target="_blank" v-if="form.reviews">Фото.png</a>
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInput" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdate" />

                                <div @click="$refs.fileInput.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.portfolio">Портфолио</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <a class="bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl"
                            :href="form.portfolio" target="_blank" v-if="form.portfolio">Фото.png</a>
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
import { onMounted, ref, watch } from 'vue';
import { useEditingStore } from '@/stores/useEditingStore';

const editingStore = useEditingStore();
const animation = ref(false)
const emit = defineEmits(['close']);
const form = ref({
    disciplines: '',
    about_self: '',
    reviews: '',
    portfolio: '',
})

watch(() => [editingStore.profile, editingStore.disciplines], (newProfile) => {
    if (newProfile) {
        form.value = {
            about_self: editingStore.profile.about_self || '',
            disciplines: editingStore.disciplines || '',
        }
    }
}, { immediate: true })

const closeButton = () => {
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300)
}

const saveChanges = async () => {
    try {
        await editingStore.updateProfile(form.value);
        closeButton();
    } catch (error) {
        console.error('Ошибка при сохранении изменений:', error);
    }
}

onMounted(async () => {
    await editingStore.getEducational();
    form.value = {
        about_self: editingStore.profile.about_self || '',
        disciplines: editingStore.disciplines || '',
    }
})
</script>
