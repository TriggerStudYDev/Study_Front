<template>
    <div class="flex justify-between items-center">
        <h1 class="text-4xl font-semibold text-white">LOGO</h1>
        <button @click="$emit('open-modal')"
            class="flex items-center gap-x-2 px-8 py-3 bg-AccentGreen rounded-xl text-xl font-medium"><img
                src="/image/auth/Gift.svg" alt="Gift">Подарок от
            дурга</button>
    </div>
</template>