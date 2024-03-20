<template>
    <div :class="isSidebarOpen ? 'w-100 height-100 body-pd' : 'main-container w-100 height-100'">
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: "TheMain",
    components: {

    },
    props: ["isSidebarOpen"]
}
</script>

<style>
.body-pd,
.main-container {
    background-color: #f4f7ff !important;
    transition: .5s
}

.main-header {
    margin-bottom: 13px
}

.main-container {
    padding: 20px
}

.main-content {
    height: 600px;
    overflow-y: auto
}

.body-pd {
    padding: 20px 20px 20px 176px
}
</style>