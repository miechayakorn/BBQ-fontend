<template>
<div class="d-flex">
    <Menudash />
    <Queuedash />
    <div class="container bg-light">
        <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
            <ul class="navbar-nav nav-underlined">
                <li :class="{ active: activeBtnNav === 'AddSlotTime' }" style="margin-left: 63px;" @click="activeBtnNav = 'AddSlotTime'">
                    <router-link to="#AddSlotTime" :class="[
                'disText',
                { activeText: activeBtnNav === 'AddSlotTime' }
              ]">เพิ่ม slot เวลา</router-link>
                </li>
                <li :class="{ active: activeBtnNav === 'ManageTable' }" style="margin-left: 63px;" @click="activeBtnNav = 'ManageTable'">
                    <router-link to="#ManageTable" :class="[
                'disText',
                { activeText: activeBtnNav === 'ManageTable' }
              ]">แก้ไขตารางการให้บริการ</router-link>
                </li>
            </ul>
        </nav>
        <AddSlotTime v-if="activeBtnNav == 'AddSlotTime'" />
        <ManageTable v-if="activeBtnNav == 'ManageTable'" />
    </div>
</div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import AddSlotTime from "@/components/dashboard/timeTable/AddSlotTime.vue";
import ManageTable from "@/components/dashboard/timeTable/ManageTable.vue";

export default {
    data() {
        return {
            activeBtnNav: "AddSlotTime"
        };
    },
    components: {
        Menudash,
        Queuedash,
        AddSlotTime,
        ManageTable
    }
};
</script>

<style scoped>
.nav-item-underlined:after,
.nav-underlined>li:after {
    display: block;
    content: " ";
    bottom: 10px;
    border-bottom: 3px solid transparent;
    width: 0;
    width: auto;
}

.disText {
    color: #b6b6b6;
}

.activeText {
    color: #555555;
}

.underlined-active:after,
.nav-underlined:hover>li:hover:after,
.nav-underlined:active>li:hover:after,
.nav-underlined:hover>li.active:hover:after,
.nav-underlined:active>li.active:hover:after,
.nav-underlined>li.active:after,
.nav-underlined>li:hover:after {
    border-color: #99a3ff;
}
</style>
