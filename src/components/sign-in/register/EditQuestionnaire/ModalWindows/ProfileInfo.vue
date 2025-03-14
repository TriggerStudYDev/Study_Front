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
                        <input v-model="universities.name" type="text" placeholder="Вуз" class="w-full outline-none"
                            readonly />
                        <button @click="form.university = null; universities = ''">
                            <img src="/image/modal/closeInput.svg" alt="">
                        </button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="facilties.name" type="text" placeholder="Факультет"
                            class="w-full outline-none" />
                        <button @click="form.faculty = null; facilties = ''"><img src="/image/modal/closeInput.svg"
                                alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="departments.name" type="text" placeholder="Кафедра"
                            class="w-full outline-none" />
                        <button @click="form.department = null; departments = ''"><img src="/image/modal/closeInput.svg"
                                alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.course" type="text" placeholder="Курс" class="w-full outline-none" />
                        <button @click="form.course = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="educationForms.name" type="text" placeholder="Уровень образования"
                            class="w-full outline-none" />
                        <button @click="form.form_of_study = null; educationForms = ''"><img
                                src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInput" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdate" />

                                <div
                                    class="flex gap-x-2 items-center cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <div v-if="form.photo"
                                        class="flex items-center bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl">
                                        <a :href="form.photo" target="_blank" v-if="form.photo">Фото.png</a>
                                        <button @click="form.photo = ''"><img src="/image/modal/closeInput.svg"
                                                alt=""></button>
                                    </div>
                                    <p @click="$refs.fileInput.click()">Студенческий</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
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
import EditingDataService from '@/services/EditingDataService';

const universities = ref([]);
const facilties = ref([]);
const departments = ref([]);
const educationForms = ref([]);
const editingStore = useEditingStore();
const emit = defineEmits(['close']);
const fileInput = ref(null);
const animation = ref(false);
const form = ref({ ...editingStore.profile });

const handleFileUpdate = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            form.value.photo = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

watch(form, (newForm) => {
    editingStore.setChanges(newForm);
}, { deep: true });

const fetchFaculties = async () => {
    try {
        await EditingDataService.getFaculties(form.value.faculty).then((response) => {
            facilties.value = response.data || [];
        });
    } catch (error) {
        console.error("Ошибка при загрузке факультетов:", error);
    }
}

const fetchDepartments = async () => {
    try {
        await EditingDataService.getDepartments(form.value.department).then((response) => {
            departments.value = response.data || [];
        });
    } catch (error) {
        console.error("Ошибка при загрузке кафедр:", error);
    }
}

const fetchEducationForms = async () => {
    try {
        await EditingDataService.getEducationForms(form.value.form_of_study).then((response) => {
            educationForms.value = response.data || [];
        });
    } catch (error) {
        console.error("Ошибка при загрузке уровней образования:", error);
    }
}

const closeButton = () => {
    editingStore.setChanges(form.value);
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
};

onMounted(async () => {
    await editingStore.getEducational();
    try {
        const response = await EditingDataService.getUniversities(form.value.university);
        universities.value = response.data || [];
    } catch (error) {
        console.error("Ошибка при загрузке университетов:", error);
    }
    fetchFaculties();
    fetchDepartments();
    fetchEducationForms();
});
</script>