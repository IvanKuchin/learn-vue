<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal-content" :class="{
                                            'sale': theme === 'sale',
                                            'dark': theme === 'dark',
                                             }">
            <slot>default content</slot>
            <slot name="links"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        theme: String,
    },

    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    width: 500px;
    background-color: white;
    padding: 20px;
    margin: 100px auto;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
}

.actions {
    color: white;
    text-decoration: none;
    border: 1px solid white;
    border-radius: 6px;
    padding: 4px;
    margin: 0 5px;
}

p {
    font-style: normal;
}

.sale {
    background: crimson;
    color: white;
}


</style>
