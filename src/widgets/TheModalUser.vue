<template>
    <div
        class="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start transition-transform duration-300">
        <div class="bg-[#E9E9EB] rounded-lg w-[500px] h-full shadow-lg overflow-y-auto py-10">
            <div class="flex p-4 justify-between items-center">
                <div class="flex items-center gap-x-4">
                    <img class="w-14" :src="user.image" alt="">
                    <h1 class="text-xl font-medium">{{ user.name }}</h1>
                </div>
                <button @click="$emit('close-modal')"><img src="/image/modal/Close_LG.svg" alt="Close"></button>
            </div>
            <LineHR />
            <div class="px-4 mt-3">
                <div class="flex">
                    <div class="w-[224px] flex flex-col gap-y-6 text-lg text-[#8C8C8E]">
                        <p>Email:</p>
                        <p>Соц.сети</p>
                    </div>
                    <div class="flex flex-col gap-y-6 font-medium">
                        <span>{{ user.email }}</span>
                        <div class="flex gap-4">
                            <a v-for="social in filteredSocial" :key="social.platform" :href="social.link"
                                target="_blank" rel="noopener noreferrer">
                                <img :src="`/image/modal/${social.platform}.svg`" :alt="social.platform" class="w-6">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="flex mt-7">
                    <div class="w-[224px] flex flex-col gap-y-4 text-lg text-[#8C8C8E]">
                        <p>Специальность:</p>
                        <p>Вуз:</p>
                        <p>Факультет:</p>
                        <p>Кафедра:</p>
                        <p>Курс:</p>
                        <p>Студенческий билет:</p>
                    </div>
                    <div class="flex flex-col gap-y-4 text-lg font-medium">
                        <span>{{ user.speciality }}</span>
                        <span>{{ user.university }}</span>
                        <span>{{ user.Faculty }}</span>
                        <span>{{ user.department }}</span>
                        <span>{{ user.course }}</span>
                        <span>{{ user.studentID }}</span>
                    </div>
                </div>
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">Дисциплины</h3>
                <p class="mt-5">Дисциплины, которые я решаю:</p>
                <p v-for="discipline in user.Disciplines" :key="discipline.id">{{ discipline.name }}</p>
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">О себе</h3>
                <p class="mt-5 text-lg leading-6">{{ user.description }}</p>
            </div>
            <LineHR />
            <div class="px-4">
                <div class="flex justify-between gap-x-4">
                    <button class="w-full py-3 bg-white rounded-lg text-xl font-medium text-black">Одобрить</button>
                    <button class="w-full py-3 bg-black rounded-lg text-xl font-medium text-white">Отказ</button>
                </div>
                <button class="w-full py-3 bg-[#8C8C8E] rounded-lg text-xl font-medium text-white mt-4">Запросить доп
                    информацию</button>
            </div>
        </div>
    </div>
</template>



<script setup>
import LineHR from '@/ui/LineHR.vue';
import { computed } from 'vue';


const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['close-modal']);

const filteredSocial = computed(() => {
    const supportedPlartforms = ['telegram', 'vkontacte'];
    return props.user.social.filter((social) => supportedPlartforms.includes(social.platform));
})
</script>
