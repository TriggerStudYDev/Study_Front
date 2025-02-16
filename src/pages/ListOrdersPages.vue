<template>
    <div class="max-w-[800px] mx-auto relative">
        <ListOrdersHeader @open-modal="openModal" />
        <div v-if="showModal" class="rounded-2xl bg-[#D9D9D9] absolute right-0 top-10">
            <ul v-for="ul in listUl" :key="ul.id">
                <button
                    class="flex gap-x-2 px-5 py-4 bg-[#D9D9D9] text-xl hover:bg-[#AFB9BB] w-full rounded-2xl duration-300"><img
                        :src="ul.image" alt="Icons">{{
                            ul.text }}</button>
            </ul>
        </div>
        <div class="grid grid-cols-3 gap-x-7 mt-8">
            <TheCardListOrder v-for="card in users" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<script setup>
import ListOrdersHeader from '@/components/ListOrdersHeader.vue';
import TheCardListOrder from '@/widgets/TheCardListOrder.vue';
import { useUserStore } from '@/stores';
import { ref } from 'vue';

const useStore = useUserStore();
const users = useStore.listOrderCards
const showModal = ref(false)

const openModal = () => {
    showModal.value = !showModal.value
}
const listUl = [
    {
        id: 1,
        image: '/image/modal/Library.svg',
        text: 'Все'
    },
    {
        id: 2,
        image: '/image/modal/Letter Unread.svg',
        text: 'Новые'
    },
    {
        id: 3,
        image: '/image/modal/Pen New Square.svg',
        text: 'В работе'
    },
    {
        id: 4,
        image: '/image/modal/Dialog.svg',
        text: 'На проверке'
    },
    {
        id: 5,
        image: '/image/modal/Forbidden Circle.svg',
        text: 'Отказанные'
    },
    {
        id: 6,
        image: '/image/modal/Check Circle.svg',
        text: 'Завершенные'
    }
]
</script>