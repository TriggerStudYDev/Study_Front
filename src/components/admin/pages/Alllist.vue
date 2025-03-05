<!-- src/components/Alllist.vue -->
<template>
    <div v-if="isLoading">Загрузка...</div>
    <div class="grid grid-cols-6 gap-7">
        <CardUser @click="openModal(user)" v-for="user in users" :key="user.id" :user="user"
            @open-modal="openModal(user)" />
    </div>
</template>

<script setup>
import CardUser from '@/components/admin/TheCardUser.vue';
import { useStudentCardStore } from '@/stores/useStudentCardStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const studentCardStore = useStudentCardStore();
const { studentCard } = storeToRefs(studentCardStore);
const users = computed(() => studentCard.value.results || []);
const isLoading = ref(true);


const emit = defineEmits(['open-modal']);

const openModal = (user) => {
    emit('open-modal', user);
};

onMounted(async () => {
    await studentCardStore.getStudentCard();
    isLoading.value = false;
})
</script>