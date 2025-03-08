<template>
    <div class="mt-6">
        <h1 class="text-3xl font-semibold text-white">Редактирование анкеты</h1>
        <header>
            <QuestionnaireTable />
        </header>
        <div class="mt-6">
            <img src="/image/questionnaire/Stage.png" alt="">
        </div>
        <main class="mt-6">
            <router-view @open-modal="openModal" />
        </main>

        <ProfileInfo v-if="activeModal === 'ProfileInfo'" @close="closeModal" />
        <Skill v-if="activeModal === 'Skill'" @close="closeModal" />
        <UserInfo v-if="activeModal === 'UserInfo'" @close="closeModal" />
    </div>
</template>

<script setup>
import QuestionnaireTable from '@/components/sign-in/register/EditQuestionnaire/QuestionnaireTable.vue';
import ProfileInfo from '@/components/sign-in/register/EditQuestionnaire/ModalWindows/ProfileInfo.vue';
import Skill from '@/components/sign-in/register/EditQuestionnaire/ModalWindows/Skill.vue';
import UserInfo from '@/components/sign-in/register/EditQuestionnaire/ModalWindows/UserInfo.vue';
import { useEditingStore } from '@/stores/useEditingStore';
import { onMounted, ref } from 'vue';

const activeModal = ref(null);
const editingStore = useEditingStore();

const openModal = (modalName) => {
    activeModal.value = modalName;
};

const closeModal = () => {
    activeModal.value = null;
};

// Загружаем данные при монтировании компонента
onMounted(() => {
    editingStore.getEding();
});
</script>