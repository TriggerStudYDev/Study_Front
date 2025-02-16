<!-- src/components/OrderPagesHeader.vue -->
<template>
    <div class="flex justify-between text-xl border-b border-[#D9D9D9]">
        <router-link class=" w-[250px] text-center"
            :class="{ 'border-b-2 border-[#8C8C8E]': $route.name === 'order-details' }"
            :to="{ name: 'order-details', params: { id: $route.params.id } }">
            Заказ
        </router-link>
        <router-link class=" w-[250px] text-center"
            :class="{ 'border-b-2 border-[#8C8C8E]': $route.name === 'order-examination' }"
            :to="{ name: 'order-examination', params: { id: $route.params.id } }">
            Проверка
        </router-link>
        <router-link class="w-[250px] text-center"
            :class="{ 'border-b-2 border-[#8C8C8E]': $route.name === 'order-editing' }"
            :to="{ name: 'order-editing', params: { id: $route.params.id } }">
            Правки
        </router-link>
    </div>
    <router-view class="mt-8" />
</template>