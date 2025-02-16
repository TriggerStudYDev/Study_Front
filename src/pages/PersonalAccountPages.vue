<template>
    <div>
        <HeaderPersonalAccount />
        <ChartCommunity class="mt-8" />
        <ChartAuction class="mt-8" />
    </div>
</template>

<script setup>
import HeaderPersonalAccount from '@/components/HeaderPersonalAccount.vue';
import ChartCommunity from '@/widgets/ChartCommunity.vue';
import ChartAuction from '@/widgets/ChartAuction.vue';
</script>