<template>
    <div class="default-combobox" @click="toggleCombobox" @keydown.enter.stop="selectItem" @keyup.down="keyDown"
        @keyup.up="keyUp" v-outside="hideCbb">
        <span :class="iconClass"></span>

        <input min="1" :class="customClass" :tabindex="tab" :type="customType" :id="customId" v-model="dataValue"
            :placeholder="customPlaceholder" @change="onInput" @input="onInput" />

        <div class="up-down">
            <div class="up">
                <div @click="increaseData" class="icon-up-bold"></div>
            </div>
            <div class="down">
                <div @click="decreaseData" class=" icon-down-bold"></div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    name: "MISACombobox",
    props: {
        customType: {
            type: String
        },
        iconClass: {
            type: String
        },
        customId: {
            type: String
        },
        customClass: {
            type: String
        },
        customPlaceholder: {
            type: String
        },
        tab: {
            type: String
        },
        modelValue: {
            type: [String, Number]
        }
    },
    created() {
        this.dataValue = this.modelValue
    },
    watch: {
        modelValue: function () {
            this.dataValue = this.modelValue
        }
    },

    methods: {
        /**
         * @description: Cập nhật giá trị input
         * @author: DDTung (03/07/2023)
         */
        onInput() {
            this.$emit("update:modelValue", this.dataValue)
        },
        /**
        * @description: Tăng giá trị input
        * @author: DDTung (03/07/2023)
        */
        increaseData() {
            this.dataValue = parseInt(this.dataValue) + 1;
            this.$emit("update:modelValue", this.dataValue)

        },
        /**
        * @description: Giảm giá trị input
        * @author: DDTung (03/07/2023)
        */
        decreaseData() {
            if (this.dataValue == 1) {
                return
            } else {
                this.dataValue = parseInt(this.dataValue) - 1;
                this.$emit("update:modelValue", this.dataValue)
            }
        },


    },
    data() {
        return {
            dataValue: ""
        }
    }
}
</script>

<style scoped>
.default-combobox {
    position: relative
}

.default-combobox input {
    margin-right: 11px
}

.default-combobox input::placeholder {
    font-size: 13px;
    font-weight: 400
}

.combobox-input {
    background-color: #fff;
    border-radius: 2.5px;
    border: 1px solid #afafaf;
    width: 60px;
    height: 25px;
    overflow: hidden;
}

.icon-filter {
    background: var(--icon-url) no-repeat -240px -65px
}

.up-down {

    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    right: 2px;
}

.icon-up-bold {
    background: var(--icon-url) no-repeat -20px -320px;
    width: 24px;
    height: 24px;
}

.icon-up-bold:hover,
.icon-down-bold:hover {
    cursor: pointer;
}

.icon-down-bold {
    background: var(--icon-url) no-repeat -64px -332px;
    width: 24px;
    height: 24px;
}
</style>