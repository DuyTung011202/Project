<template>
    <div class="content__input">
        <span :class="iconClass"></span>
        <input :min="min" v-model="dataValue" @input="currentInputHandler" :readonly="readonly" :class="customClass"
            :placeholder="customPlaceholder" :type="customType" :id="customId"
            @keypress="enableKeypress && inputNumber($event)" :tabindex="tab" />
    </div>
</template>

<script>
export default {
    name: "MISAInput",
    props: {
        iconClass: {
            type: String,
        },
        customType: {
            type: String,
        },
        customId: {
            type: String,
        },
        readonly: {
            type: Boolean,
        },
        customClass: {
            type: String,
        },
        customPlaceholder: {
            type: String,
        },

        formatCost: {
            type: Function,
        },
        inputNumber: {
            type: Function,
        },
        min: {
            type: Number,
        },
        enableKeypress: {
            type: Boolean,
        },
        tab: {
            type: String,
        },

        modelValue: {
            type: [String, Number]
        },
        error: {
            type: Object,
        },


    },
    created() {
        this.dataValue = this.modelValue
    },
    computed: {
        currentInputHandler() {
            return this.formatCost ? this.handleInput : this.onInput;
        }
    },

    watch: {
        modelValue: function (newValue) {
            console.log("modelValue: " + newValue);
            this.dataValue = this.modelValue
        }
    },
    methods: {
        /**
         * @description: update input value
         * @author: DDTung (03/07/2023)
         */
        onInput() {
            this.$emit("update:modelValue", this.dataValue)
        },
        handleInput() {
            this.onInput()
            this.formatCost()
        }
    },
    data() {
        return {
            dataValue: "",
        }
    },
}
</script>


<style  >
.default-input {
    background-color: #fff;
    border-radius: 2.5px;
    border: 1px solid #afafaf;
    width: 180px;
    height: 35px;
    overflow: hidden;
    padding-left: 38px;
}

.default-input:focus {
    border-color: var(--primary-color);
}

.content__input input::placeholder {
    font-size: 13px;
    font-style: italic
}

.content__input {
    position: relative
}

.content__input input {
    padding: 0 36px;
    margin-right: 11px
}

.input-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    left: 8px
}

.icon-search {
    background: var(--icon-url) no-repeat -240px -20px
}
</style>