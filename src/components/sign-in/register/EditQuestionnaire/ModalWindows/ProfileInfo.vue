<!-- src/components/sign-in/register/EditQuestionnaire/ModalWindows/ProfileInfo.vue -->
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
                    <!-- ВУЗ -->
                    <div class="col-span-2">
                        <div v-if="university"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input :value="university.name" type="text" placeholder="Вуз" class="w-full outline-none"
                                readonly />
                            <button @click="clearUniversity">
                                <img src="/image/modal/closeInput.svg" alt="">
                            </button>
                        </div>
                        <div v-else>
                            <select v-model="selectedUniversity" @change="fetchFaculties"
                                :disabled="!!form.faculty || loading"
                                class="w-full px-4 py-3 bg-transparent border border-[#BFBFBF] bg-white font-sans rounded-lg font-medium focus:outline-none">
                                <option value="" disabled>ВУЗ</option>
                                <option v-for="univ in universities" :key="univ.id" :value="univ.id">
                                    {{ univ.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Факультет -->
                    <div class="col-span-2">
                        <div v-if="faculty"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input :value="faculty.name" type="text" placeholder="Факультет" class="w-full outline-none"
                                readonly />
                            <button @click="clearFaculty">
                                <img src="/image/modal/closeInput.svg" alt="">
                            </button>
                        </div>
                        <div v-else>
                            <select v-model="selectedFaculty" @change="fetchDepartments"
                                :disabled="!selectedUniversity || !!form.department || loading"
                                class="w-full px-4 py-3 bg-transparent border border-[#BFBFBF] bg-white font-sans rounded-lg font-medium focus:outline-none">
                                <option value="" disabled>
                                    {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
                                </option>
                                <option v-for="fac in faculties" :key="fac.id" :value="fac.id">
                                    {{ fac.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Кафедра -->
                    <div class="col-span-2">
                        <div v-if="department"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input :value="department.name" type="text" placeholder="Кафедра"
                                class="w-full outline-none" readonly />
                            <button @click="clearDepartment">
                                <img src="/image/modal/closeInput.svg" alt="">
                            </button>
                        </div>
                        <div v-else>
                            <select v-model="selectedDepartment" @change="fetchEducationForms"
                                :disabled="!selectedFaculty || !!form.form_of_study || loading"
                                class="w-full px-4 py-3 bg-transparent border border-[#BFBFBF] bg-white font-sans rounded-lg font-medium focus:outline-none">
                                <option value="" disabled>
                                    {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
                                </option>
                                <option v-for="dep in departments" :key="dep.id" :value="dep.id">
                                    {{ dep.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Курс -->
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.course" type="text" placeholder="Курс" class="w-full outline-none" />
                        <button @click="form.course = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>

                    <!-- Уровень образования -->
                    <div>
                        <div v-if="educationForm"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input :value="educationForm.name" type="text" placeholder="Уровень образования"
                                class="w-full outline-none" readonly />
                            <button @click="clearEducationForm">
                                <img src="/image/modal/closeInput.svg" alt="">
                            </button>
                        </div>
                        <div v-else>
                            <select v-model="selectedEducationForm" :disabled="!selectedDepartment || loading"
                                class="w-full px-6 py-3 bg-transparent border border-[#BFBFBF] bg-white font-sans rounded-lg font-medium focus:outline-none">
                                <option value="" disabled>
                                    {{ educationForms.length ? 'Уровень образования' : 'Нет доступных форм обучения' }}
                                </option>
                                <option v-for="form in educationForms" :key="form.id" :value="form.id">
                                    {{ form.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Фото -->
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
import UserDataService from '@/services/UserDataService';

const university = ref(null);
const faculty = ref(null);
const department = ref(null);
const educationForm = ref(null);
const universities = ref([]);
const faculties = ref([]);
const departments = ref([]);
const educationForms = ref([]);
const selectedUniversity = ref('');
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const selectedEducationForm = ref('');
const editingStore = useEditingStore();
const fileInput = ref(null);
const animation = ref(false);
const loading = ref(false);
const emit = defineEmits(['close']);
const form = ref({ ...editingStore.profile });

// Watchers
watch(selectedUniversity, async (newVal) => {
    if (newVal) {
        form.value.university = newVal;
        await fetchFaculties();
    }
});

watch(selectedFaculty, async (newVal) => {
    if (newVal) {
        form.value.faculty = newVal;
        await fetchDepartments();
    }
});

watch(selectedDepartment, async (newVal) => {
    if (newVal) {
        form.value.department = newVal;
        await fetchEducationForms();
    }
});

watch(selectedEducationForm, (newVal) => {
    if (newVal) form.value.form_of_study = newVal;
});

// Methods
const clearUniversity = () => {
    form.value.university = null;
    university.value = null;
    clearFaculty();
    selectedUniversity.value = '';
};

const clearFaculty = () => {
    form.value.faculty = null;
    faculty.value = null;
    clearDepartment();
    selectedFaculty.value = '';
};

const clearDepartment = () => {
    form.value.department = null;
    department.value = null;
    clearEducationForm();
    selectedDepartment.value = '';
};

const clearEducationForm = () => {
    form.value.form_of_study = null;
    educationForm.value = null;
    selectedEducationForm.value = '';
};

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

const fetchInitialData = async () => {
    try {
        if (form.value.university) {
            const res = await EditingDataService.getUniversities(form.value.university);
            university.value = res.data;
        }
        if (form.value.faculty) {
            const res = await EditingDataService.getFaculties(form.value.faculty);
            faculty.value = res.data;
        }
        if (form.value.department) {
            const res = await EditingDataService.getDepartments(form.value.department);
            department.value = res.data;
        }
        if (form.value.form_of_study) {
            const res = await EditingDataService.getEducationForms(form.value.form_of_study);
            educationForm.value = res.data;
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
};

const fetchUniversities = async () => {
    try {
        const response = await UserDataService.getUniversities();
        universities.value = response.data.results || [];
    } catch (error) {
        console.error("Ошибка при загрузке университетов:", error);
    }
};

const fetchFaculties = async () => {
    if (!selectedUniversity.value) return;
    loading.value = true;
    try {
        const response = await UserDataService.getFaculties(selectedUniversity.value);
        faculties.value = response.data.results || [];
    } catch (error) {
        console.error("Ошибка при загрузке факультетов:", error);
    } finally {
        loading.value = false;
    }
};

const fetchDepartments = async () => {
    if (!selectedFaculty.value) return;
    loading.value = true;
    try {
        const response = await UserDataService.getDepartments(selectedFaculty.value);
        departments.value = response.data.results || [];
    } catch (error) {
        console.error("Ошибка при загрузке кафедр:", error);
    } finally {
        loading.value = false;
    }
};

const fetchEducationForms = async () => {
    if (!selectedDepartment.value) return;
    loading.value = true;
    try {
        const response = await UserDataService.getEducationForms(selectedDepartment.value);
        educationForms.value = response.data.results || [];
    } catch (error) {
        console.error("Ошибка при загрузке образовательных форм:", error);
    } finally {
        loading.value = false;
    }
};

const closeButton = () => {
    editingStore.setChanges(form.value);
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
};

onMounted(async () => {
    await editingStore.getEducational();
    await fetchUniversities();
    await fetchInitialData();
    selectedUniversity.value = form.value.university || '';
    selectedFaculty.value = form.value.faculty || '';
    selectedDepartment.value = form.value.department || '';
    selectedEducationForm.value = form.value.form_of_study || '';
});
</script>