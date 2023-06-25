<template>
    <div v-if="isSelected"
        class="inventory__detail">
        <div class="inventory__detail__header">
            <div class="inventory__detail__header__close"
                @click="resetSelection" />
        </div>
        <div class="inventory__detail__body">
            <div class="inventory__detail__body__photo"></div>
            <div class="inventory__detail__body__divider"></div>
            <div class="inventory__detail__body__item__main"></div>
            <div class="inventory__detail__body__item__slave"></div>
            <div class="inventory__detail__body__item__slave"></div>
            <div class="inventory__detail__body__item__slave"></div>
            <div class="inventory__detail__body__item__slave"></div>
            <div class="inventory__detail__body__item__slave"></div>
            <div class="inventory__detail__body__item__slave"></div>
            <div class="inventory__detail__body__divider"></div>
            <div class="inventory__detail__body__remove" v-if="isCanRemove()"
                @click="remove">Удалить предмет</div>
            <div class="inventory__detail__body__footer" v-else>
                <input
                    ref="input"
                    type="text"
                    placeholder="Введите количество"
                    class="inventory__detail__body__footer__input" />
                <div class="inventory__detail__body__footer__btns">
                    <div class="inventory__detail__body__footer__btns__cancel"
                        @click="cancel">Отмена</div>
                    <div class="inventory__detail__body__footer__btns__accept"
                        @click="accept">Подтвердить</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
export default defineComponent({
    name: 'InventoryDetail',
    props: {
        items: Array
    },
    computed: {
        ...mapState(['selectedItem']),
        isSelected () {
            return this.selectedItem !== -1
        }
    },
    emits: [
        'accept',
        'remove'
    ],
    methods: {
        ...mapMutations(['RESET_SELECTION']),
        accept () {
            const count = this.$refs.input.value
            const isCountSet = count.length
            if (isCountSet) {
                this.$emit('accept', count)
            }
            this.resetSelection()
        },
        cancel () {
            this.resetSelection()
        },
        isCanRemove () {
            let count = -1
            const  isSelected = this.selectedItem > -1
            if (isSelected) {
                count = this.items[this.selectedItem].count
            }
            const result = count !== -1
            return result
        },
        resetSelection () {
            this.RESET_SELECTION()
        },
        remove () {
            this.$emit('remove')
            this.resetSelection()
        }
    }
})
</script>