<template>
<div class="d-flex">
    <Menudash />
    <!-- <Queuedash /> -->
    <div class="container bg-light">
        <nav class="navbar-expand navbar-light bg-white pl-3 pt-3 border-bottom">
            <ul class="navbar-nav nav-underlined">
                <li :class="{ active: activeBtnNav === 'AddSlotTime' }" style="margin-left: 63px;" @click="activeBtnNav = 'AddSlotTime'">
                    <router-link to="#AddSlotTime" :class="[
                'disText',
                { activeText: activeBtnNav === 'AddSlotTime' }
              ]">เพิ่ม slot เวลา</router-link>
                </li>
                <li :class="{ active: activeBtnNav === 'EditSlotTime' }" style="margin-left: 63px;" @click="activeBtnNav = 'EditSlotTime'">
                    <router-link to="#EditSlotTime" :class="[
                'disText',
                { activeText: activeBtnNav === 'EditSlotTime' }
              ]">แก้ไขตารางการให้บริการ</router-link>
                </li>
            </ul>
        </nav>
        <AddSlotTime v-if="activeBtnNav == 'AddSlotTime'" />
        <EditSlotTime v-if="activeBtnNav == 'EditSlotTime'" />
    </div>
</div>
</template>

<script>
import Menudash from "@/components/dashboard/Menudash.vue";
import Queuedash from "@/components/dashboard/Queuedash.vue";
import AddSlotTime from "@/components/dashboard/timeTable/AddSlotTime.vue";
import EditSlotTime from "@/components/dashboard/timeTable/EditSlotTime.vue";

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
        EditSlotTime
    }
};
</script>

<style scoped>
.nav-item-underlined:after,
.nav-underlined>li:after {
    display: block;
    content: " ";
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
