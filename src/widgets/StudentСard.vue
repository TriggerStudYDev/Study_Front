<template>
    <div>

        <div class="flex flex-col items-center gap-y-4">
            <!-- Университеты -->
            <select v-model="selectedUniversity" @change="fetchFaculties" :disabled="loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>Выберите вуз</option>
                <option v-for="university in universities" :key="university.id" :value="university.id">
                    {{ university.name }}
                </option>
            </select>

            <!-- Факультеты -->
            <select v-model="selectedFaculty" @click="fetchDepartments" :disabled="!selectedUniversity || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
                </option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                    {{ faculty.name }}
                </option>
            </select>

            <!-- Кафедры -->
            <select v-model="selectedDepartment" :disabled="!selectedFaculty || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
                </option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                </option>
            </select>

            <!-- Курс -->
            <select v-model="course" :disabled="!selectedDepartment || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>{{ course.length ? 'Выберите курс' : 'Нет доступных курсов' }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
        <!-- src/widgets/StudentСard.vue -->
        <div class="flex flex-col gap-y-4 mt-4">
            <LoadingFilesForRegistration>
                <h4>Прикрепите фото студенческого билета</h4>
            </LoadingFilesForRegistration>
        </div>
        <div>
            <ForgotThePassword @toggle-auth="$emit('toggle-auth')" :typeAuth="typeAuth" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { getUniversities, getFaculties, getDepartments } from '@/global/api';
import { useAuthStore } from '@/stores/auth';
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';

const universities = ref([]);
const faculties = ref([]);
const departments = ref([]);
const course = ref('');
const selectedUniversity = ref('');
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const loading = ref(false);
const authStore = useAuthStore();
const emit = defineEmits(['update:isValid']);

watch([selectedUniversity, selectedFaculty, selectedDepartment, course], () => {
    authStore.data.profile.university = selectedUniversity.value;
    authStore.data.profile.faculty = selectedFaculty.value;
    authStore.data.profile.department = selectedDepartment.value;
    authStore.data.profile.form_of_study = 1;
    authStore.data.profile.vk_profile = '@test';
    authStore.data.profile.telegram_username = '@test';
    authStore.data.profile.disciplines = [1];
});

const isFormValid = computed(() => {
    return selectedUniversity.value &&
        selectedFaculty.value &&
        selectedDepartment.value &&
        course.value;
});

watchEffect(() => {
    emit('update:isValid', isFormValid.value);
});

onMounted(async () => {
    loading.value = true;
    try {
        const response = await getUniversities();
        universities.value = response.results || [];
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
        const response = await getFaculties(selectedUniversity.value);
        faculties.value = response.results || [];
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
        const response = await getDepartments(selectedFaculty.value);
        departments.value = response.results || [];
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        departments.value = [];
    } finally {
        loading.value = false;
    }
}

watch(isFormValid, (newVal) => {
    emit('update:isValid', Boolean(newVal)); // Явное преобразование в boolean
});
</script>