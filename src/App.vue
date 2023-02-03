<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <div class="bg-primary-100 text-white min-h-screen flex flex-col">
        <div class="shadow-lg uppercase">
            <nav class="flex">
                <RouterLink class="px-4 py-4 font-bold text-4xl" :to="{ name: 'home' }">Type<span class="text-secondary-100">Master</span></RouterLink>
                <div class="text-lg grow flex justify-center">
                    <RouterLink class="navitem" :to="{ name: 'home' }"><p>Home</p></RouterLink>
                    <RouterLink class="navitem" :to="{ name: 'play' }"><p>Play</p></RouterLink>
                </div>
            </nav>
        </div>
        <RouterView class="grow"/>
        <div class="flex justify-center bg-primary-200 py-8">
           <div class="text-center font-bold text-sm">
                <p>Copyright (c) Rdbo - 2023</p>
                <p>All rights reserved</p>
            </div>
        </div>
    </div>
</template>

<style>
.navitem {
    @apply px-2 mx-2 py-2 border-t-8 border-primary-100 basis-20 flex justify-center items-center hover:border-secondary-200 transition ease-in-out duration-200;
}

.navitem.router-link-active {
    @apply font-bold border-secondary-100;
}

.btn-primary {
    @apply text-lg uppercase font-bold border-4 border-white rounded-2xl transition ease-in-out duration-200;
}

.btn-primary:hover {
    @apply text-primary-100 bg-white;
}

</style>

