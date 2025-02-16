<template>
    <div class="flex justify-between items-center">
        <h3 class="text-4xl font-semibold">Список заказов</h3>
        <button @click="$emit('open-modal')" class="flex items-center gap-x-2 text-xl font-medium">Все <img
                src="/image/works/Down.svg" alt="Down"></button>
    </div>
</template>
