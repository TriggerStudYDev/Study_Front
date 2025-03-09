<template>
    <div class="px-10 py-7 border border-[#8C8C8C] rounded-3xl overflow-hidden transition-all duration-500 ease-in-out left-to-right "
        :style="{ height: inOpen ? 'auto' : '100px' }">
        <div class="flex items-start gap-x-4" :class="{ 'justify-between': !inOpen }">
            <img src="/image/questionnaire/Mask group.svg" alt="" v-if="inOpen">
            <div class="flex gap-x-4 items-start" v-if="!inOpen">
                <img src="/image/questionnaire/Mask group.svg" alt="">
                <div class="flex flex-col">
                    <h2 class="text-DisabledDark text-2xl font-semibold">StudY</h2>
                    <h5 class="text-[#8C8C8C] text-sm">12.12.2024 - 13:29</h5>
                </div>
            </div>
            <div class="flex flex-col w-full" v-if="inOpen">
                <h2 class="text-DisabledDark text-2xl font-semibold">StudY</h2>
                <p class="text-DisabledDark py-3 transition-opacity duration-500 ease-in-out"
                    :class="{ 'opacity-0': !inOpen, 'opacity-100': inOpen }">
                    Уважаемый пользователь, <br>
                    Благодарим вас за заполнение заявки на нашей платформе StudY. Мы внимательно рассмотрели
                    предоставленную вами информацию и для дальнейшего рассмотрения вашей заявки нам может потребоваться
                    следующая дополнительная информация: <br>
                    1. Резюме или CV, содержащее информацию о вашем опыте работы, навыках и достижениях. Это позволит
                    нам лучше понять ваш профиль и соответствие требованиям выбранной программы. <br>
                    2. Мотивационное письмо, в котором вы расскажете о ваших целях, ожиданиях и причинах, по которым вы
                    хотите
                    присоединиться к нашей платформе. Пожалуйста, предоставьте запрошенную информацию в ближайшее
                    время. Мы оперативно рассмотрим ваши документы и свяжемся с вами для дальнейшего обсуждения. <br>
                    С уважением, <br>
                    Команда StudY
                </p>
                <h5 class="text-[#8C8C8C] text-sm transition-opacity duration-500 ease-in-out"
                    :class="{ 'opacity-0': !inOpen, 'opacity-100': inOpen }">
                    12.12.2024 - 13:29
                </h5>
            </div>
            <button @click="inOpen = !inOpen" class="text-DisabledDark transition-transform duration-300  w-12"
                :class="{ 'rotate-180': inOpen }">
                /\
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const inOpen = ref(false);
</script>

<style scoped>
/* Анимация для кнопки */
.rotate-180 {
    transform: rotate(180deg);
}

/* Плавное изменение высоты и прозрачности */
.transition-all {
    transition-property: all;
}

.duration-500 {
    transition-duration: 500ms;
}

.ease-in-out {
    transition-timing-function: ease-in-out;
}

.overflow-hidden {
    overflow: hidden;
}

/* Плавное появление текста */
.opacity-0 {
    opacity: 0;
}

.opacity-100 {
    opacity: 1;
}
</style>