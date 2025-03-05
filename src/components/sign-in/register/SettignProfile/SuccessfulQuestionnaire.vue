<template>
    <div class="flex flex-col items-center justify-between text-white min-h-[80dvh] mt-[3dvh]">
        <div class="flex flex-col items-center flex-grow">
            <h1 class="text-[40px] font-medium">🎉 Регистрация завершена!</h1>
            <span class="mt-2 text-xl text-center">Можешь пройти инструкцию или сразу начать пользоваться STUDY. <br>
                Выбирай,
                как удобнее!</span>
            <div class="flex gap-x-4 items-center mt-12">
                <img src="/image/auth/Stage 1.svg" alt="Stage 1">
                <img src="/image/auth/Stage 2.svg" alt="Stage 2">
                <img src="/image/auth/Stage 3.svg" alt="Stage 3">
            </div>
        </div>
        <div class="flex gap-x-8">
            <button class="bg-AccentViolet px-8 py-3 rounded-xl text-white font-medium text-xl">Как
                пользоваться?</button>
            <button @click="$router.push({ name: 'home' })"
                class="bg-white px-16 py-3 rounded-xl text-AccentViolet font-medium text-xl">На главную</button>
        </div>
    </div>
</template>