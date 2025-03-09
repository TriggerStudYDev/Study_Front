<!-- src/components/DisciplineSelector.vue -->
<template>
    <div class="relative">
        <!-- Кнопка для открытия меню -->
        <button @click="isOpen = !isOpen"
            class="px-6 py-3 border bg-transparent border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none w-full text-left"
            :class="{ 'border-red-500': error }">
            {{selectedDisciplines.length > 0 ? disciplines.filter(d => selectedDisciplines.includes(d.id)).map(d =>
                d.name).join(', ') : placeholder }}
        </button>

        <!-- Выпадающее меню -->
        <div v-if="isOpen" class="absolute z-10 mt-2 w-full bg-white border border-[#BFBFBF] rounded-lg shadow-lg">
            <div class="p-2">
                <div v-for="discipline in disciplines" :key="discipline.id"
                    class="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    @click="toggleDiscipline(discipline.id)">
                    <input type="checkbox" :checked="selectedDisciplines.includes(discipline.id)" class="mr-2" />
                    <span>{{ discipline.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    disciplines: {
        type: Array,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'Выберите дисциплины',
    },
    error: {
        type: String,
        default: '',
    },
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedDisciplines = ref(props.modelValue);

const toggleDiscipline = (id) => {
    if (selectedDisciplines.value.includes(id)) {
        selectedDisciplines.value = selectedDisciplines.value.filter((item) => item !== id);
    } else {
        selectedDisciplines.value.push(id);
    }
    emit('update:modelValue', selectedDisciplines.value);
};

watch(
    () => props.modelValue,
    (newValue) => {
        selectedDisciplines.value = newValue;
    }
);
</script>

<style scoped>
/* Дополнительные стили, если нужно */
</style>