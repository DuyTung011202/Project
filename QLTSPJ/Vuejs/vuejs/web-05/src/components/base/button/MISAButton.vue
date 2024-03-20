<template>
    <button :id="customId" :class="customClass" :tabindex="tab">
        <div :class="iconClass"></div>
        {{ text }}
    </button>
</template>

<script>
export default {
    name: "MISAButton",
    props: {
        customId: { // custom id
            type: String
        },
        customClass: {  // custom class
            type: String
        },
        tab: {  // tab index
            type: String
        },
        iconClass: { // icon class
            type: String
        },
        text: { // button text
            type: String
        }
    }
}
</script>


<style >
:root {
    --icon-url: url("../../../assets/img/qlts-icon.svg");
}

.btn--delete:hover,
.btn--option:hover {
    cursor: pointer;
    opacity: .5
}

.btn--primary {
    background-color: #1aa4c8;
    border-radius: 3px;
    width: 125px;
    height: 36px;
    overflow: hidden;
    color: #fff;
    outline: 0;
    border: none;
    padding-right: 20px
}

.btn--primary:hover {
    background-color: #1685a0;
    cursor: pointer
}

.btn--primary-icon {
    width: 16px;
    height: 16px;
    background: var(--icon-url) no-repeat -200px -420px;
    margin-left: 12px
}

.btn--delete,
.btn--option {
    width: 36px;
    height: 36px;
    border-radius: 3px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .16)
}

.btn--option {
    background: var(--icon-url) no-repeat -278px -102px;
    background-color: #fff;
    margin: 0 10px
}

.btn--delete {
    background: var(--icon-url) no-repeat -454px -102px;
    background-color: #fff
}
</style>