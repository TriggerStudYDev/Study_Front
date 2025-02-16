<template>
    <div class="grid grid-cols-3 gap-8">
        <div class="col-span-2 grid grid-cols-2 gap-8">
            <ChartEarningsMonth class="col-span-1" />
            <ChartEarningsAll class="col-span-1" />
            <img class="col-span-2 w-full" src="/image/charts/График выполненных заказов по времени.png" alt="Chart">
            <img class="col-span-2 w-full" src="/image/charts/Group9.png" alt="Chart">
        </div>
        <div class="col-span-1">
            <ChartProfile />
        </div>
    </div>
</template>

<script setup>
import ChartEarningsMonth from '@/widgets/ChartEarningsMonth.vue';
import ChartEarningsAll from '@/widgets/ChartEarningsAll.vue';
import ChartProfile from '@/widgets/ChartProfile.vue';
</script>