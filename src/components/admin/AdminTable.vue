<!-- src/components/AdminTable.vue -->
<template>
    <div class="mt-10">
        <h2 class="text-black text-2xl font-semibold">Список заявок</h2>
        <div class="flex justify-between items-center mt-5">
            <ul class="flex gap-x-6 text-xl">
                <li><router-link class="space-x-4 pb-2 px-3"
                        :class="route.path === '/adminPanel/all' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/all">Все <span class="px-4 py-1 bg-black text-white rounded-2xl text-sm">{{
                            studentCardStore.studentCard.count }}</span></router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/accepted' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/accepted">Приняты</router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/rejectedSb' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/rejectedSb">Отклонены по СБ</router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/check' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/check">На проверке</router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/refinement' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/refinement">На доработке</router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/performerRejected' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/performerRejected">Отклонен исполнитель</router-link></li>
            </ul>
            <div class="flex gap-x-3">
                <button class="px-3 py-2 bg-[#D9D9D9] rounded-2xl">Исполнитель</button>
                <button class="px-3 py-2 bg-[#D9D9D9] rounded-2xl">Заказчик</button>
            </div>
        </div>
        <div class="my-7">
            <!-- <TheFilter /> -->
        </div>
        <div>
            <TheModalUser v-if="showModal" :user="selectedUser" @close-modal="closeModal"
                @update-data="handleUpdateData" />
        </div>
        <RouterView @open-modal="handleOpenModel" />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import TheFilter from '@/components/admin/TheFilter.vue';
import TheModalUser from '@/components/admin/TheModalUser.vue';
import { useStudentCardStore } from '@/stores/useStudentCardStore';

const route = useRoute();
const router = useRouter();
const studentCardStore = useStudentCardStore();
const selectedUser = ref([]);
const showModal = ref(false);
const isLoading = ref(true);

watch(() => route.query.userId, (newId) => {
    if (newId) {
        const user = studentCardStore.studentCard.results?.find(
            u => u.id === parseInt(newId)
        );
        if (user) {
            selectedUser.value = user;
            showModal.value = true;
        }
    } else {
        showModal.value = false;
    }
})

const handleUpdateData = async () => {
    await studentCardStore.getStudentCard();
    isLoading.value = false;
}

const handleOpenModel = (user) => {
    router.push({
        query: { ...route.query, userId: user.id }
    })
}

const closeModal = () => {
    const query = { ...route.query };
    delete query.userId;
    router.replace({ query });
}

onMounted(async () => {
    await studentCardStore.getStudentCard();
    isLoading.value = false;
})
</script>