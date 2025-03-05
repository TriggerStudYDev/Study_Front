<template>
    <div>
        <ExaminationOrderHeader />
        <div class="mt-10">
            <h3>Отправьте свою работу на проверку</h3>
            <div class="flex flex-col gap-y-5 mt-4">
                <div class="flex bg-[#D9D9D9] px-8 py-3 rounded-lg">
                    <input class="w-full bg-[#D9D9D9] text-xl font-medium focus:outline-none" type="text"
                        placeholder="Ссылка или файл с работой" v-model="input.file">
                    <button><img src="/image/order/Tilt.svg" alt="Tilt"></button>
                </div>
                <div>
                    <input
                        class="px-8 h-[120px] py-3 w-full rounded-lg bg-[#D9D9D9] text-xl font-medium focus:outline-none"
                        type="text" placeholder="Комментарий заказчику" v-model="input.description">
                </div>
            </div>
            <div class="flex justify-end">
                <button
                    class=" px-[82px] py-3 bg-black text-white rounded-lg text-xl font-medium mt-60">Отправить</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ExaminationOrderHeader from '@/components/opder/ExaminationOrderHeader.vue';
import { ref } from 'vue';

const input = ref({
    file: '',
    description: ''
});
</script>