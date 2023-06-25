<template>
    <div></div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.preview {
    min-width: 236px;
    min-height: 500px;
    border-radius: 12px;
    border: 1px solid #4D4D4D;
    margin: 25px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    padding: 15px;
    &__img {
        -webkit-filter: blur(8px);
        border-radius: 8px;
        align-self: center;
        background: red;
        background-image: url('../assets/Img\ Blur.png');
        width: 208px;
        height: 240px;
    }
    &__item {
        background-color: #3C3C3C;
        margin: 12px;
        &__main {
            height: 26px;
            border-radius: 8px;
        }
        &__slave {
            height: 10px;
            border-radius: 4px;
        }
    }
}
</style>