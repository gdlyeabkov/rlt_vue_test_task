<template>
    <div class="inventory">
        <div class="inventory__list">
            <div v-for="(item, i) in items.length"
                :key="i"
                :class="{'inventory__list__item': true,
                    'inventory__list__item__first': i === 0,
                    'inventory__list__item__first__last': i === items.length - 5,
                    'inventory__list__item__last__first': i === 4,
                    'inventory__list__item__last': i === items.length - 1}"
                :draggable="isFilled(i)"
                @dragstart="dragStartHandler($event, i)"
                @dragover="dragOverHandler"
                @drop="dragDropHandler($event, i)">
                <div v-if="isFilled(i)"
                    class="inventory__list__item__content"
                    @click="select(i)">
                    <div class="inventory__list__item__content__preview"></div>
                    <div class="inventory__list__item__content__counter">
                        <p class="inventory__list__item__content__counter__content">{{items[i].count}}</p>
                    </div>
                </div>
                <div
                    v-else
                    class="inventory__list__item__uploader"
                    @click="add(i)" />
            </div>
        </div>
        <InventoryDetail
            :items="items"
            @remove="remove"
            @accept="acceptItem" />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import InventoryDetail from './InventoryDetail.vue'
import { mapState, mapMutations } from 'vuex'
import { ref, Ref } from 'vue'


