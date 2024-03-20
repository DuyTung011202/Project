<template>
  <div id="form">
    <div class="form">
      <div class="form-header">
        <h3>Sửa tài sản</h3>
        <div class="icon icon-close" @click="handleCloseForm"></div>
      </div>
      <div class="form-body">
        <div class="row-input">
          <div class="row-input-left">
            <label for="product-code">{{ formInfo.fixed_asset_code }}
              <span>*</span>
            </label>
            <br />
            <MISAInput v-model="product.ProductsCode" customType="text" customPlaceholder="Nhập mã tài sản"
              customId="product-code" :error="inValidErrors" tab="1"
              :customClass="inValidErrors.ProductsCode ? 'border-danger' : ''" />
            <span v-if="inValidErrors.ProductsCode" class="text-danger"> <span>{{ formInfo.fixed_asset_code }}</span>{{
              inValidErrors.ProductsCode }}</span>


          </div>
          <div class="row-input-right">
            <label for="product-name">{{ formInfo.fixed_asset_name }}
              <span>*</span>
            </label>
            <br />
            <MISAInput v-model="product.ProductsName" customType="text" customPlaceholder="Nhập tên tài sản"
              customId="product-name" tab="2" :customClass="inValidErrors.ProductsName ? 'border-danger' : ''" />
            <span v-if="inValidErrors.ProductsName" class="text-danger"> <span>{{ formInfo.fixed_asset_name }}</span>{{
              inValidErrors.ProductsName }}</span>

          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <label for="department-code">{{ formInfo.department_code }} <span>*</span></label>
            <br />
            <MISACombobox :api="fixedAsset.departmentURL" v-model="product.DepartmentCode" propText="DepartmentCode"
              propValue="DepartmentId" customType="text" customPlaceholder="Nhập mã bộ phận sử dụng"
              customId="department-code" tab="3" />




          </div>
          <div class="row-input-right">
            <label for="department-name">{{ formInfo.department_name }}</label>
            <br />
            <MISAInput v-model="product.ProductsDepartment" readonly customType="text" customId="department-name" />

          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <label for="product-type-code">{{ formInfo.fixed_asset_category_code }} <span>*</span></label>
            <br />
            <MISACombobox :api="fixedAsset.departmentURL" tab="4" propText="DepartmentCode" propValue="DepartmentId"
              v-model="product.DepartmentCode" customType="text" customPlaceholder="Chọn mã loại tài sản"
              customId="product-type-code" />
          </div>
          <div class="row-input-right">
            <label for="product-type-name">{{ formInfo.fixed_asset_category_name }}</label>
            <br />
            <MISAInput v-model="product.ProductsType" readonly customType="text" customId="product-type-name" />
          </div>
        </div>
        <div class="row-input-cl3">
          <div class="item-input-cl3">
            <label for="product-quantity">{{ formInfo.quantity }} <span>*</span></label>
            <br />
            <MISAComboboxDropdown v-model="product.ProductsQuantity" tab="5" customType="number"
              customClass="no-spinners text-end" customId="product-quantity" />

          </div>
          <div class="item-input-cl3">
            <label for="product-price">{{ formInfo.cost }} <span>*</span></label>
            <br />
            <MISAInput :formatCost="formatCost" tab="6" :inputNumber="inputEnterNumber" enableKeypress customType="text"
              v-model="product.ProductsPrice" customClass=" text-end" customId="product-price" />

          </div>
          <div class="item-input-cl3">
            <label for="life-time">{{ formInfo.life_time }} <span>*</span></label>
            <br />
            <MISAInput customType="number" tab="7" v-model="fixedAsset.life_time"
              customClass="no-spinners item-input text-end" customId="life-time" />
          </div>
        </div>
        <div class="row-input-cl3">
          <div class="item-input-cl3">
            <label for="product-depreciation-rate">{{ formInfo.depreciation_rate }} <span>*</span></label>
            <br />
            <MISAComboboxDropdown v-model="fixedAsset.depreciation_rate" customClass="no-spinners text-end"
              customId="product-depreciation-rate" tab="8" customType="number" :min="fixedAsset.depreciation_rate" />
          </div>
          <div class="item-input-cl3">
            <label for="product-depreciation-value">{{ formInfo.depreciation_value }} <span>*</span></label>
            <br />
            <MISAInput :inputNumber="inputEnterNumber" tab="9" enableKeypress customType="text"
              v-model="product.ProductsDepreciation" customClass="text-end" customId="product-depreciation-value" />

          </div>

          <div class="item-input-cl3">
            <label for="year-tracking">{{ formInfo.production_year }}</label>
            <br />
            <MISAInput readonly customClass="text-end" id="year-tracking" v-model="fixedAsset.production_year" />

          </div>
        </div>
        <div class="row-input-end">
          <div class="item-input-cl3">
            <label for="purchase-date">{{ formInfo.purchase_date }}</label>
            <br />
            <ElDatePicker v-model="fixedAsset.perchase_date" tabindex="10" type="date" :placeholder="dateConfig.Format"
              :format="dateConfig.Format"></ElDatePicker>

          </div>
          <div class="item-input-cl3">
            <label for="used-date">{{ formInfo.used_date }}</label>
            <br />
            <ElDatePicker v-model="fixedAsset.used_date" tabindex="11" type="date" :placeholder="dateConfig.Format"
              :format="dateConfig.Format"></ElDatePicker>

          </div>
        </div>

      </div>
      <div class="form-footer">
        <MISAButton :text="formInfo.btnSave" class="btn-save btn--primary text-white" @click="btnSaveOnClick" tab="12">
        </MISAButton>
        <MISAButton :text="formInfo.btnCancel" class="btn--primary btn-cancel " @click="handleCloseForm" tab="13">
        </MISAButton>
      </div>
      <MISALoading v-if="isLoading"></MISALoading>
    </div>

  </div>
