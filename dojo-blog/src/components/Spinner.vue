<template>
    <div class="spin"></div>
</template>

<style scoped>
.spin {
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #ff8800;
    /* border-top: 16px solid #3498db; */
    width: 40px;
    height: 40px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 1s ease infinite;
    margin: 30px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>