

<template>
    <div> 
        <!-- <div>
            <vue-qrcode value="Hello, World!" :options="{ width: 400 }"></vue-qrcode>
        </div> -->

        <div class="h-screen flex w-full justify-center items-center">
            <div class="flex gap-3">
                <button class="py-2 px-6 text-white bg-blue-700 rounded-full"><router-link to="/login">Login</router-link></button>
                <button class="py-2 px-6 text-white bg-green-700 rounded-full"><router-link to="/register">Get QR Code</router-link></button>
            </div>
        </div>
    </div>
</template>