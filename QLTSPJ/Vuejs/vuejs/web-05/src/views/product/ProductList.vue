<template>
  <div class="main-header d-flex justify-content-between">
    <div class="l-main d-flex align-items-center">
      <MISAInput iconClass="input-icon icon-search" customClass="default-input" customPlaceholder="Tìm kiếm tài sản">
      </MISAInput>
      <MISACombobox iconClass="input-icon icon-filter" placeholder="Loại tài sản" :propApi="comboboxUrl"
        propKey="DepartmentIds" propValue="DepartmentCode">
      </MISACombobox>

      <MISACombobox iconClass="input-icon icon-filter" placeholder="Bộ phận sử dụng">
      </MISACombobox>

    </div>
    <div class="r-main d-flex align-items-center">
      <MISAButton customId="btn-add" customClass="btn--primary d-flex align-items-center" iconClass="btn--primary-icon"
        text="Thêm tài sản" @click="handleAddForm">
      </MISAButton>
      <MISAButton iconClass="btn--option"></MISAButton>
      <MISAButton iconClass="btn--delete" @click="deleteSelected"></MISAButton>
    </div>
  </div>

  <MISATable :isLoading="isLoading" :handleCaculate="handleCaculate" :products="products" :totalQuantity="totalQuantity"
    :totalPrice="totalPrice" :totalDepreciation="totalDepreciation" :totalResidual="totalResidual" :onUpdate="onUpdate">
  </MISATable>

  <MISAForm v-if="isFormVisible" :isFormVisible="isFormVisible" @close-form="closeForm" :productEdit="productForUpdate">
  </MISAForm>
</template>

<script>
import axios from 'axios';
import { departmentURL } from "@/js/common/urlAsset";

export default {
  name: "ProductList",
  /**
   * @author: DDTung (27/06/2023)
   * @description: Lấy api sản phẩm 
   */
  async created() {
    try {
      this.isLoading = true;
      const response = await axios.get("https://64798739a455e257fa6347c2.mockapi.io/users");
      this.products = response.data;
      this.handleCaculate();
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  },


  data() {
    return {
      products: [],
      isFormVisible: false,
      comboboxUrl: departmentURL,
      isLoading: false,
      productForUpdate: {},
      productForAdd: {
        ProductsCode: "TS00001",
        ProductsName: "",
        ProductsType: "",
        ProductsDepartment: "",
        ProductsQuantity: 1,
        ProductsPrice: 0,
        ProductsDepreciation: 1,
        ProductsResidual: 0,
        ProductsChecked: false,
        DepartmentCode: "",
      },
      totalQuantity: 0,
      totalPrice: 0,
      totalDepreciation: 0,
      totalResidual: 0,
    };
  },
  methods: {
    handleAddForm() {
      this.productForUpdate = this.productForAdd
      this.isFormVisible = true;
    },
    closeForm() {
      this.productForUpdate = {};
      this.isFormVisible = false;
    },
    onUpdate(product) {
      this.productForUpdate = product
      this.isFormVisible = true;
    },

    async deleteSelected() {
      const selectedProducts = this.products.filter(product => product.ProductsChecked);
      for (const product of selectedProducts) {
        try {
          await axios.delete(`https://64798739a455e257fa6347c2.mockapi.io/users/${product.ProductsId}`);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    },

    handleCaculate() {
      this.caculateTotalQuantity(),
        this.caculateTotalPrice(),
        this.caculateTotalDepreciation(),
        this.caculateTotalResidual()
    },

    /**
   * @returns: Tính tổng số lượng
   * @author: DDTung (27/06/2023)
   */
    caculateTotalQuantity() {
      this.totalQuantity = this.products.reduce((total, product) => total + product.ProductsQuantity, 0);
    },
    /**
    * @returns: Tính tổng nguyên giá
    * @author: DDTung (27/06/2023)
    */
    caculateTotalPrice() {
      this.totalPrice = this.products.reduce((total, product) => total + Number(product.ProductsPrice), 0);
    },
    /**
    * @returns: Tính tổng khấu hao
    * @author: DDTung (27/06/2023)
    */
    caculateTotalDepreciation() {
      this.totalDepreciation = this.products.reduce((total, product) => total + Number(product.ProductsDepreciation), 0);
    },
    /**
    * @returns: Tính tổng số tiền còn lại
    * @author: DDTung (27/06/2023)
    */
    caculateTotalResidual() {
      this.totalResidual = this.products.reduce((total, product) => total + Number(product.ProductsResidual), 0);
    },

  }
}


</script>

<style>
.l-main .v-combobox__body {
  width: 180px !important;
  border-radius: 2.5px;
}


.l-main .v-combobox__selected {
  height: 35px;
  padding: 0 20px 0 40px !important;
  border: 1px solid #afafaf !important;
  border-radius: 2.5px !important;


}


.l-main .v-combobox__selected:hover {
  border: 1px solid #1aa4c8 !important;

}

.l-main .v-combobox__focus {
  border: 1px solid #1aa4c8 !important;

}

.l-main .v-combobox__icon[data-v-fdaf08aa] {
  background: var(--icon-url) no-repeat -62px -322px !important;
}

.l-main .icon-filter {
  background: var(--icon-url) no-repeat -240px -65px;
}

.l-main .v-select__list {
  top: 100%;
  min-height: 160px;
}


.r-main button {
  padding: 0 !important;
  border: unset !important;
  ;
}
</style>