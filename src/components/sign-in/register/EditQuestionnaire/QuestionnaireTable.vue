<template>
    <div class="flex justify-around py-1 bg-[#2B2A2A] text-white rounded-3xl mt-6">
        <router-link class="w-full py-2 text-center rounded-3xl font-medium"
            :class="{ 'bg-[#7B44F2]': $route.name === 'feedback' }" :to="{ name: 'feedback' }">Обратная
            связь</router-link>
        <router-link class="w-full py-2 text-center rounded-3xl font-medium"
            :class="{ 'bg-[#7B44F2]': $route.name === 'questionnaire' }"
            :to="{ name: 'questionnaire' }">Анкета</router-link>
        <router-link class="w-full py-2 text-center rounded-3xl font-medium"
            :class="{ 'bg-[#7B44F2]': $route.name === 'history' }" :to="{ name: 'history' }">История</router-link>
    </div>
</template>