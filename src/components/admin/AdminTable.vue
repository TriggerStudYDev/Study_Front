<!-- src/components/AdminTable.vue -->
<template>
    <div class="mt-10">
        <h2 class="text-2xl font-semibold text-black">Список заявок</h2>
        <div class="flex items-center justify-between mt-5">
            <ul class="flex text-xl gap-x-6">
                <li><router-link class="px-3 pb-2 space-x-4"
                        :class="route.path === '/adminPanel/all' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/all">Все <span class="px-4 py-1 text-sm text-white bg-black rounded-2xl">{{
                            studentCardStore.studentCard.count }}</span></router-link></li>
                <li><router-link class="px-3 pb-2"
                        :class="route.path === '/adminPanel/accepted' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/accepted">Приняты</router-link></li>
                <li><router-link class="px-3 pb-2"
                        :class="route.path === '/adminPanel/rejectedSb' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/rejectedSb">Отклонены по СБ</router-link></li>
                <li><router-link class="px-3 pb-2"
                        :class="route.path === '/adminPanel/check' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/check">На проверке</router-link></li>
                <li><router-link class="px-3 pb-2"
                        :class="route.path === '/adminPanel/refinement' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/refinement">На доработке</router-link></li>
                <li><router-link class="px-3 pb-2"
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
import TheModalUser from '@/components/admin/modal/TheModalUser.vue';
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
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('body-no-scroll')

    router.push({
        query: { ...route.query, userId: user.id }
    })
}

const closeModal = () => {
    const query = { ...route.query };
    delete query.userId;

    setTimeout(() => {
        const scrollY = document.body.style.top;
        document.body.classList.remove('body-no-scroll')
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }, 10)
    router.replace({ query });
}

onMounted(async () => {
    await studentCardStore.getStudentCard();
    isLoading.value = false;
})
</script>