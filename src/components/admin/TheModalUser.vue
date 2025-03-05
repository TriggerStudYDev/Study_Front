<!-- src/widgets/TheModalUser.vue -->
<template>
    <div
        class="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start transition-transform duration-300">
        <div class="bg-[#E9E9EB] rounded-lg w-[500px] h-full shadow-lg overflow-y-auto py-10">
            <div class="flex p-4 justify-between items-center">
                <div class="flex items-center gap-x-4">
                    <img class="w-14" src="/image/avatar/LogoUser.png" alt="">
                    <div>
                        <span class="text-xl font-medium">{{ user.user.role }}</span>
                        <h1 class="text-xl font-medium">{{ user.user.first_name + ' ' + user.user.last_name }}</h1>
                    </div>
                </div>
                <button @click="$emit('close-modal')"><img src="/image/modal/Close_LG.svg" alt="Close"></button>
            </div>
            <LineHR />
            <div class="px-4 mt-3">
                <div class="flex">
                    <div class="grid grid-cols-[auto_1fr] items-start gap-x-10 gap-y-3 mt-7">
                        <p class="text-[#8C8C8E] text-lg">Логин:</p>
                        <p class="text-black font-medium break-words">{{ user.user.username }}</p>

                        <p class="text-[#8C8C8E] text-lg">Email:</p>
                        <p class="text-black font-medium break-words">{{ user.user.email }}</p>

                        <p class="text-[#8C8C8E] text-lg"
                            v-if="user.profile.vk_profile !== '' || user.profile.telegram_username !== ''">Соц.сети:</p>
                        <div class="flex gap-4"
                            v-if="user.profile.vk_profile !== '' && user.profile.telegram_username !== ''">
                            <a v-if="user.profile.vk_profile !== ''" :href="normalizeVkUrl(user.profile.vk_profile)"
                                target="_blank" rel="noopener noreferrer"><img src="/image/modal/vkontacte.svg"
                                    alt=""></a>
                            <a v-if="user.profile.telegram_username !== ''"
                                :href="normalizeTelegramUrl(user.profile.telegram_username)" target="_blank"
                                rel="noopener noreferrer"><img src="/image/modal/telegram.svg" alt="">
                            </a>
                        </div>

                    </div>
                </div>
                <LineHR />
                <div class="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 mt-7">
                    <p class="text-[#8C8C8E] text-lg">Вуз:</p>
                    <p class="text-black font-medium break-words">{{ university?.name || 'Не указан' }}</p>

                    <p class="text-[#8C8C8E] text-lg">Факультет:</p>
                    <p class="text-black font-medium break-words">{{ faculty?.name || 'Не указан' }}</p>

                    <p class="text-[#8C8C8E] text-lg">Кафедра:</p>
                    <p class="text-black font-medium break-words">{{ department?.name || 'Не указан' }}</p>

                    <p class="text-[#8C8C8E] text-lg">Курс:</p>
                    <p class="text-black font-medium">{{ user.profile.form_of_study || 'Не указан' }} курс</p>
                </div>
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">Дисциплины</h3>
                <div>
                    <p class="mt-5">Дисциплины, которые я решаю:</p>
                    <p>
                        - {{ disciplines?.name || 'Не указаны' }}
                    </p>
                </div>
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">О себе</h3>
                <p class="mt-5 text-lg leading-6">{{ user.about_self }}</p>
            </div>
            <LineHR />
            <div class="flex flex-col justify-between gap-y-4 px-4">
                <p v-if="isSuccessfully" class="text-center text-green-500 font-semibold">Успешно</p>
                <div class="flex items-center gap-x-4">
                    <input class="w-full py-2.5 px-6 text-[#8C8C8E] bg-[#E9E9EB] border border-[#8C8C8E] rounded-lg"
                        type="text" placeholder="Напишите сообщение" v-model="comment">
                    <button @click="questionnaireRefusal('Отправлен на доработку')"
                        class="px-6 py-3 bg-black rounded-lg"><img src="/image/modal/Stop_Sign.svg"
                            :disabled="!comment"></button>
                </div>
                <div class="flex items-center gap-x-4">
                    <input class="w-full py-2.5 px-6 text-[#8C8C8E] bg-[#E9E9EB] border border-[#8C8C8E] rounded-lg"
                        type="text" placeholder="Введите номер студенческого билета" v-model="student_card_number">
                    <button @click="questionnaireAccepted('Принят')" class="px-6 py-3 bg-white rounded-lg"
                        :disabled="!student_card_number"><img src="/image/modal/Circle_Check.svg"></button>
                </div>
            </div>
            <!-- <div class="px-4">
                <div class="flex justify-between gap-x-4">
                    <button class="w-full py-3 bg-white rounded-lg text-xl font-medium text-black">Одобрить</button>
                    <button class="w-full py-3 bg-black rounded-lg text-xl font-medium text-white">Отказ</button>
                </div>
                <button class="w-full py-3 bg-[#8C8C8E] rounded-lg text-xl font-medium text-white mt-4">Запросить доп
                    информацию</button>
            </div> -->
        </div>
    </div>
</template>



<script setup>
import LineHR from '@/ui/LineHR.vue';
import { onMounted, ref } from 'vue';
import AdminDataService from '@/services/AdminDataService';
import { useStudentCardStore } from '@/stores/useStudentCardStore';


const comment = ref('');
const student_card_number = ref('');
const isSuccessfully = ref(false);
const studentCardStore = useStudentCardStore();
const university = ref({ name: '' });
const faculty = ref({ name: '' });
const department = ref({ name: '' });
const disciplines = ref({ name: '' });

const emit = defineEmits(['close-modal']);

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});



const questionnaireAccepted = async (status) => {
    await AdminDataService.postQuestionnaireAccepted(props.user.id, student_card_number.value, status).then(() => {
        isSuccessfully.value = true
    })
    await studentCardStore.getStudentCard();
    emit('close-modal');
    emit('update-data');
}

const questionnaireRefusal = async (status) => {
    await AdminDataService.postQuestionnaireRefusal(props.user.id, comment.value, status).then(() => {
        isSuccessfully.value = true
    })
    await studentCardStore.getStudentCard();
    emit('close-modal');
    emit('update-data');
}


const fetchData = async () => {
    try {
        if (props.user.profile.university) {
            await AdminDataService.getUniversities(props.user.profile.university).then((response) => {
                university.value = response.data;
            });
        }
        if (props.user.profile.faculty) {
            await AdminDataService.getFaculties(props.user.profile.faculty).then((response) => {
                faculty.value = response.data;
            })
        }
        if (props.user.profile.department) {
            await AdminDataService.getDepartments(props.user.profile.department).then((response) => {
                department.value = response.data;
            })
        }
        if (props.user.profile.disciplines?.length) {
            await AdminDataService.getDisciplines(props.user.profile.disciplines).then((response) => {
                disciplines.value = response.data;
            })
        }
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        university.value = { name: 'Не указан' };
        faculty.value = { name: 'Не указан' };
        department.value = { name: 'Не указан' };
        disciplines.value = [];
    }
}


const normalizeVkUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('@')) return `https://vk.com/${url.slice(1)}`;
    return `https://vk.com/${url}`;
}

const normalizeTelegramUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('@')) return `https://t.me/${url.slice(1)}`;
    return `https://t.me/${url}`;
}

onMounted(async () => {
    fetchData();
})
</script>
