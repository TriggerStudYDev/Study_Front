<template>
    <div>
        <TheModalUser :user="user" />
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores';
import TheModalUser from '@/components/admin/modal/TheModalUser.vue';


const userStore = useUserStore();
const user = userStore.listUsers
</script>
