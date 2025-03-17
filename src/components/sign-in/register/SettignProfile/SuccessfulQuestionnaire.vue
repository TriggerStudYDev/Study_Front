<template>
    <div class="flex flex-col items-center justify-between text-white min-h-[80dvh] mt-[3dvh]">
        <div class="flex flex-col items-center flex-grow">
            <h1 class="text-[40px] font-medium">🎉 Регистрация завершена!</h1>
            <span class="mt-2 text-xl text-center">Можешь пройти инструкцию или сразу начать пользоваться STUDY. <br>
                Выбирай,
                как удобнее!</span>
            <div class="flex items-center mt-12 gap-x-4">
                <img src="/image/auth/Stage 1.svg" alt="Stage 1">
                <img src="/image/auth/Stage 2.svg" alt="Stage 2">
                <img src="/image/auth/Stage 3.svg" alt="Stage 3">
            </div>
        </div>
        <div class="flex gap-x-8">
            <button class="px-8 py-3 text-xl font-medium text-white bg-AccentViolet rounded-xl">Показать
                инструкцию</button>
            <button @click="$router.push({ name: 'home' })"
                class="px-16 py-3 text-xl font-medium bg-white rounded-xl text-AccentViolet">Я сам всё освою!</button>
        </div>
    </div>
</template>