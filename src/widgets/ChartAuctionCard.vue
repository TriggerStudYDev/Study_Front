<template>
    <div class="p-4 bg-white rounded-2xl flex flex-col max-w-[300px]">
        <img class="w-[268px] h-[194px] rounded-2xl" :src="card.image" alt="Users" loading="lazy">
        <div>
            <div class="flex justify-between items-center mt-4">
                <h4 class="font-medium">{{ card.title }}</h4>
                <span class="text-sm text-[#AFB9BB]">7 дней</span>
            </div>
            <p class="mt-2 text-sm text-[#AFB9BB]">{{ card.description }}</p>
            <div class="mt-4">
                <div class="flex items-center gap-x-4">
                    <img class="w-[46px]" :src="card.imageUser" alt="Logo" loading="lazy">
                    <div>
                        <p class="font-medium">{{ card.nameUser }}</p>
                        <span class="flex gap-x-1 mt-1">{{ card.rating }}<img src="/image/works/star.svg"
                                alt="Star"></span>
                    </div>
                </div>
            </div>
            <button class="w-full py-3 bg-black text-white text-xl rounded-lg mt-4">Откликнуться</button>
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