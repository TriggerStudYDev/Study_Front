<template>
    <div class="flex gap-x-[72px]">
        <div v-for="page in 3" :key="page" class="relative">
            <div class="flex justify-center items-center text-[40px] font-semibold" :class="{
                'text-[#7B44F2]': page <= countPages,
                'text-[#BFBFBF]': page > countPages,
            }">
                0{{ page }}
            </div>
            <div v-if="page < 3"
                class="absolute top-1/2 -translate-y-1/2 right-[-3.55rem] w-[40px] h-[1px] bg-[#D9D9D9]"
                :class="{ 'bg-[#D9D9D9]': page >= countPages }"></div>
        </div>
    </div>
</template>

<script setup>
defineProps(['countPages'])
</script>