</template>

<script>
import { Form } from "../../../js/common/form.js"
import { DateConfig } from "../../../js/common/config.js";
import MISAFunction from "../../../js/common/function";
import { departmentURL } from "@/js/common/urlAsset";
import axios from "axios";
export default {
  name: "MISAForm",
  props: {
    productEdit: {
      type: Object
    }
  },
  created() {
    this.product = this.productEdit;
    this.setFocusFirstInput();
  },
  computed: {
    formMode() {
      if (this.productEdit.ProductsId) {
        return 1;
      } else {
        return 0;
      }
    },

  },

  methods: {
    /**
     * @description: Đóng form
     * @author: DDT(26/06/2023)
     */
    handleCloseForm() {
      this.$emit("close-form");
    },

    /**
   * @description: format tiền
   * @author: DDT(26/06/2023)
   */
    formatCost() {
      this.product.ProductsPrice = this.formatMoney(this.product.ProductsPrice);
      this.product.ProductsDepreciation = (this.formatMoney(parseInt(
        this.convertMoneyToNum(this.product.ProductsPrice) *
        this.fixedAsset.depreciation_rate
      ) / 100));

    },
    /**
     * @description: Chuyển tiền thành số
     * @param {*} data 
     * @author: DDTung (04/07/2023)
     */
    convertMoneyToNum(data) {
      return MISAFunction.convertMoneyToNum(data);
    },
    /**
       * @description: format tiền
       * @author: DDTung (03/07/2023)
       */
    formatMoney(money) {
      return MISAFunction.formatMoney(money);
    },
    /**
       * @description: hàm chỉ cho nhập số
       * @author: DDTung (03/07/2023)
       */
    inputEnterNumber(evt) {
      return MISAFunction.inputEnterNumber(evt);
    },

    /**
    * @description: hàm validate data
    * @author: DDTung (10/07/2023)
    */
    onValidateData() {
      this.inValidErrors = {};
      if (
        this.product.ProductsCode == "" ||
        this.product.ProductsCode == null
      ) {
        this.inValidErrors.ProductsCode = this.$_MISAResource[this.$_LANG_CODE].ProductInValidError.Empty
      }
      if (
        this.product.ProductsName == "" ||
        this.product.ProductsName == null
      ) {
        this.inValidErrors.ProductsName = this.$_MISAResource[this.$_LANG_CODE].ProductInValidError.Empty
      }
    },
    /**
    * @description: hàm sự kiện khi ấn lưu
    * @author: DDTung (10/07/2023)
    */
    async btnSaveOnClick() {
      try {
        // validate dữ liệu:
        this.onValidateData();
        // Dữ liệu đã hợp lệ thì gọi api thực hiện cất dữ liệu:
        if (Object.keys(this.inValidErrors).length === 0) {
          if (this.formMode == this.$_MISAEnum.FORM_MODE.ADD) {
            this.isLoading = true;
            await axios.post("https://64798739a455e257fa6347c2.mockapi.io/users", this.product);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            this.isLoading = false;
            this.handleCloseForm();
            window.location.reload();
          } else {
            await axios.put(`https://64798739a455e257fa6347c2.mockapi.io/users/${this.product.ProductsId}`, this.product);
            this.handleCloseForm();
            window.location.reload();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
    * @description: focus vào ô đầu tiên
    * @author: DDTung (16/07/2023)
    */
    setFocusFirstInput() {
      this.$nextTick(function () {
        this.$el.querySelector('input[tabindex = "1"]').focus();
      });
    },
  },
  data() {
    return {
      formInfo: Form,
      dateConfig: DateConfig,
      counter: 1,
      product: {},
      isLoading: false,
      fixedAsset: {
        departmentURL: departmentURL,
        department_code: "",
        department_id: "",
        depreciation_rate: 1,
        perchase_date: new Date(Date.now()),
        used_date: new Date(Date.now()),
        production_year: new Date().getFullYear(),

      },
      inValidErrors: {},

    }
  },
}
</script>

<style  >
.form,
.form .cancel {
  background-color: #fff
}

#form {
  background-color: rgba(0, 0, 0, .2);
  z-index: 2000;
  width: 100%;
  height: 100%;
  margin: auto;
  position: fixed;
  display: flex;
  top: 0;
  left: 0
}

.form {
  width: fit-content;
  height: fit-content;
  margin: 25px auto;
  border-radius: 5px;
  position: relative;
}

.form-footer,
.form-header {
  display: flex;
  height: 52px;
  box-sizing: border-box
}

.form-header {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0
}

.form-body {
  padding: 0 16px 20px;
}

label span {
  color: red
}

.row-input {
  display: flex;
  justify-content: space-between;
  margin: 20px 0
}



.item-input-cl3,
.row-input-left {
  position: relative
}

.row-input-end .item-input-cl3 {
  margin-right: 16px;
}

.row-input-left input {
  width: 260px;
  margin-right: 0 !important;
  padding: 0 14px !important
}

.row-input-right input {
  width: 536px;
  padding: 0 14px !important;
  margin-right: 0 !important
}

.row-input-cl3 input,
.row-input-end input {
  padding: 0 14px !important;
  margin-right: 0 !important;
  width: 260px
}

#product-quantity,
#product-depreciation-rate {
  padding: 0 36px !important;
  margin-right: 0 !important;
  width: 260px
}

.form input {
  padding: 0 36px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #afafaf;
  height: 36px;
  box-sizing: border-box
}

.row-input-right {
  margin-left: 16px
}

.form input::placeholder {
  font-style: italic
}

input {
  outline-color: #1aa4c8;
  outline-offset: 1px
}

.row-input-cl3 {
  display: flex;
  justify-content: space-between;
  margin: 20px 0
}


.row-input-end {
  display: flex
}



.row-input-end label {

  margin-bottom: 8px;
}

.form-footer {
  flex-direction: row-reverse;
  align-items: end;
  background-color: #edeaff;
  border-radius: 3px;
  padding: 16px 16px;
  align-items: center
}

.form-footer button {
  height: 36px;
  min-width: 100px;
  border: none;
  border-radius: 3px;
  outline: 0
}

.form .cancel {
  margin-right: 10px
}

.form .icon-close {
  text-align: center
}

.form .icon-close:hover {
  opacity: .5
}


.row-input-left .icon-down-bold {
  position: absolute;
  bottom: 14px;
  right: 16px
}

.form .v-combobox {
  margin-right: 0 !important;
}

.form .v-combobox__body {
  width: 260px !important;
  border-radius: 4px !important;

}

.form .v-combobox__selected {
  border: 1px solid #afafaf !important;
  border-radius: 4px !important;
}

.form .v-combobox__focus {
  border: 1px solid #1aa4c8 !important;
}

.v-combobox__body input {
  margin-top: 0px;
  padding: 0 !important;
}

.form .v-combobox__icon[data-v-fdaf08aa] {
  background: var(--icon-url) no-repeat -64px -320px;
}

.form .v-select__list {
  top: 100%;
  min-height: 200px;
}

input:read-only {
  background-color: #edeaff;
  outline: 0
}





.icon-close {
  background: var(--icon-url) no-repeat -375px -287px
}

.form .icon-down-bold {
  top: 55%;
  right: 2px !important
}

.form .icon-updown-bold {
  background: var(--icon-url) no-repeat -196px -325px;
  top: 55%;
  right: 2px !important
}

.el-date-editor.el-input {
  width: 100% !important;
  height: 36px !important;
  font-size: 13px;
}

.el-input__wrapper {
  border-radius: 3px !important;
  border: 1px solid #afafaf;
  height: 36px;
  width: 260px;
  overflow: hidden;
  box-shadow: none !important;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 1px 0;
  box-sizing: border-box;

}

.el-input__inner {
  border: none !important;
  margin-bottom: 8px;
}

input:hover,
.item-input:hover,
.el-input__wrapper:hover {
  border-color: #1aa4c8;
  outline-color: #1aa4c8;
}

.el-input__inner:focus {
  outline: 1px !important;
}

.el-input__wrapper.is-focus,
.el-input__wrapper:focus {
  outline: 1px solid #1aa4c8 !important;
  border-color: #1aa4c8;
}

input:focus,
.item-input:focus {
  outline-color: #1aa4c8;
  outline-style: hidden
}

.border-red .el-input__wrapper {
  border-color: #e03232 !important;
}

input#el-id-7454-3::placeholder {
  color: #646060;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
}

.el-input__inner {
  color: #001031 !important;
}

.el-input__wrapper svg {
  color: #646060;
  display: none;
}

.el-input__icon {
  background: url("../../../assets/img/qlts-icon.svg") no-repeat -287px -67px !important;
  width: 18px !important;
  height: 18px !important;
}

.form-input .el-input__inner::placeholder {
  font-family: "Roboto", sans-serif;
  color: #646060;
}

.el-date-editor.el-input .el-input__wrapper:hover .el-input__suffix {
  display: none;
}

.el-icon {
  font-size: 15px !important;
}

.el-picker-panel__content table tr {
  border: none;
}

.el-picker-panel__content table tbody tr:hover {
  background-color: #fff;
}

.el-picker-panel__content table th {
  text-align: center;
}

.el-picker-panel__content table th:first-child,
.el-picker-panel__content table td:first-child,
.el-picker-panel__content table th:last-child,
.el-picker-panel__content table td:last-child {
  padding: 5px;
}

.form-input .el-input.is-disabled .el-input__wrapper {
  background-color: #f5f5f5;
}

.form-input {
  margin-top: 8px;
}

.error {
  position: absolute;
  top: calc(81% + 1px);
  left: 0;
  color: #e03232;
  white-space: nowrap;
  font-size: 11px;
}

.border-red {
  border-color: #e03232 !important;
}



.el-input .el-input--prefix .el-input--suffix .el-date-editor .el-date-editor--date .el-tooltip__trigger .el-tooltip__trigger {
  border: 0px solid transparent !important;
}

.form .btn--primary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100px;
}

.btn-cancel {
  background-color: #fff !important;
  color: black;
  margin-right: 10px;
}

.btn-cancel:hover {
  background-color: #dddddd !important;
}


.form .lds-dual-ring[data-v-5f38b7f1] {
  width: 100%;
  height: 100%;
  background-color: #ffffff79 !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form .lds-dual-ring[data-v-5f38b7f1]:after {
  border-color: #1aa4c8 transparent #1aa4c8 transparent;
}
</style>
