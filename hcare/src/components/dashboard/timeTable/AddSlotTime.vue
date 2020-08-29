<template>
<div>
    <div class="container mt-3">
        <div class="row p-3 pt-4 div-card bg-gray"> ส่วนที่ 1 : เลือกวันที่และบริการ </div>
            <div class="mt-3 div-card">
                <div class="row bg-blueMan2">
                    <div class="col-4">
                        <man2 class="d-none d-md-block" />
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="form-group text-left" style="margin-top:48px;">
                            <label for="InputName">กรอกรหัสนักศึกษา</label>
                            <input type="text" v-model="hn_number" class="form-control" placeholder="รหัสนักศึกษา" required />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3 div-card">
            <div class="row p-3 pt-4 bg-light">
                <div class="col-12">
                    <h6 class="text-left">จิตแพทย์</h6>
                </div>
            </div>
            <div class="row p-3 pt-4">
                <div class="col-2 text-center">
                    <h6>วันจันทร์</h6>
                    <p>14 DEC 2020</p>
                </div>
                <div class="col-10">
                    <div class="row"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ServiceTypeBox from "@/components/ServiceTypeBox.vue";
import man2 from "@/components/svg/man2.vue";

export default {
    data() {
        return {
            dataFetch: {
                dataTypes: null
            },
            dataPrepareSend: {
                type_id: 1,
                date: null
            }
        };
    },
    components: {
        man2,
        ServiceTypeBox
    },
    methods: {
        async fetchDate(serviceDataType) {
            this.dataPrepareSend.type_id = serviceDataType.type_id;
            await axios
                .get(
                    `${process.env.VUE_APP_BACKEND_URL}/ServiceDate/${serviceDataType.type_id}`, {
                        headers: {
                            Authorization: `Bearer ${this.$store.state.token}`
                        }
                    }
                )
                .then(res => {
                    this.dataFetch.dataDates = res.data;
                    console.log(this.dataFetch.dataDates);
                });
        }
    },
    async mounted() {
        //เรียกข้อมูล Default
        //Type
        await axios
            .get(`${process.env.VUE_APP_BACKEND_URL}/ServiceTypes`, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                this.dataFetch.dataTypes = res.data;
            });
    }
};
</script>

<style></style>
