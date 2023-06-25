<template>
    <div></div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.bottomSheet {
    height: 72px;
    background-color: transparent;
    border: 1px solid #4D4D4D;
    border-radius: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 25px;
    &__plate {
        height: 36px;
        background-color: #3C3C3C;
        border-radius: 12px;
        margin: 18px;
        flex-grow: 0.9;
    }
    &__close {
        width: 12px;
        height: 12px;
        background-image: url('../assets/close.svg');
        margin: 14px;
        cursor: pointer;
    }
}
</style>