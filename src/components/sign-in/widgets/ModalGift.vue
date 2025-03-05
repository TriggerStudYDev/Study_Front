<template>
    <div class="fixed inset-0">
        <div class="bg-white px-6 py-12 rounded-2xl max-w-[510px] mx-auto mt-[20vh] w-full relative slide-up">
            <button @click="$emit('close-modal')" class="absolute top-4 right-4"><img src="/image/auth/Close_MD.svg"
                    alt="Close"></button>
            <div>
                <h4 class="text-PrimaryDark text-2xl font-semibold">🎁 Подарок от друга!</h4>
                <p class="text-LightDark mt-1">Зарегистрируйся по ссылке друга и получи от 300 бонусов на счёт! Это твой
                    шанс
                    начать с приятного
                    бонуса
                </p>
            </div>
            <div class="mt-8">
                <h4 class="text-xl text-PrimaryDark font-semibold">Что можно сделать?</h4>
                <ol class="list-decimal text-LightDark mt-2 ml-4">
                    <li>Перейди по ссылке — получи её от друга.</li>
                    <li>Зарегистрируйся — это займёт пару минут.</li>
                    <li>Получи бонусы — от 300 единиц, которые можно потратить на заказы или вывести.</li>
                </ol>
            </div>
            <button @click="$emit('close-modal')"
                class="mt-8 w-full py-3 bg-AccentViolet text-white text-xl font-medium rounded-xl">
                Круто
            </button>
        </div>
    </div>
</template>

<style scoped>
@keyframes slideUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-up {
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

.fixed {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>