export default defineComponent({
    setup () {
        const items = ref([])
        const draggableData = ref({
            count: '',
            index: -1
        })
        return {
            items,
            draggableData
        }
    },
    computed: {
        ...mapState(['selectedItem']),
        isSelected () {
            return this.selectedItem !== -1
        }
    },
    methods: {
        ...mapMutations(['SELECT']),
        isFilled (i) {
            const item = this.items[i]
            const count = item.count
            return count !== -1
        },
        dragStartHandler (event, i) {
            const target = event.target
            const count = target.textContent
            this.draggableData = {
                count,
                index: i
            }
        },
        dragOverHandler (event) {
            event.preventDefault()
        },
        dragDropHandler (event, i) {
            event.preventDefault()
            const startDraggableItemIndex = this.draggableData.index
            const isSamePos = i === startDraggableItemIndex
            if (isSamePos) {
                return
            }
            this.items[i].count = Number.parseInt(this.draggableData.count)
            this.items[startDraggableItemIndex].count = -1
        },
        acceptItem (e) {
            this.accept(e)
        },
        accept (count) {
            this.items[this.selectedItem].count = count
            this.resetSelection()
        },
        cancel () {
            this.resetSelection()
        },
        remove () {
            this.items[this.selectedItem].count = -1
            this.resetSelection()
        },
        add (i) {
            this.select(i)
        },
        select (i) {
            this.SELECT({
                index: i
            })
        },
        resetSelection () {
            this.selectedItem = -1
        }
    },
    mounted () {
        const itemInitData = {
            count: -1
        }
        for (let i = 0; i < 25; i++) {
            this.items.push(itemInitData)
        }
        const json = localStorage.getItem('inventory')
        if (json) {
            this.items = JSON.parse(json)
        }
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
            event.returnValue = ''
            const json = JSON.stringify(this.items)
            localStorage.setItem('inventory', json)
        })
    },
    components: {
        InventoryDetail
    }
})
</script>
<style lang="scss">
.inventory {
    margin: 25px;
    border-radius: 12px;
    width: 525px;
    height: 500px;
    border-radius: 12px;
    border: 1px solid #4D4D4D;
    display: flex;
    flex-direction: row;
    &__list {
        gap: 0px;
        columns: 5;
        &__item {
            user-select: none;
            border: 1px solid #4D4D4D;
            width: 105px;
            height: 100px;
            box-sizing: border-box;
            cursor: pointer;
            &__selected, &:hover {
                background-color: #2F2F2F;
            }
            &__first {
                border-top-left-radius: 12px;
            }
            &__first__last {
                border-top-right-radius: 12px;
            }
            &__last__first {
                border-bottom-left-radius: 12px;
            }
            &__last {
                border-bottom-right-radius: 12px;
            }

            &__content {
                display: flex;
                flex-direction: column;
                justify-content: end;
                align-items: center;
                width: 100%;
                height: 100%;
                &__preview {
                    width: 54px;
                    height: 54px;
                    background-image: url('../assets/Item\ Image.png');
                    background-size: 100% 100%;
                    &:active {
                        -webkit-animation-name: pulse;
                        -webkit-animation-duration: 0.3s;
                        -webkit-animation-iteration-count: infinite;
                        -webkit-animation-direction: alternate-reverse;
                        -moz-animation-name: pulse;
                        -moz-animation-duration: 0.3s;
                        -moz-animation-iteration-count: infinite;
                        -moz-animation-direction: alternate-reverse;
                        -o-animation-name: pulse;
                        -o-animation-duration: 0.3s;
                        -o-animation-iteration-count: infinite;
                        -o-animation-direction: alternate-reverse;
                        -ms-animation-name: pulse;
                        -ms-animation-duration: 0.3s;
                        -ms-animation-iteration-count: infinite;
                        -ms-animation-direction: alternate-reverse;
                        animation-name: pulse;
                        animation-duration: 0.3s;
                        animation-iteration-count: infinite;
                        animation-direction: alternate-reverse;
                    }
                }
                &__counter {
                    border: 1px solid #4D4D4D;
                    border-top-left-radius: 12px;
                    width: 16px;
                    height: 16px;
                    align-self: end;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    &__content {
                        font-size: 7;
                        font-weight: 500;
                        color: #fff;
                        width: 8px;
                        height: 12px;
                    }
                }
            }
            &__uploader {
                width: 100%;
                height: 100%;
            }

        }
    }
    &__detail {
        display: block;
        min-width: 250px;
        height: 100px;
        height: 100%;
        background: #262626;
        position: relative;
        left: -250px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        border: 1px solid #4D4D4D;    
        box-sizing: border-box;
        &__header {
            display: flex;
            justify-content: end;
            &__close {
                width: 12px;
                height: 12px;
                background-image: url('../assets/close.svg');
                margin: 14px;
                cursor: pointer;
            }
        }
        &__body {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: calc(100% - 40px);
            &__photo {
                align-self: center;
                width: 130px;
                height: 130px;
                background-image: url('../assets/Item\ Image.png');
                background-size: 100% 100%;
            }
            &__divider {
                height: 1px;
                background-color: #3C3C3C;
                border-radius: 4px;
                margin: 12px;
            }
            &__item__main {
                height: 30px;
                background-color: #3C3C3C;
                border-radius: 8px;
                margin: 12px;
            }
            &__item__slave {
                height: 10px;
                background-color: #3C3C3C;
                border-radius: 4px;
                margin: 8px;
            }
            &__remove {
                align-self: center;
                border-radius: 8px;
                width: 220px;
                height: 39px;
                background-color: #FF8888;
                cursor: pointer;
                font-weight: 400;
                font-size: 14;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &__remove:hover {
                background-color: red;
            }
            &__footer {
                display: flex;
                flex-direction: column;
                height: 133px;
                &__input {
                    align-self: center;
                    background: transparent;
                    color: #FFF;
                    border: none;
                    width: 210px;
                    height: 40px;
                }
                &__btns {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    &__cancel {
                        align-self: center;
                        border-radius: 8px;
                        width: 88px;
                        height: 39px;
                        background-color: #fff;
                        cursor: pointer;
                        font-weight: 400;
                        font-size: 14;
                        display: flex;
                        justify-content: center;
                        align-items: center;    
                    }
                    &__accept {
                        align-self: center;
                        border-radius: 8px;
                        width: 112px;
                        height: 39px;
                        background-color: #FF8888;
                        cursor: pointer;
                        font-weight: 400;
                        font-size: 14;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
}
@keyframes pulse {
  from {
    transform: scale(1.0);
  }

  to {
    transform: scale(0.8);
  }
}
</style>