<template>
    <div id="table">
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th class="text-center width-fit">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                        </th>
                        <th class="stt text-center">{{ tableInfo.numeric }} <div class="tooltip-stt">{{
                            tableInfo.numericTooltip }}</div>
                        </th>
                        <th>{{ tableInfo.fixed_asset_code }}</th>
                        <th>{{ tableInfo.fixed_asset_name }}</th>
                        <th>{{ tableInfo.fixed_asset_category_name }}</th>
                        <th>{{ tableInfo.department_name }}</th>
                        <th class="text-center">{{ tableInfo.quantity }}</th>
                        <th class="text-right">{{ tableInfo.cost }}</th>
                        <th class="text-right">{{ tableInfo.depreciation }}<div class="tooltip-kh">Khấu hao/Hao mòn lũy kế
                            </div>
                        </th>
                        <th class="text-right">{{ tableInfo.residualValue }}</th>
                        <th>{{ tableInfo.function }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="empty-data" v-if="totalQuantity === 0">
                        <td colspan="12" class="w-100">
                            <div class="no-data">
                                <div class="icon-noData"></div>
                                <h3>Không có dữ liệu</h3>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(product) in products" :key="product.ProductsId" @dblclick="onUpdate(product)"
                        @click="handleRowClick(product)">
                        <td class="text-center">
                            <input type="checkbox" v-model="product.ProductsChecked"
                                @click.stop="handleCheckboxClick(product)" />
                        </td>
                        <td class="text-center">{{ product.ProductsId }}</td>
                        <td>{{ product.ProductsCode }}</td>
                        <td>{{ product.ProductsName }}</td>
                        <td>{{ product.ProductsType }}</td>
                        <td>{{ product.ProductsDepartment }}</td>
                        <td class="text-center">{{ product.ProductsQuantity }}</td>
                        <td class="text-right">{{ product.ProductsPrice }}</td>
                        <td class="text-right">{{ product.ProductsDepreciation }}</td>
                        <td class="text-right">{{ product.ProductsResidual }}</td>
                        <td>
                            <div class="function-table">
                                <div class="icon icon-edit" @click="onUpdate(product)"></div>
                                <div class="icon icon-duplicate"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Tổng số: <strong>{{ products.length }}</strong> bản ghi</td>
                        <td colspan="3">
                            <div class="d-flex align-items-center">
                                <MISAPagination v-model:pageNumber="pageNumber" v-model:pageSize="pageSize"
                                    :products="products">
                                </MISAPagination>
                            </div>
                        </td>
                        <td class="text-center">
                            <strong>{{ totalQuantity }}</strong>
                        </td>
                        <td class="text-end">
                            <strong>{{ totalPrice }}</strong>
                        </td>
                        <td class="text-end">
                            <strong>{{ totalDepreciation }}</strong>
                        </td>
                        <td class="text-end">
                            <strong>{{ totalResidual }}</strong>
                        </td>
                        <td></td>
                    </tr>

                </tfoot>
                <MISALoading v-if="isLoading"></MISALoading>
            </table>
        </div>
    </div>
</template>

<script>
import MISAFunction from "../../../js/common/function.js";
import { Table } from '../../../js/common/table.js';
export default {
    name: "MISATable",
    props: {
        isLoading: {
            type: Boolean
        },
        products: {
            type: Array,
        },
        onUpdate: {
            type: Function
        },
        handleCaculate: {
            type: Function
        },
        totalPrice: {
            type: Number
        },
        totalQuantity: {
            type: Number
        },
        totalDepreciation: {
            type: Number,
        },
        totalResidual: {
            type: Number
        }
    },



    created() {
        this.handleCaculate()
    },


    data() {
        return {
            selectAll: false,
            modifiedProducts: [],
            tableInfo: Table,
            pageNumber: 1,
            pageSize: 10,
        }
    },

    methods: {
        /**
         * @description: check tất cả checkbox
         * @author: DDTung (27/06/2023)
         */
        toggleSelectAll() {
            this.modifiedProducts = [...this.products];
            for (let i = 0; i < this.modifiedProducts.length; i++) {
                this.modifiedProducts[i].ProductsChecked = this.selectAll;
            }
        },
        handleCheckboxClick(product) {
            product.checkboxClicked = true;
        },
        handleRowClick(product) {
            if (!product.checkboxClicked) {
                product.ProductsChecked = !product.ProductsChecked;
            }
            product.checkboxClicked = false;
        },

        /**
       * @description: format tiền
       * @author: DDTung (03/07/2023)
       */
        formatMoney(money) {
            return MISAFunction.formatMoney(money);
        },


    }
}
</script>

<style>
.table,
table {
    width: 100%;
    height: 100%
}

#table,
.table {
    background-color: #fff
}

table tr,
td.text,
th.text {
    text-align: left
}

tfoot,
thead {
    position: sticky;
    left: 0;
    background-color: #f5f5f5
}

#table {
    border-radius: 3.5px;
    border: 1px solid #afafaf;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;

}


.table {
    overflow-y: scroll;
    margin: 0
}

.table .lds-dual-ring[data-v-5f38b7f1] {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
}

.table .lds-dual-ring[data-v-5f38b7f1]:after {
    border-color: #1aa4c8 transparent #1aa4c8 transparent;
}

.table::-webkit-scrollbar {
    width: 2px;
    height: 5px;
    border-top: 1px solid #e2e2e2
}

.table::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #ccc
}

table {
    border-collapse: collapse
}

table:focus {
    border: none;
    outline: 0
}

table tr {
    height: 40px;
    white-space: nowrap
}



.tooltip-kh,
.tooltip-stt {
    color: #000;
    background-color: #fff;
    padding: 8px 20px;
    z-index: 2;
    position: absolute;
    border: 1px solid #000;
    visibility: hidden
}

tr .kh:hover .tooltip-kh,
tr .stt:hover .tooltip-stt {
    visibility: visible
}

table thead tr {
    height: 38px
}

table td,
table th {
    padding: 0 10px
}

table td:first-child,
table td:last-child,
table th:first-child,
table th:last-child {
    padding-left: 16px
}

td.number,
th.number {
    text-align: right
}

table tbody tr {
    max-height: 36px !important;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer
}

table tbody tr:hover {
    background-color: rgba(26, 164, 200, .2)
}

table tbody tr:active {
    background-color: rgba(26, 164, 200, .2) !important
}

.text-center {
    text-align: center
}

.text-right {
    text-align: end
}

table tbody tr:hover .function-table {
    display: flex
}

thead {
    top: 0;
    z-index: 1
}

tfoot {
    bottom: -1px;
    z-index: 1000
}

.function-table {
    justify-content: space-evenly;
    display: none
}

table .v-combobox__icon {
    background: var(--icon-url) no-repeat -19px -328px !important;
}

table .icon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.icon-duplicate {
    background: var(--icon-url) no-repeat -240px -108px
}

.icon-edit {
    background: var(--icon-url) no-repeat -152px -64px
}

.icon-prev {
    background: var(--icon-url) no-repeat -199px -242px;
    margin-right: 10px;
}

.icon-next {
    background: var(--icon-url) no-repeat -242px -242px
}

.icon-noData {
    background: url("../../../assets/img/bg_report_nodata.76e50bd8.svg") no-repeat 0 0;
    width: 132px;
    height: 76px;
}

.no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.empty-data {
    height: 500px !important;
}

.empty-data:active {
    background-color: unset !important;
}

.empty-data:hover {
    background-color: unset;
    cursor: unset;
}
</style>