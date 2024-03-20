<template>
    <div class="v-combobox">
        <div class="v-combobox__label" v-if="label">
            <label @click="showListData(); $refs.input.focus()">{{ label }} <span v-if="required">*</span>
            </label>
        </div>
        <div class="v-combobox__body">
            <div class="v-combobox__selected" :class="[{ error: error }, { 'v-combobox__focus': isShowListData }]"
                :style="style" :data-error="`${!isShowListData && error ? errorMess : ''}`"
                :tooltip="`${!isShowListData && error ? errorMess : ''}`">
                <span :class="iconClass"></span>
                <input ref="input" type="text" v-model="textInput" @click="showListData" :placeholder="placeholder"
                    :disabled="selectBox" @focus="showListData" @blur="hideListData" @keydown="selecItemUpDown"
                    :tabindex="tab" />
                <div class="v-combobox__icon" tabindex="-1" @click="showListData" @blur="hideListData"
                    @keydown="selecItemUpDown">
                    <div
                        :class="['ms-16 ms-icon', { 'ms-icon-arrow-down-black': !isShowListData, 'ms-icon-arrow-up-black': isShowListData }]">
                    </div>
                </div>
            </div>
            <transition name="slide-fade">
                <div class="v-select__list" v-if="isShowListData" tabindex="-1" @keydown="selecItemUpDown"
                    :style="[position === 'top' ? { bottom: '100%' } : {}]" ref="combobox__data">
                    <div v-if="filterData.length === 0" class="v-select__items">
                        Không tìm thấy kết quả
                    </div>
                    <div v-else class="v-select__items" v-for="(option, index) of filterData" :key="index"
                        @click="onHandleSelected(option, index)"
                        :class="[{ 'v-select__hover': index == indexItemFocus }, { 'v-select__focus': option[propKey] === keyItemSelected }]">
                        <slot name="item" :option="option" :index="index">
                            {{ option[propValue] }}
                        </slot>
                        <div v-if="!selectBox" :class="{ 'v-select__items--checked': option[propKey] === keyItemSelected }">
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { removeVietnameseTones } from '../../../js/common/function.js'
import Validate from '../../../js/common/validate.js';
import axios from 'axios';
import Enum from '../../../js/common/enum.js';
const keycode = Enum.KEY_CODE;
export default {
    name: "MISACombobox",
    props: {
        data: { // Danh sách dữ liệu
            type: Array,
            required: false
        },
        placeholder: { // Placeholder của input
            type: String,
            required: false,
            default: "",
        },
        position: { // Vị trí hiển thị danh sách dữ liệu
            type: String,
            required: false,
            default: "top",
        },
        label: { // Label của combobox
            type: String,
            required: false,
            default: null,
        },
        required: { // Bắt buộc nhập
            type: Boolean,
            required: false,
            default: false,
        },
        selectBox: { // Nếu là select box thì không cho gõ text
            type: Boolean,
            required: false,
            default: false,
        },
        modelValue: { // Giá trị của combobox
            required: false,
            default: null,
        },
        propKey: { // Key của dữ liệu
            required: false,
            default: "key",
        },
        propValue: { // Value của dữ liệu
            required: false,
            default: "value",
        },
        styleProps: { // Style của combobox
            type: Array,
            required: false,
            default: () => [],
        },
        propApi: { // Nếu có api thì lấy dữ liệu từ api
            type: String,
            required: false,
            default: null,
        },
        errorLabel: { // Hiển thị lỗi
            required: false,
        },
        isSubmit: { // Kiểm tra khi submit form
            required: false,
            default: false,
        },
        iconClass: {
            type: String // Class icon nếu có
        },
        tab: {  // tabindex
            type: String
        }
    },
    computed: {
        /**
         * @description: Tạo style cho combobox
         * Author: DDTung 11/07/2023
         */
        style() {
            let styleProps = {};
            if (this.styleProps.length > 0) {
                this.styleProps.forEach((item) => {
                    const key = item.split(":")[0];
                    const value = item.split(":")[1];
                    styleProps[key] = value;
                });
                return styleProps;
            } else {
                return {};
            }
        },
    },
    data() {
        return {
            isShowListData: false, // Hiển thị danh sách dữ liệu
            indexItemFocus: 0, // index của item được focus
            indexItemSelected: -1, // index của item được chọn
            keyItemSelected: this.modelValue,
            textInput: this.textInput,
            dataApi: [], // dữ liệu lấy từ api
            filterData: [], // dữ liệu lọc
            error: false, // Hiển thị lỗi
            errorMess: "", // Nội dung lỗi
        };
    },
    watch: {
        /**
         * @description: Khi thay đổi text thì sẽ tìm kiếm dữ liệu theo text
         * Author: DDTung 11/07/2023
         */
        textInput: {
            handler: function (value) {
                const self = this;
                self.filterData = self.dataApi.filter((option) =>
                    removeVietnameseTones(option[self.propValue])
                        .toLowerCase()
                        .includes(removeVietnameseTones(value).toLowerCase())
                );
                this.indexItemFocus = -1;
            },
            deep: true,
        },
        /**
         * @description: Khi bên component cha gọi tới submit thì validate lại dữ liệu trước khi submit
         * Author: DDTung 11/07/2023
         */
        isSubmit: { // nếu isSubmit là true thì validate
            handler(isSubmitted) {
                if (isSubmitted) {
                    if (this.validate() && self.error) {
                        this.$emit("update:isSubmit", false);
                    }
                }
            },
            deep: true,
        },
        /**
         * @description: Nếu data bên component cha thay đổi thì sẽ lấy dữ liệu mới
         * Author: DDTung 11/07/2023
         */
        data: {
            handler(newData) {
                this.dataApi = newData;
                this.filterData = newData;
                if (this.indexItemSelected !== -1) {
                    this.textInput = newData[this.indexItemSelected][this.propValue];
                }
            },
            deep: true,
        },
        /**
         * @description: Nếu modelValue bên component cha thay đổi thì sẽ reset lại combobox
         * Author: DDTung 11/07/2023
         */
        modelValue(newVal) {
            if (newVal === null) { // Nếu modelValue bằng null thì set textInput = "" và keyItemSelected = ""
                this.$refs.input.blur();
                this.resetCombobox();
            }
        },
    },
    methods: {
        /**
         * @description: Hàm này dùng để validate combobox xem có trống hay không
         * @param {String} giá trị của combobox
         * Author: DDTung 11/07/2023
         */
        // validate() {
        //     const self = this;
        //     if (self.required) {
        //         self.error = !Validate.isNullOrEmpty(self.keyItemSelected);
        //         if (self.error) {
        //             self.errorMess = self.$t("validate_error.required", [self.errorLabel]);
        //             return false;
        //         } else {
        //             self.errorMess = "";
        //             self.error = false;
        //         }
        //     }
        // },
        /**
         * @description: Hàm này dùng để hiển thị danh sách dữ liệu
         * Author: DDTung 11/07/2023
         */
        showListData() {
            const self = this;
            try {
                self.isShowListData = true; // Chuyển trạng thái hiển thị danh sách dữ liệu
                self.filterData = self.dataApi; // Gán dữ liệu đã lọc bằng dữ liệu từ api
                if (self.indexItemSelected > -1) {
                    self.$nextTick(() => { // Đợi DOM render xong thì mới scroll đến vị trí đã chọn
                        self.indexItemFocus = self.indexItemSelected;
                        const position = self.$refs['combobox__data'].children[self.indexItemSelected].offsetTop - self.$refs['combobox__data'].offsetTop;
                        self.$refs['combobox__data'].scrollTop = position;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để lấy dữ liệu khi click vào item hoặc nhấn enter
         * @param {Object} item - Dữ liệu của item được chọn
         * @param {Number} index - Index của item được chọn
         * Author: DDTung 11/07/2023
         */
        onHandleSelected(item, index) {
            const self = this;
            try {
                const value = item[self.propValue]; // Lấy giá trị của item được chọn
                self.textInput = value; // Gán giá trị cho textInput
                self.indexItemSelected = index; // Gán index của item được chọn
                self.indexItemFocus = index; // Gán index của item được focus
                self.keyItemSelected = item[self.propKey]; // Gán key của item được chọn
                self.$emit("update:modelValue", self.keyItemSelected); // Emit giá trị của item được chọn
                self.$emit("update:textInput", value); // Emit giá trị của text input
                self.isShowListData = false; // Hide list data
                // self.validate();
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để ẩn đi danh sách dữ liệu
         * Author: DDTung 11/07/2023
         */
        hideListData() {
            const self = this;
            if (!Validate.isNullOrEmpty(self.textInput)) { // Nếu textInput không rỗng thì emit giá trị của textInput là không có trong data
                self.$emit("update:modelValue", null);
                self.resetCombobox();
            }
            if (Validate.isNullOrEmpty(self.keyItemSelected)) { // Nếu keyItemSelected không rỗng thì emit giá trị của keyItemSelected là không có trong data
                self.onHandleSelected(self.dataApi[self.indexItemSelected], self.indexItemSelected);
            }
            // this.validate();
            self.isShowListData = false; // Hide list data
        },
        /**
         * @description: Hàm này dùng để chọn item khi nhấn phím mũi tên lên, xuống, enter, esc
         * Author: DDTung 11/07/2023
         */
        selecItemUpDown(event) {
            const self = this;
            const keyCodePress = event.keyCode; // Lấy mã phím được nhấn
            if (!self.isShowListData && (keyCodePress == keycode.ARROW_DOWN || keyCodePress == keycode.ARROW_UP)) {
                self.showListData();
                return;
            }
            if (self.isShowListData) {
                try {
                    switch (keyCodePress) {
                        case keycode.ENTER:
                            if (self.filterData.length > 0 && self.indexItemFocus !== -1) {
                                // lấy ra vị trí index của item được chọn trong danh sách dữ liệu
                                const index = self.dataApi.findIndex((item) => item[self.propValue] == self.filterData[self.indexItemFocus][self.propValue]);
                                self.onHandleSelected(self.filterData[self.indexItemFocus], index);
                            } else {
                                self.hideListData();
                            }
                            break;
                        case keycode.ARROW_DOWN:
                            self.indexItemFocus = self.indexItemFocus === self.filterData.length - 1 ? 0 : self.indexItemFocus + 1; // Focus vào item tiếp theo
                            self.handleScroll(self.indexItemFocus);
                            break;
                        case keycode.ARROW_UP:
                            self.indexItemFocus = self.indexItemFocus === 0 ? self.filterData.length - 1 : self.indexItemFocus - 1; // Focus vào item trước đó
                            self.handleScroll(self.indexItemFocus);
                            break;
                        case keycode.ESC:
                            self.hideListData(); // Ẩn danh sách dữ liệu
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        /**
         * @description: Hàm này dùng để xử lý thanh cuộn lên xuống khi focus vào item
         * Author: DDTung 11/07/2023
         */
        handleScroll(indexItemFocus) {
            const self = this;
            try {
                const position = self.$refs['combobox__data'].children[indexItemFocus].offsetTop - self.$refs['combobox__data'].offsetTop;
                self.$refs['combobox__data'].scrollTop = position;
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để reset lại combobox
         * Author: DDTung 11/07/2023
         */
        resetCombobox() {
            this.indexItemSelected = -1; // Reset lại index item được chọn
            this.indexItemFocus = 0; // Reset lại index item được focus
            this.keyItemSelected = null; // Reset lại key item được chọn
            this.textInput = ""; // Reset lại text input
            this.filterData = []; // Reset lại dữ liệu lọc
        },
    },
    /**
     * @description: Hook khởi tạo để gán giá trị vào combobox
     * Author: DDTung 11/07/2023
     */
    async created() {
        const self = this;
        try {
            if (self.propApi) { // Nếu có prop api thì gọi api lấy dữ liệu
                const response = await axios.get(self.propApi);
                self.dataApi = response.data;
                self.filterData = response.data;
            }
            if (self.data) { // Nếu có dữ liệu truyền từ component cha thì gán dữ liệu
                self.dataApi = self.data;
                self.filterData = self.data;
            }
            if (self.modelValue) { // Nếu có giá trị mặc định truyền từ component cha
                const index = self.dataApi.findIndex((item) => item[self.propKey] === self.modelValue); // Tìm index của item có key trùng với giá trị mặc định
                if (index !== -1) { // Nếu tồn tại item có key trùng với giá trị mặc định
                    self.onHandleSelected(self.dataApi[index], index); // Lấy dữ liệu của item được focus
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s;
}

.v-combobox__icon {
    background: var(--icon-url) no-repeat -62px -328px;
}

.v-select__list::-webkit-scrollbar {
    display: none;
}

.v {
    &-combobox {
        position: relative;
        margin-right: 11px;
    }

    &-combobx_show {
        border: 1px solid #1aa4c8;
    }

    &-combobox__label {
        label {
            cursor: pointer;
        }

        margin-bottom: 8px;

        span {
            color: red;
        }
    }

    &-combobox__body {
        width: 60px;
        text-align: left;
        position: relative;
        outline: none;
        box-sizing: border-box;
        border-radius: 2.5px;
        background-color: #fff;
    }

    &-combobox__selected {
        user-select: none;
        padding: 0 20px 0 10px;
        outline: none;
        min-height: 25px;
        color: #000;
        box-sizing: border-box;
        border: 1px solid grey;
        border-radius: 2.5px;
        background-color: #fff;
        display: flex;
        align-items: center;

        input {
            border: none;
            outline: none;
            padding: 0;
            background-color: transparent;
            overflow: hidden;
        }
    }

    &-combobox__focus {
        border: 1px solid #1aa4c8;
    }

    &-combobox__icon {
        top: 0;
        right: 0;
        position: absolute;
        min-width: 25px;
        cursor: pointer;
        bottom: 0;
        border-radius: 0 4px 4px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-select__list {
        color: #000;
        position: absolute;
        background-color: #fff;
        padding: 8px;
        bottom: 100%;
        left: 0;
        right: 0;
        z-index: 9999;
        max-height: 200px;
        overflow-y: auto;
        box-shadow: 0 0 10px rgba(23, 27, 42, 0.24);
    }

    &-select__items {
        padding: 0 4px;
        cursor: pointer;
        user-select: none;
        border-radius: 4px;
        min-height: 36px;
        line-height: 36px;
        position: relative;
        text-align: center;

        &:hover {
            background-color: #1aa5c88e;
        }

        &.itemFocus {
            background-color: grey;
        }
    }

    &-select__focus {
        background-color: #1aa4c8 !important;
        color: #fff !important;
    }
}
</style>