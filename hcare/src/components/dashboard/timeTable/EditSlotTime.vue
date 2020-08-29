<template>
<div>
    <div class="container mt-3 div-card">
        <div class="row p-3 pt-4">
            <div class="col-12">
                <h6 class="text-left">ส่วนที่ 1 : เลือกบริการ</h6>
                <ServiceTypeBox :dataTypes="dataFetch.dataTypes" v-on:serviceDataType="fetchDate" />
            </div>
        </div>
    </div>
    <div class="container mt-3 div-card">
        <div class="row p-3 pt-4">
            <div class="col-12 col-md-8">
                <h6 class="text-left">ส่วนที่ 2 : เลือกวันที่ให้บริการ</h6>
                <input type="text" id="InputDay" class="form-control col-12 col-lg-6 text-center mx-auto mt-4" placeholder="กรุณาเลือกวัน" v-model="dataPrepareSend.date" onfocus="(this.type='date')" />
                <button @click="fetchTimeSlot" class="btn btnType-sm text-primary mt-4">
                    <span class="p-3">ตกลง</span>
                </button>
            </div>
            <div class="col-12 col-md-4">
                <groupDocter class="d-none d-md-block" />
            </div>
        </div>
    </div>
    <div class="container mt-3 div-card" v-show="dataFetch.dataDates">
        <div class="row p-3 pt-4">
            <div class="col-12">
                <h6 class="text-left mb-4">ส่วนที่ 3 : เลือก slot เวลาที่ต้องการให้บริการ</h6>
                <toggle-button v-for="(item, index) in dataFetch.dataDates" :key="index" class="mr-2" :width="115" :height="36" :font-size="16" :value="(item.status=='available') ? true : false" color="#99a3ff" @change="onChangeEventHandler" :labels="{ checked: 'เปิด '+item.slot.substring(0, 5), unchecked: 'ปิด '+item.slot.substring(0, 5) }" :disabled="(item.status == 'available')? false : true" v-on:click="slotActive()" ref="toggle-button" />
            </div>
            <div class="col-12">
                <button @click="sendToBackend" class="btn btn-primary btnBlock btnConfirm mt-5 fixed-button mb-2">
                    <span style="font-weight:900">บันทึก</span>
                </button>
            </div>
        </div>
    </div>
    {{dataPrepareSend.slot}}
</div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import groupDocter from "@/components/svg/groupDocter.vue";

export default {
    data() {
        return {
            dataFetch: {
                dataTypes: null,
                dataDates: null,
            },
            dataPrepareSend: {
                type_id: 1,
                date: null,
                slot: [],
            },
        };
    },
    components: {
        ServiceTypeBox,
        groupDocter,
    },
    methods: {
        onChangeEventHandler() {},
        async fetchDate(serviceDataType) {
            this.dataPrepareSend.type_id = serviceDataType.type_id;
            await axios
                .get(
                    `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`, {
                        headers: {
                            Authorization: `Bearer ${this.$store.state.token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                });
        },
        async fetchTimeSlot() {
            this.dataPrepareSend;
            if (
                this.dataPrepareSend.type_id != null &&
                this.dataPrepareSend.date != null
            ) {
                this.dataFetch.dataDates = null;
                await axios
                    .post(
                        `${process.env.VUE_APP_BACKEND_URL}/admin/dashboard/timetable/EditSlotTime/checktimeslot`, {
                            type_id: this.dataPrepareSend.type_id,
                            date: this.dataPrepareSend.date,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.state.token}`,
                            },
                        }
                    )
                    .then((res) => {
                        if (res.status == 204) {
                            this.dataPrepareSend.date = null;
                            this.$swal({
                                icon: "warning",
                                title: "คำเตือน",
                                text: "ไม่มีเวลาให้บริการสำหรับบริการที่ท่านเลือก",
                            });
                        } else {
                            this.dataFetch.dataDates = res.data.timeArray;
                            this.dataPrepareSend.date = res.data.date;
                            console.log(this.dataFetch.dataDates);
                            console.log(this.dataPrepareSend.date);
                        }
                    })
                    .catch((err) => {
                        console.log("===== Backend-error ======");
                        console.error(error.response);
                        this.$swal({
                            ...errorSWAL,
                        });
                    });
            } else {
                this.$swal({
                    icon: "warning",
                    title: "คำเตือน",
                    text: "กรุณาเลือกประเภทการให้บริการ และวันที่",
                });
            }
        },
        async sendToBackend() {
            //Send DATA
        },
        async slotActive() {
            console.log(this.$refs["toggle-button"].focus());
        },
    },
    async mounted() {
        //เรียกข้อมูล Default Type
        await axios
            .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            })
            .then((res) => {
                this.dataFetch.dataTypes = res.data;
            });
    },
};
</script>
