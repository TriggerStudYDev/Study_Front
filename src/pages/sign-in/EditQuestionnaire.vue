<template>
    <div class="mt-6">
        <h1 class="text-3xl font-semibold text-white">Редактирование анкеты</h1>
        <header>
            <QuestionnaireTable />
        </header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import QuestionnaireTable from '@/components/sign-in/register/EditQuestionnaire/QuestionnaireTable.vue';
</script>