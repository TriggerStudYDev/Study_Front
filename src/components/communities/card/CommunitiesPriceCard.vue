<template>
    <div class="flex items-center gap-x-4 mt-5 px-6 py-4 bg-[#D9D9D9] rounded-2xl">
        <img src="/image/communities/Verified.svg" alt="Verifield">
        <div class="flex flex-col">
            <h2 class="text-xl font-semibold">2 500 рублей</h2>
            <span class="text-[#8C8C8E]">Рыночная цена</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>