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
                        <div v-if="form.university"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input v-model="form.university" type="text" placeholder="Вуз"
                                class="w-full outline-none" />
                            <button @click="form.university = ''; form.faculty = ''; form.department = '';"><img
                                    src="/image/modal/closeInput.svg" alt=""></button>
                        </div>

                        <div v-else>
                            <select v-model="selectedUniversity" @change="fetchFaculties" :disabled="loading"
                                class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl w-full outline-none bg-transparent">
                                <option value="" disabled>ВУЗ</option>
                                <option v-for="university in universities" :key="university.id" :value="university.id">
                                    {{ university.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Факультет -->
                    <div class="col-span-2">
                        <div v-if="form.faculty"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input v-model="form.faculty" type="text" placeholder="Факультет"
                                class="w-full outline-none" />
                            <button @click="form.faculty = ''; form.department = '';"><img
                                    src="/image/modal/closeInput.svg" alt=""></button>
                        </div>
                        <div v-else>
                            <select v-model="selectedFaculty" @change="fetchDepartments"
                                :disabled="!selectedUniversity || loading"
                                class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl w-full outline-none bg-transparent">
                                <option value="" disabled>
                                    {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
                                </option>
                                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                                    {{ faculty.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Кафедра -->
                    <div class="col-span-2">
                        <div v-if="form.department"
                            class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <input v-model="form.department" type="text" placeholder="Кафедра"
                                class="w-full outline-none" />
                            <button @click="form.department = ''"><img src="/image/modal/closeInput.svg"
                                    alt=""></button>
                        </div>

                        <div v-else>
                            <select v-model="selectedDepartment" @change="fetchEducationForms"
                                :disabled="!selectedFaculty || loading"
                                class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl w-full outline-none bg-transparent">
                                <option value="" disabled>
                                    {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
                                </option>
                                <option v-for="department in departments" :key="department.id" :value="department.id">
                                    {{ department.name }}
                                </option>
                            </select>
                        </div>
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
                <button @click="saveChanges"
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
import UserDataService from '@/services/UserDataService';

const editingStore = useEditingStore();
const universities = ref([]);
const faculties = ref([]);
const departments = ref([]);
const selectedUniversity = ref('');
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const emit = defineEmits(['close']);
const fileInput = ref(null);
const animation = ref(false)
const loading = ref(false);

const form = ref({
    university: '',
    faculty: '',
    department: '',
    course: '',
    form_of_study: '',
    photo: '',
});

// Исправленный watcher
watch(() => [
    editingStore.university,
    editingStore.faculty, // Исправлено с faculties на faculty
    editingStore.department,
    editingStore.educationForms // Исправлено опечатку в edicationForms
], (newValues) => {
    form.value = {
        university: editingStore.university?.name || '',
        faculty: editingStore.faculty?.name || '', // Исправлено обращение к свойству
        department: editingStore.department?.name || '',
        course: editingStore.profile.course || '',
        form_of_study: editingStore.profile.form_of_study || '',
        photo: editingStore.profile.photo || ''
    };
}, { immediate: true, deep: true });

const fetchFaculties = async () => {
    if (!selectedUniversity.value) return;

    loading.value = true;
    try {
        await UserDataService.getFaculties(selectedUniversity.value).then((response) => {
            faculties.value = response.data.results || [];
            form.value.faculty = selectedFaculty.value;
        })
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        faculties.value = [];
    } finally {
        loading.value = false;
    }
}

const fetchDepartments = async () => {
    if (!selectedFaculty.value) return;

    loading.value = true;
    try {
        await UserDataService.getDepartments(selectedFaculty.value).then((response) => {
            departments.value = response.data.results || [];
            form.value.department = selectedDepartment.value;
        })
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        departments.value = [];
    } finally {
        loading.value = false;
    }
}

const saveChanges = async () => {
    try {
        await editingStore.updateProfile(form.value);
        closeButton();
    } catch (error) {
        console.error('Ошибка при сохранении изменений:', error);
    }
}

const closeButton = () => {
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
}

onMounted(async () => {
    await editingStore.getEducational();
    loading.value = true;
    try {
        await UserDataService.getUniversities().then((response) => {
            universities.value = response.data.results || [];
        })
    } catch (error) {
        console.error("Ошибка при загрузке университетов:", error);
    } finally {
        loading.value = false;
    }
});
</script>