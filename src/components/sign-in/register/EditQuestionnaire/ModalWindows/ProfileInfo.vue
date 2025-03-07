<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        :class="{ 'fade-out': animation }">
        <div class="bg-white rounded-2xl px-6 py-10 w-[542px] slide-up" :class="{ 'slide-down': animation }">
            <button @click="closeButton" class="absolute top-4 right-4">
                <img src="/image/auth/Close_MD.svg" alt="Close">
            </button>
            <div class="flex flex-col">
                <h1 class="text-2xl font-semibold mt-2 text-PrimaryDark">Учебная информация</h1>
                <p class="text-PrimaryDark">
                    Укажи данные о своём вузе: фото студенческого, курс, факультет и уровень образования. Это поможет
                    нам подбирать для тебя подходящие заказы или исполнителей.
                </p>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.university" type="text" placeholder="Вуз" class="w-full outline-none" />
                        <button @click="form.university = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.faculty" type="text" placeholder="Факультет" class="w-full outline-none" />
                        <button @click="form.faculty = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.department" type="text" placeholder="Кафедра"
                            class="w-full outline-none" />
                        <button @click="form.department = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.course" type="text" placeholder="Курс" class="w-full outline-none" />
                        <button @click="form.course = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div class="flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.speciality" type="text" placeholder="Уровень образования"
                            class="w-full outline-none" />
                        <button @click="form.speciality = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                    <div
                        class="col-span-2 flex justify-between items-center px-4 py-3 border border-[#8C8C8C] rounded-xl">
                        <input v-model="form.photo" type="text" placeholder="Прикрепи фото"
                            class="w-full outline-none" />
                        <button @click="form.photo = ''"><img src="/image/modal/closeInput.svg" alt=""></button>
                    </div>
                </div>
                <button @click="saveChanges"
                    class="px-8 py-3 bg-AccentViolet text-white rounded-lg text-xl font-medium leading-7 mt-8">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEditingStore } from '@/stores/useEditingStore';

const editingStore = useEditingStore();
const emit = defineEmits(['close']);
const animation = ref(false)
const form = ref({
    university: '',
    faculty: '',
    department: '',
    course: '',
    speciality: '',
    photo: '',
})

watch(() => editingStore.profile, (newProfile) => {
    if (newProfile) {
        form.value = {
            university: newProfile.profile.university || '',
            faculty: newProfile.profile.faculty || '',
            department: newProfile.profile.department || '',
            course: newProfile.profile.course || '',
            speciality: newProfile.profile.speciality || '',
            photo: newProfile.profile.photo || '',
        }
    }
}, { immediate: true })

const saveChanges = async () => {
    try {
        await editingStore.updateProfile(form.value);
        closeButton();
    } catch (error) {
        console.error('Ошибка при сохранении изменений:', error);
    }
}

const closeButton = () => {
    animation.value = true;
    setTimeout(() => {
        emit('close');
    }, 300);
}

</script>