<!-- src/components/sign-in/register/StudentСard.vue -->
<template>
    <div>
        <div class="grid grid-cols-2 gap-4">
            <!-- Университеты -->
            <div class="col-span-2">
                <select v-model="selectedUniversity" @change="fetchFaculties" :disabled="loading"
                    class="w-full px-6 py-3 bg-transparent border border-[#BFBFBF] text-TeriaryDark bg-white font-sans rounded-lg font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.universities }">
                    <option value="" disabled>ВУЗ</option>
                    <option v-for="university in universities" :key="university.id" :value="university.id">
                        {{ university.name }}
                    </option>
                </select>
                <span v-if="errors.universities" class="text-sm text-red-500">{{ errors.universities }}</span>
            </div>

            <!-- Факультеты -->
            <div class="col-span-2">
                <select v-model="selectedFaculty" @change="fetchDepartments" :disabled="!selectedUniversity || loading"
                    class="w-full px-6 py-3 bg-transparent border border-[#BFBFBF] text-TeriaryDark  bg-white font-sans rounded-lg font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.faculties }">
                    <option value="" disabled>
                        {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
                    </option>
                    <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                        {{ faculty.name }}
                    </option>
                </select>
                <span v-if="errors.faculties" class="text-sm text-red-500">{{ errors.faculties }}</span>
            </div>

            <!-- Кафедры -->
            <div class="col-span-2">
                <select v-model="selectedDepartment" @change="fetchEducationForms"
                    :disabled="!selectedFaculty || loading"
                    class="w-full px-6 py-3 pr-10 bg-transparent border border-[#BFBFBF] text-TeriaryDark  bg-white font-sans rounded-lg font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.departments }">
                    <option value="" disabled>
                        {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
                    </option>
                    <option v-for="department in departments" :key="department.id" :value="department.id">
                        {{ department.name }}
                    </option>
                </select>
                <span v-if="errors.departments" class="text-sm text-red-500">{{ errors.departments }}</span>
            </div>

            <!-- Курс -->
            <div>
                <select v-model="course" :disabled="!selectedDepartment || loading"
                    class="w-full px-6 py-3 bg-transparent border border-[#BFBFBF] text-TeriaryDark  bg-white font-sans rounded-lg font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.course }">
                    <option value="" disabled>{{ course.length ? 'Выберите курс' : 'Нет доступных курсов' }}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <span v-if="errors.course" class="text-sm text-red-500">{{ errors.course }}</span>
            </div>

            <!-- Форма обучения -->
            <div>
                <select v-model="selectEducationForm" :disabled="!selectedDepartment || loading"
                    class="w-full px-6 py-3 bg-transparent border border-[#BFBFBF] text-TeriaryDark  bg-white font-sans rounded-lg font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.educationForms }">
                    <option value="" disabled>
                        {{ educationForms.length ? 'Уровень образования' : 'Нет доступных форм обучения' }}
                    </option>
                    <option v-for="forms in educationForms" :key="forms.id" :value="forms.id">
                        {{ forms.name }}
                    </option>
                </select>
                <span v-if="errors.educationForms" class="text-sm text-red-500">{{ errors.educationForms }}</span>
            </div>

            <!-- Загрузка студенческого билета -->
            <div class="col-span-2">
                <LoadingStudentCard @file-selected="handleFileSelected" />
                <span v-if="errors.studentCardFile" class="text-sm text-red-500">{{ errors.studentCardFile }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import UserDataService from "@/services/UserDataService";
import LoadingStudentCard from '../widgets/LoadingStudentCard.vue';

const universities = ref([]);
const faculties = ref([]);
const departments = ref([]);
const educationForms = ref([]);
const course = ref('');
const selectedUniversity = ref('');
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const selectEducationForm = ref('');
const loading = ref(false);
const authStore = useAuthStore();
const studentCardFile = ref(null)
const emit = defineEmits(['update:isValid']);
const errors = ref({
    universities: '',
    faculties: '',
    departments: '',
    educationForms: '',
    course: '',
    studentCardFile: '',
});

const validateForm = () => {
    errors.value = {
        universities: !selectedUniversity.value ? 'Выберите университет' : '',
        faculties: !selectedFaculty.value ? 'Выберите факультет' : '',
        departments: !selectedDepartment.value ? 'Выберите кафедру' : '',
        educationForms: !selectEducationForm.value ? 'Выберите форму обучения' : '',
        course: !course.value ? 'Выберите курс' : '',
        studentCardFile: !studentCardFile.value ? 'Загрузите файл студенческого билета' : '',
    };

    return !Object.values(errors.value).some(error => error !== '');
};

defineExpose({ validateForm });

const isFormValid = computed(() => {
    return selectedUniversity.value &&
        selectedFaculty.value &&
        selectedDepartment.value &&
        selectEducationForm.value &&
        course.value &&
        studentCardFile.value
});

const handleFileSelected = (file) => {
    studentCardFile.value = file;
    authStore.setStudentCardPhoto(file);
};

watchEffect(() => {
    emit('update:isValid', isFormValid.value);
});

onMounted(async () => {
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

const fetchFaculties = async () => {
    if (!selectedUniversity.value) return;

    loading.value = true;
    try {
        await UserDataService.getFaculties(selectedUniversity.value).then((response) => {
            faculties.value = response.data.results || [];
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
        })
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        departments.value = [];
    } finally {
        loading.value = false;
    }
}

const fetchEducationForms = async () => {
    if (!selectedDepartment.value) return;

    loading.value = true;
    try {
        await UserDataService.getEducationForms(selectedDepartment.value).then((response) => {
            educationForms.value = response.data.results || [];
        })
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        educationForms.value = [];
    } finally {
        loading.value = false;
    }
}

watch([selectedUniversity, selectedFaculty, selectEducationForm, selectedDepartment, course], () => {
    authStore.setSelectedDepartment(selectedDepartment.value)
    authStore.data.profile.university = selectedUniversity.value;
    authStore.data.profile.faculty = selectedFaculty.value;
    authStore.data.profile.department = selectedDepartment.value;
    authStore.data.profile.form_of_study = selectEducationForm.value;
    authStore.data.profile.course = course.value;
});


watch(isFormValid, (newVal) => {
    emit('update:isValid', Boolean(newVal));
});
</script>