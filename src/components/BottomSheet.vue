<template>
    <div v-if="isShow"
        class="bottomSheet">
        <div class="bottomSheet__plate">
        </div>
        <div class="bottomSheet__close"
            @click="close">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, Ref } from 'vue'
export default defineComponent({
    name: 'BottomSheet',
    setup () {
        const isShow: Ref<boolean> = ref(true)
        return {
            isShow
        }
    },
    methods: {
        close () {
            this.isShow = false
        }
    }
})
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