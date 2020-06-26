<template>
    <div style="width: 100%;background: #FFFFFF;">
        <div class="allData-top att" style="padding-left:40px ">
            <div style="width: 33%;margin-bottom:20px;" v-for="att in attendance" :key="att.id">
                <AttendanceData :attendanceData="att"></AttendanceData>
            </div>
        </div>

    </div>
</template>

<script>
    import AttendanceData from "../../../components/data/AttendanceData";

    export default {
        name: "Attendance",
        data() {
            return {
                attendance: [
                    {
                        id: '001',
                        className: '全栈-优益客',
                        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        normal: [320, 332, 301, 334, 390, 400, 600],
                        late: [220, 182, 191, 234, 290, 354, 623],
                        truancy: [320, 332, 301, 334, 390, 521, 354],
                        lea: [320, 332, 301, 334, 390,470,533]
                    },
                    {
                        id: '002',
                        className: '全栈-蓝鸥',
                        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        normal: [320, 332, 301, 334, 390, 400, 600],
                        late: [220, 182, 191, 234, 290, 354, 623],
                        truancy: [320, 332, 301, 334, 390, 521, 354],
                        lea: [320, 332, 301, 334, 390,470,533]
                    },
                    {
                        id: '003',
                        className: 'JAVA-优益客',
                        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        normal: [320, 332, 301, 334, 390, 400, 600],
                        late: [220, 182, 191, 234, 290, 354, 623],
                        truancy: [320, 332, 301, 334, 390, 521, 354],
                        lea: [320, 332, 301, 334, 390,470,533]
                    },
                    {
                        id: '004',
                        className: 'JAVA-维信',
                        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        normal: [320, 332, 301, 334, 390, 400, 600],
                        late: [220, 182, 191, 234, 290, 354, 623],
                        truancy: [320, 332, 301, 334, 390, 521, 354],
                        lea: [320, 332, 301, 334, 390,470,533]
                    },
                    {
                        id: '005',
                        className: '人工智能-优益客',
                        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        normal: [320, 332, 301, 334, 390, 400, 600],
                        late: [220, 182, 191, 234, 290, 354, 623],
                        truancy: [320, 332, 301, 334, 390, 521, 354],
                        lea: [320, 332, 301, 334, 390,470,533]
                    },
                    {
                        id: '006',
                        className: '人工智能-蓝鸥',
                        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        normal: [320, 332, 301, 334, 390, 400, 600],
                        late: [220, 182, 191, 234, 290, 354, 623],
                        truancy: [320, 332, 301, 334, 390, 521, 354],
                        lea: [320, 332, 301, 334, 390,470,533]
                    },
                ],
            }
        },
        components: {
            AttendanceData
        }
    }
</script>

<style scoped>

</style>