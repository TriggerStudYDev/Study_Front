<!-- src/components/sign-in/register/StudentСard.vue -->
<template>
    <div>

        <div class="grid grid-cols-2 gap-4">
            <!-- Университеты -->
            <select v-model="selectedUniversity" @change="fetchFaculties" :disabled="loading"
                class="col-span-2 px-6 py-3 bg-transparent border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>ВУЗ</option>
                <option v-for="university in universities" :key="university.id" :value="university.id">
                    {{ university.name }}
                </option>
            </select>

            <!-- Факультеты -->
            <select v-model="selectedFaculty" @change="fetchDepartments" :disabled="!selectedUniversity || loading"
                class="col-span-2 px-6 py-3 bg-transparent border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
                </option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                    {{ faculty.name }}
                </option>
            </select>

            <!-- Кафедры -->
            <select v-model="selectedDepartment" @change="fetchEducationForms" :disabled="!selectedFaculty || loading"
                class="col-span-2 px-6 py-3 bg-transparent border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
                </option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                </option>
            </select>

            <!-- Курс -->
            <select v-model="course" :disabled="!selectedDepartment || loading"
                class="px-6 py-3 bg-transparent border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>{{ course.length ? 'Выберите курс' : 'Нет доступных курсов' }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <!-- Форма обучения -->
            <select v-model="selectEducationForm" :disabled="!selectedDepartment || loading"
                class="px-6 py-3 bg-transparent border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ educationForms.length ? 'Уровень образования' : 'Нет доступных форм обучения' }}
                </option>
                <option v-for="forms in educationForms" :key="forms.id" :value="forms.id">
                    {{ forms.name }}
                </option>
            </select>
            <LoadingStudentCard class="col-span-2">

            </LoadingStudentCard>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRegistrationStore } from '@/stores/useRegistrationStore';
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
const registrationStore = useRegistrationStore();
const emit = defineEmits(['update:isValid']);

const isFormValid = computed(() => {
    return selectedUniversity.value &&
        selectedFaculty.value &&
        selectedDepartment.value &&
        selectEducationForm.value &&
        course.value;
});

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
    // registrationStore.setSelectedUniversity();
    // registrationStore.setSelectedFaculuty();
    // registrationStore.setSelectedDepartment();
    // registrationStore.setSelectedEducationForm();
    // registrationStore.setSelectedCourse();
    // registrationStore.setVkProfile();
    // registrationStore.setTelegramUsername();
});


watch(isFormValid, (newVal) => {
    emit('update:isValid', Boolean(newVal));
});
</script>