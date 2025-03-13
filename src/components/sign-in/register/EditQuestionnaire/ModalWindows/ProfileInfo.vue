<template>
    <div v-if="form" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        :class="{ 'fade-out': animation }">
        <div class="bg-white rounded-2xl px-6 py-10 w-[542px] slide-up" :class="{ 'slide-down': animation }">
            <button @click="closeButton" class="absolute top-4 right-4">
                <img src="/image/auth/Close_MD.svg" alt="Close">
            </button>
            <div class="flex flex-col">
                <h1 class="mt-2 text-2xl font-semibold text-PrimaryDark">Учебная информация</h1>
                <p class="text-PrimaryDark">
                    Укажи данные о своём вузе: фото студенческого, курс, факультет и уровень образования. Это поможет
                    нам подбирать для тебя подходящие заказы или исполнителей.
                </p>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.university" type="text" placeholder="Вуз" class="w-full outline-none" />
                        <button @click="form.university = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.faculty" type="text" placeholder="Факультет" class="w-full outline-none" />
                        <button @click="form.faculty = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.department" type="text" placeholder="Кафедра"
                            class="w-full outline-none" />
                        <button @click="form.department = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.course" type="text" placeholder="Курс" class="w-full outline-none" />
                        <button @click="form.course = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.form_of_study" type="text" placeholder="Уровень образования"
                            class="w-full outline-none" />
                        <button @click="form.form_of_study = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInput" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdate" />

                                <div @click="$refs.fileInput.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.photo">Прикрепи фото</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <a class="bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl" :href="form.photo"
                            target="_blank" v-if="form.photo">Фото.png</a>
                    </div>
                </div>
                <button @click="closeButton"
                    class="px-8 py-3 mt-8 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet">
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
const emit = defineEmits(['close']);
const fileInput = ref(null);
const animation = ref(false)
const form = ref({ ...editingStore.profile })
const handleFileUpdate = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.photo = file;
    }
}

watch(form, (newForm) => {
    editingStore.setChanges(newForm);
}, { deep: true })

const closeButton = () => {
    editingStore.setChanges(form.value);
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
}

onMounted(async () => {
    await editingStore.getEducational();
});
</script>