<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        :class="{ 'fade-out': animation }">
        <div class="bg-white rounded-2xl px-6 py-10 w-[542px] slide-up" :class="{ 'slide-down': animation }">
            <button @click="closeButton" class="absolute top-4 right-4">
                <img src="/image/auth/Close_MD.svg" alt="Close">
            </button>
            <div class="flex flex-col">
                <h1 class="mt-2 text-2xl font-semibold text-PrimaryDark">Личная информация</h1>
                <p class="text-PrimaryDark">
                    Здесь хранятся твои основные данные: ФИО, почта и другие контактные данные. Убедись, что всё
                    актуально, чтобы
                    мы могли легко связаться с тобой.
                </p>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input class="w-full outline-none" type="text" placeholder="Дисциплина"
                            v-model="disciplines.name">
                        <button @click="form.discipline = ''; disciplines = ''"><img src="/image/modal/closeInput.svg"
                                alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <textarea rows="4" maxlength="500" class="w-full outline-none" type="text" placeholder="О себе"
                            v-model="form.about_self">

                        </textarea>
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInputCustomerFeedback" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdateCustomerFeedback" multiple />
                                <div @click="$refs.fileInputCustomerFeedback.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.customer_feedback || form.customer_feedback.length === 0">Отзывы
                                        заказчиков</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <div class="flex flex-wrap gap-x-2">
                            <div v-for="(item, index) in form.customer_feedback" :key="index"
                                class="flex gap-x-1 bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl mb-2">
                                <a :href="item.photo" target="_blank">Фото {{ index + 1 }}.png</a>
                                <button @click.stop="form.customer_feedback.splice(index, 1)">
                                    <img src="/image/modal/closeInput.svg" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div
                            class="flex justify-between items-center mb-3 px-4 py-3 border border-[#8C8C8C] rounded-xl">
                            <div>
                                <input ref="fileInputPortfolio" type="file" class="hidden" accept="image/*,.pdf"
                                    @change="handleFileUpdateProfile" multiple />
                                <div @click="$refs.fileInputPortfolio.click()"
                                    class="cursor-pointer text-[#8C8C8C] hover:text-[#6C6C6C] transition-colors">
                                    <p v-if="!form.portfolio || form.portfolio.length === 0">Портфолио</p>
                                    <p v-else class="text-[#4C4C4C]">Прикрепи фото</p>
                                </div>
                            </div>
                            <button><img src="/image/modal/File_Download.svg" alt=""></button>
                        </div>
                        <div class="flex flex-wrap gap-x-2">
                            <div v-for="(item, index) in form.portfolio" :key="index"
                                class="flex gap-x-1 bg-[#F2F2F2] px-2 py-1.5 text-TeriaryDark font-medium rounded-2xl mb-2">
                                <a :href="item.photo" target="_blank">Фото {{ index + 1 }}.png</a>
                                <button @click.stop="form.portfolio.splice(index, 1)">
                                    <img src="/image/modal/closeInput.svg" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="closeButton"
                    class="px-8 py-3 mt-8 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useEditingStore } from '@/stores/useEditingStore';
import EditingDataService from '@/services/EditingDataService';

const editingStore = useEditingStore();
const disciplines = ref([]);
const animation = ref(false);
const fileInputCustomerFeedback = ref(null);
const fileInputPortfolio = ref(null);
const emit = defineEmits(['close']);
const form = ref({
    ...editingStore.profile,
    // customer_feedback: editingStore.profile.customer_feedback?.length
    //     ? [...editingStore.profile.customer_feedback]
    //     : [],
    // portfolio: editingStore.profile.portfolio?.length
    //     ? [...editingStore.profile.portfolio]
    //     : []
});

onMounted(async () => {
    try {
        await EditingDataService.getDisciplines(form.value.discipline).then(((response) => {
            disciplines.value = response.data || [];
        }));
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
    // form.value = {
    //     ...editingStore.profile,
    //     // customer_feedback: editingStore.profile.customer_feedback || [],
    //     // portfolio: editingStore.profile.portfolio || []
    // };
});

watch(form, (newForm) => {
    editingStore.setChanges(newForm);
}, { deep: true });

const handleFileUpdateCustomerFeedback = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    // Создаем копию массива для реактивности
    const newFeedback = [...form.value.customer_feedback];

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            newFeedback.push({ photo: reader.result });
            // Обновляем массив целиком для триггера реактивности
            form.value.customer_feedback = [...newFeedback];
        };
        reader.readAsDataURL(file);
    });
};

const handleFileUpdateProfile = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const newPortfolio = [...form.value.portfolio];

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            newPortfolio.push({ photo: reader.result });
            form.value.portfolio = [...newPortfolio];
        };
        reader.readAsDataURL(file);
    });
};

const closeButton = () => {
    editingStore.setChanges(form.value);
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
};
</script>