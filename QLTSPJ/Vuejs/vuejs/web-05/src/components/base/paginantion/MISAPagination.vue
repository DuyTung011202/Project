<template>
    <div class="d-flex align-items-center">
        <MISACombobox :data="record" propKey="key" propValue="value" v-model="vPageSize" selectBox>
        </MISACombobox>
        <ul class="d-flex align-items-center m-0 p-0">
            <span class="icon icon-prev" @click="changePage('prev')"></span>
            <li v-for="(page, index) in  pages " :key="index" class="icon" style="margin-right: 5px"
                :class="{ 'pagination-active': page == pageNumber }" @click="changePage(page)">
                {{ page }}</li>
            <span class="icon icon-next" @click="changePage('next')"></span>
        </ul>
    </div>
</template>


<script>
export default {
    name: "MISAPagination",
    props: {
        products: {
            type: Array,
            required: true,
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageNumber: {
            type: Number,
            default: 1
        }
    },
    methods: {
        changePage(page) {
            if (page == 'prev' && this.pageNumber <= 1) {
                return
            }
            if (page == 'prev') {
                page = this.pageNumber - 1
            }
            if (page == 'next' && this.pageNumber >= this.totalPage) {
                return
            }
            if (page == 'next') {
                page = this.pageNumber + 1
            }
            if (page == "...") {
                return
            }
            this.$emit('update:pageNumber', page)
        }
    },
    computed: {
        /**
         * @description: Hiển thị số bản ghi trên 1 trang
         * @author: DDTung (11/07/2023)
         */
        record() {
            return [
                {
                    key: 10,
                    value: "10"
                },
                {
                    key: 20,
                    value: "20"
                },
                {
                    key: 50,
                    value: "50"
                },
                {
                    key: 100,
                    value: "100"
                },
            ]
        },
        totalPage() {
            return Math.ceil(this.products.length / this.pageSize)
        },
        pages() {
            let pages = [];
            for (let i = 1; i <= this.totalPage; i++) {
                if (i == 1 || i == this.totalPage || i <= this.pageNumber + 2 && i >= this.pageNumber - 2) {
                    pages.push(i)
                } else if (i == this.pageNumber + 3 || i == this.pageNumber - 3) {
                    pages.push("...")
                }
            }
            return pages
        },
        vPageSize: {
            get() {
                return this.pageSize
            },
            set(value) {
                this.$emit('update:pageSize', value)
            }
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none
}

.pagination-active {
    background-color: #cccccc;
}

.icon-prev {
    background: var(--icon-url) no-repeat -197px -242px;
    margin-right: 10px;
}

.icon-next {
    background: var(--icon-url) no-repeat -240px -242px
}
</style>