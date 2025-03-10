<!-- src/pages/sign-in/EditQuestionnaire.vue -->
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

        <!-- Модальные окна -->
        <ProfileInfo v-if="activeModal === 'ProfileInfo'" @close="closeModal" />
        <Skill v-if="activeModal === 'Skill'" @close="closeModal" />
        <UserInfo v-if="activeModal === 'UserInfo'" @close="closeModal" />

        <!-- Кнопка сохранения изменений -->
        <button @click="saveChanges"
            class="px-8 py-3 mt-6 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet">
            Сохранить изменения
        </button>
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

// Открытие модального окна
const openModal = async (modalName) => {// Загружаем данные перед открытием
    activeModal.value = modalName;
};

// Закрытие модального окна
const closeModal = () => {
    activeModal.value = null;
};

// Сохранение всех изменений
const saveChanges = async () => {
    try {
        await editingStore.saveChanges();
        await editingStore.getProfile();
        console.log("Все изменения сохранены");
    } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);
    }
};

// Загружаем данные при монтировании компонента
onMounted(async () => {
    await editingStore.getProfile();
});
</script>