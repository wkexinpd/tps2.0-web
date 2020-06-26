<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>基础设置</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">通用设置</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <el-col>
                    <el-collapse accordion>
                        <el-collapse-item title="讲座与方向选择控制">
                            <div class="flex-around">
                                <div v-for="control in controls" :key="control.key">
                                    <el-switch
                                            style="display: block"
                                            v-model="control.status"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            :active-value="1"
                                            :inactive-value="0"
                                            :inactive-text="control.describe"
                                            @change="changeControl(control.name,control.describe,control.status)"
                                    >
                                    </el-switch>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="学院方向管理">
                            <div>
                                <el-card class="data-card">
                                    <el-row>
                                        <!--        搜索区域-->
                                        <el-col>
                                            <el-row>
                                                <el-button type="primary" @click="addCollegeDirectionVisible = true">
                                                    新增学院方向
                                                </el-button>
                                            </el-row>
                                        </el-col>
<!--                                               table区域-->
                                        <el-col style="margin-top: 15px">
                                            <el-table
                                                    :data="collegeDirection"
                                                    border>
                                                <el-table-column
                                                        prop="name"
                                                        label="学院方向"
                                                        style="width: 50%"
                                                        min-width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="name"
                                                        label="操作"
                                                        style="width: 50%"
                                                        min-width="180">
                                                    <template slot-scope="scope">
                                                        <el-button type="text" size="small"
                                                                   @click="showEditCollegeDirection(scope.row.id,scope.row.name)">
                                                            修改
                                                        </el-button>
                                                        <el-button type="text" size="small" style="color: red"
                                                                   @click="delCollegeDirection(scope.row.id)">
                                                            删除
                                                        </el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                            <!--新增学院方向弹框-->
                            <el-dialog title="新增学院方向" :visible.sync="addCollegeDirectionVisible" width="30%"
                                       @close="addCollegeDirectionClosed">
                                <el-form :model="addCollegeDirectionForm" :rules="addCollegeDirectionFormRules"
                                         ref="addCollegeDirectionFormRef" label-width="120px">
                                    <el-form-item label="学院方向名称" prop="collegeDirectionName">
                                        <el-input v-model="addCollegeDirectionForm.collegeDirectionName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="addCollegeDirectionVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="addCollegeDirection">确 定</el-button>
                                </div>
                            </el-dialog>
                            <!--修改学院方向弹框-->
                            <el-dialog title="修改学院方向" :visible.sync="editCollegeDirectionVisible" width="30%">
                                <el-form :model="editCollegeDirectionForm" :rules="editCollegeDirectionFormRules"
                                         ref="editCollegeDirectionFormRef" label-width="120px">
                                    <el-form-item label="学院方向名称" prop="collegeDirectionName">
                                        <el-input v-model="editCollegeDirectionForm.collegeDirectionName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="editCollegeDirectionVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="editCollegeDirection">确 定</el-button>
                                </div>
                            </el-dialog>
                        </el-collapse-item>
                        <el-collapse-item title="学院班级管理">
                            <div>
                                <el-card class="data-card">
                                    <el-row>
                                        <!--        搜索区域-->
                                        <el-col>
                                            <el-row>
                                                <el-button type="primary" @click="addCollegeClassVisible = true">
                                                    新增学院班级
                                                </el-button>
                                            </el-row>
                                        </el-col>
                                        <!--       table区域-->
                                        <el-col style="margin-top: 15px">
                                            <el-table
                                                    :data="collegeClass"
                                                    border>
                                                <el-table-column
                                                        prop="majorName"
                                                        label="学院方向"
                                                        style="width: 50%"
                                                        min-width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="name"
                                                        label="学院班级"
                                                        style="width: 50%"
                                                        min-width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        label="操作"
                                                        style="width: 25%"
                                                        min-width="180">
                                                    <template slot-scope="scope">
                                                        <el-button type="text" size="small"
                                                                   @click="showEditCollegeClass(scope.row.majorId,scope.row.majorName,scope.row.name,scope.row.id)">
                                                            修改
                                                        </el-button>
                                                        <el-button type="text" size="small" style="color: red"
                                                                   @click="delCollegeClass(scope.row.id)">
                                                            删除
                                                        </el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                            <!--新增学院班级弹框-->
                            <el-dialog title="新增学院班级" :visible.sync="addCollegeClassVisible" width="30%"
                                       @close="addCollegeClassClosed">
                                <el-form :model="addCollegeClassForm" :rules="addCollegeClassFormRules"
                                         ref="addCollegeClassFormRef" label-width="120px">
                                    <el-form-item label="学院班级名称" prop="collegeClassName">
                                        <el-input v-model="addCollegeClassForm.collegeClassName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="学院方向" prop="collegeDirectionId">
                                        <el-select v-model="addCollegeClassForm.collegeDirectionId" clearable
                                                   placeholder="请选择学院方向">
                                            <el-option
                                                    v-for="collegeDirections in collegeDirection"
                                                    :key="collegeDirections.id"
                                                    :label="collegeDirections.name"
                                                    :value="collegeDirections.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">`
                                    <el-button @click="addCollegeClassVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="addCollegeClass">确 定</el-button>
                                </div>
                            </el-dialog>
                            <!--修改学院班级弹框-->
                            <el-dialog title="修改学院班级" :visible.sync="editCollegeClassVisible" width="30%">
                                <el-form :model="editCollegeClassForm" :rules="editCollegeClassFormRules"
                                         ref="editCollegeClassFormRef" label-width="120px">
                                    <el-form-item label="学院班级名称" prop="collegeClassName">
                                        <el-input v-model="editCollegeClassForm.collegeClassName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="学院方向" prop="collegeDirectionId">
                                        <el-select v-model="editCollegeClassForm.collegeDirectionId" clearable
                                                   placeholder="请选择学院方向">
                                            <el-option
                                                    v-for="collegeDirections in collegeDirection"
                                                    :key="collegeDirections.id"
                                                    :label="collegeDirections.name"
                                                    :value="collegeDirections.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="editCollegeClassVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="editCollegeClass">确 定</el-button>
                                </div>
                            </el-dialog>
                        </el-collapse-item>
                        <el-collapse-item title="实训方向管理">
                            <div>
                                <el-card class="data-card">
                                    <el-row>
                                        <!--        搜索区域-->
                                        <el-col>
                                            <el-row>
                                                <el-button type="primary" @click="addTrainingDirectionVisible = true">
                                                    新增实训方向
                                                </el-button>
                                            </el-row>
                                        </el-col>
                                        <!--       table区域-->
                                        <el-col style="margin-top: 15px">
                                            <el-table
                                                    :data="trainingDirection"
                                                    border>
                                                <el-table-column
                                                        prop="name"
                                                        label="实训方向方向"
                                                        style="width: 50%"
                                                        min-width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="name"
                                                        label="操作"
                                                        style="width: 25%"
                                                        min-width="180">
                                                    <template slot-scope="scope">
                                                        <el-button type="text" size="small"
                                                                   @click="showEditTrainingDirection(scope.row.id,scope.row.name)">
                                                            修改
                                                        </el-button>
                                                        <el-button type="text" size="small" style="color: red"
                                                                   @click="delTrainingDirection(scope.row.id)">
                                                            删除
                                                        </el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                            <!--新增实训方向弹框-->
                            <el-dialog title="新增实训方向" :visible.sync="addTrainingDirectionVisible" width="30%"
                                       @close="addTrainingDirectionClosed">
                                <el-form :model="addTrainingDirectionForm" :rules="addTrainingDirectionFormRules"
                                         ref="addTrainingDirectionFormRef" label-width="120px">
                                    <el-form-item label="实训方向名称" prop="trainingDirectionName">
                                        <el-input v-model="addTrainingDirectionForm.trainingDirectionName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="addCollegeDirectionVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="addTrainingDirection">确 定</el-button>
                                </div>
                            </el-dialog>
                            <!--修改实训方向弹框-->
                            <el-dialog title="修改实训方向" :visible.sync="editTrainingDirectionVisible" width="30%"
                                       >
                                <el-form :model="editTrainingDirectionForm" :rules="editTrainingDirectionFormRules"
                                         ref="editTrainingDirectionFormRef" label-width="120px">
                                    <el-form-item label="实训方向名称" prop="collegeDirectionName">
                                        <el-input v-model="editTrainingDirectionForm.trainingDirectionName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="editTrainingDirectionVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="editTrainingDirection">确 定</el-button>
                                </div>
                            </el-dialog>
                        </el-collapse-item>
                        <el-collapse-item title="未来计划管理">
                            <div>
                                <el-card class="data-card">
                                    <el-row>
                                        <!--        搜索区域-->
                                        <el-col>
                                            <el-row>
                                                <el-button type="primary" @click="addPlanVisible = true">
                                                    新增未来计划
                                                </el-button>
                                            </el-row>
                                        </el-col>
                                        <!--       table区域-->
                                        <el-col style="margin-top: 15px">
                                            <el-table :data="featurePlans" border>
                                                <el-table-column
                                                        prop="planName"
                                                        label="未来计划"
                                                        style="width: 50%"
                                                        min-width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="name"
                                                        label="操作"
                                                        style="width: 25%"
                                                        min-width="180">
                                                    <template slot-scope="scope">
                                                        <el-button type="text" size="small"
                                                                   @click="showEditPlan(scope.row.planId,scope.row.planName)">
                                                            修改
                                                        </el-button>
                                                        <el-button type="text" size="small" style="color: red"
                                                                   @click="delPlan(scope.row.planId)">
                                                            删除
                                                        </el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                            <!--新增未来计划弹框-->
                            <el-dialog title="新增未来计划" :visible.sync="addPlanVisible" width="30%"
                                       @close="addPlanClosed">
                                <el-form :model="addPlanForm" :rules="addPlanFormRules"
                                         ref="addPlanFormRef" label-width="120px">
                                    <el-form-item label="未来计划名称" prop="planName">
                                        <el-input v-model="addPlanForm.planName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="addPlanVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="addPlan">确 定</el-button>
                                </div>
                            </el-dialog>
                            <!--修改未来计划弹框-->
                            <el-dialog title="修改未来计划" :visible.sync="editPlanVisible" width="30%"
                                       >
                                <el-form :model="editPlanForm" :rules="editPlanFormRules"
                                         ref="editPlanFormRef" label-width="120px">
                                    <el-form-item label="未来计划名称" prop="planName">
                                        <el-input v-model="editPlanForm.planName"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="editPlanVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="editPlan">确 定</el-button>
                                </div>
                            </el-dialog>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script>
    export default {
        name: "CommonSet",
        data() {
            return {
                collegeDirection : [],
                trainingDirection:[],
                collegeClass: [],
                featurePlans:[],
                controllers:[],
                controls:[],
                id: '',
                //添加学院方向
                addCollegeDirectionVisible: false,
                addCollegeDirectionForm: {
                    collegeDirectionName: '',
                },
                addCollegeDirectionFormRules: {
                    collegeDirectionName: [
                        {required: true, message: '请输入学院方向名称', trigger: 'blur'},
                    ],
                },

                //修改学院方向
                editCollegeDirectionVisible: false,
                editCollegeDirectionForm: {
                    collegeDirectionId: '',
                    collegeDirectionName: '',
                },
                editCollegeDirectionFormRules: {
                    collegeDirectionName: [
                        {required: true, message: '请输入学院方向名称', trigger: 'blur'},
                    ],
                },

                //添加学院班级
                addCollegeClassVisible: false,
                addCollegeClassForm: {
                    collegeClassName: '',
                    collegeDirectionId: '',
                },
                addCollegeClassFormRules: {
                    collegeClassName: [
                        {required: true, message: '请输入学院班级名称', trigger: 'blur'},
                    ],
                    collegeDirectionId: [
                        {required: true, message: '请选择学院方向', trigger: 'blur'},
                    ],

                },

                // 修改学院班级
                editCollegeClassVisible: false,
                editCollegeClassForm: {
                    collegeClassId: '',
                    collegeClassName: '',
                    collegeDirectionId: '',
                    collegeDirectionName: '',
                },
                editCollegeClassFormRules: {
                    collegeClassName: [
                        {required: true, message: '请输入学院班级名称', trigger: 'blur'},
                    ],
                    collegeDirectionId: [
                        {required: true, message: '请选择学院方向', trigger: 'blur'},
                    ],
                },

                //添加实训方向
                addTrainingDirectionVisible: false,
                addTrainingDirectionForm: {
                    trainingDirectionName: '',
                },
                addTrainingDirectionFormRules: {
                    trainingDirectionName: [
                        {required: true, message: '请输入实训方向名称', trigger: 'blur'},
                    ],
                },

                //修改实训方向
                editTrainingDirectionVisible: false,
                editTrainingDirectionForm: {
                    trainingDirectionId: '',
                    trainingDirectionName: '',
                },
                editTrainingDirectionFormRules: {
                    trainingDirectionName: [
                        {required: true, message: '请输入实训方向名称', trigger: 'blur'},
                    ],
                },

                //添加未来计划
                addPlanVisible: false,
                addPlanForm: {
                    planName: '',
                },
                addPlanFormRules: {
                    planName: [
                        {required: true, message: '请输入未来计划名称', trigger: 'blur'},
                    ],
                },
                //修改未来计划
                editPlanVisible: false,
                editPlanForm: {
                    planId: '',
                    planName: '',
                },
                editPlanFormRules: {
                    planName: [
                        {required: true, message: '请输入未来计划名称', trigger: 'blur'},
                    ],
                },

            }
        },
        created() {
            this.getCollegeDirectionData();
            this.getCollegeClassData();
            this.getTrainingDirectionData();
            this.getPlans();
            this.getSwitchStatus();
        },
        methods: {
            getSwitchStatus(){
              this.$axios.get(this.$api.SwitchStatus,{switchName:'direction-switch'}).then(res=>{
                  if(res.data.code==200){
                      this.controls = res.data.result
                  }else{
                      this.$message.error("获取开关状态失败")
                  }
              })
            },
            //获取学院方向
            getCollegeDirectionData() {
                this.$axios.get(this.$api.GetCollegeDirection,{from:1,limit:20}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取学院方向信息失败");
                    }
                    this.collegeDirection = res.data.result.records;
                })
            },
            //    监听对话框关闭事件
            addPlanClosed() {
                this.$refs.addPlanFormRef.resetFields();
            },
            addCollegeDirectionClosed(){
                this.$refs.addCollegeDirectionFormRef.resetFields();
            },
            addCollegeClassClosed(){
                this.$refs.addCollegeClassFormRef.resetFields();
            },
            addTrainingDirectionClosed(){
                this.$refs.addTrainingDirectionFormRef.resetFields();
            },
            //添加学院方向
            addCollegeDirection() {
                this.$refs.addCollegeDirectionFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddCollegeDirection, {name:this.addCollegeDirectionForm.collegeDirectionName}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加学院方向成功");
                                this.addCollegeDirectionVisible = false;
                                this.getCollegeDirectionData();
                            } else {
                                this.$message.error("添加学院方向失败");
                            }
                        })
                    }
                })
            },
            showEditCollegeDirection(collegeDirectionId, collegeDirectionName) {
                this.editCollegeDirectionForm.collegeDirectionId = collegeDirectionId;
                this.editCollegeDirectionForm.collegeDirectionName = collegeDirectionName;
                this.editCollegeDirectionVisible = true;

            },
            //修改学院方向名称
            editCollegeDirection() {
                this.$refs.editCollegeDirectionFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditCollegeDirection, {id:this.editCollegeDirectionForm.collegeDirectionId,name:this.editCollegeDirectionForm.collegeDirectionName}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改学院方向信息成功");
                                this.editCollegeDirectionVisible = false;
                                this.getCollegeDirectionData();
                            } else {
                                this.$message.error("修改学院方向信息失败");
                            }
                        })
                    }
                })
            },
            //删除学院方向
            delCollegeDirection(id) {
                this.$confirm('此操作将永久删除该学院方向信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelCollegeDirection, {id:id}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getCollegeDirectionData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //获取学院班级
            getCollegeClassData() {
                this.$axios.get(this.$api.GetCollegeClass,{from:1,limit:20}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取学院班级失败");
                    }else{
                        this.collegeClass = res.data.result.records;
                    }
                })
            },
            //添加学院班级
            addCollegeClass() {
                this.$refs.addCollegeClassFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddCollegeClass, {majorId:this.addCollegeClassForm.collegeDirectionId,name:this.addCollegeClassForm.collegeClassName}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加学院班级成功");
                                this.addCollegeClassVisible = false;
                                this.getCollegeClassData();
                            } else {
                                this.$message.error("添加学院班级失败");
                            }
                        })
                    }
                })
            },
            showEditCollegeClass(collegeDirectionId,collegeDirectionName, collegeClassName, collegeClassId) {
                this.editCollegeClassForm.collegeClassId = collegeClassId;
                this.editCollegeClassForm.collegeDirectionName = collegeDirectionName;
                this.editCollegeClassForm.collegeDirectionId = collegeDirectionId;
                this.editCollegeClassForm.collegeClassName = collegeClassName;
                this.editCollegeClassVisible = true;
            },
            //修改学院方向班级
            editCollegeClass() {
                this.$refs.editCollegeClassFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditCollegeClass, {id:this.editCollegeClassForm.collegeClassId,name:this.editCollegeClassForm.collegeClassName,majorId: this.editCollegeClassForm.collegeDirectionId}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改学院班级信息成功");
                                this.editCollegeClassVisible = false;
                                this.getCollegeDirectionData();
                            } else {
                                this.$message.error("修改学院班级信息失败");
                            }
                        })
                    }
                })
            },
            //删除学院班级
            delCollegeClass(id) {
                this.$confirm('此操作将永久删除该学院班级信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelCollegeClass, {id:id}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getCollegeClassData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            //获取实训方向
            getTrainingDirectionData() {
                this.$axios.get(this.$api.GetTrainingDirection,{from:1,limit:20}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取实训方向失败");
                    }else{
                        this.trainingDirection = res.data.result.records;
                    }
                })
            },
            //添加实训方向
            addTrainingDirection() {
                this.$refs.addTrainingDirectionFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddTrainingDirection, {name:this.addTrainingDirectionForm.trainingDirectionName}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加实训方向成功");
                                this.addTrainingDirectionVisible = false;
                                this.getTrainingDirectionData();
                            } else {
                                this.$message.error("添加实训方向失败");
                            }
                        })
                    }
                })
            },
            showEditTrainingDirection(trainingDirectionId, trainingDirectionName) {
                this.editTrainingDirectionForm.trainingDirectionId = trainingDirectionId;
                this.editTrainingDirectionForm.trainingDirectionName = trainingDirectionName;
                this.editTrainingDirectionVisible = true;

            },
            //修改实训方向名称
            editTrainingDirection() {
                this.$refs.editTrainingDirectionFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditTrainingDirection, {id:this.editTrainingDirectionForm.trainingDirectionId,name:this.editTrainingDirectionForm.trainingDirectionName}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改实训方向成功");
                                this.editTrainingDirectionVisible = false;
                                this.getTrainingDirectionData();
                            } else {
                                this.$message.error("修改实训方向失败");
                            }
                        })
                    }
                })
            },
            //删除实训方向
            delTrainingDirection(id) {
                this.$confirm('此操作将永久删除该实训方向信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelTrainingDirection, {id:id}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getTrainingDirectionData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            changeControl(key,describe,status){
                if(status==0){
                    this.$axios.get(this.$api.SwitchClose,{switchName: key}).then(res=>{
                        if (res.data.code==200){
                            this.$message.success(describe+"已关闭")
                        }else {
                            this.$message.error(describe+"关闭失败")
                        }
                    })
                }else{
                    this.$axios.get(this.$api.SwitchOpen,{switchName: key}).then(res=>{
                        if (res.data.code==200){
                            this.$message.success(describe+"已开启")
                        }else {
                            this.$message.error(describe+"开启失败")
                        }
                    })
                }
            },


            //获取未来计划
            getPlans(){
                this.$axios.get(this.$api.GetPlan,{from:1,limit:20}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取未来计划失败");
                    }
                    this.featurePlans = res.data.result;
                })
            },
            //添加未来计划
            addPlan(){
                this.$refs.addPlanFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddPlan, this.addPlanForm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加未来计划成功");
                                this.addPlanVisible = false;
                                this.getPlans();
                            } else {
                                this.$message.error("添加未来计划失败");
                            }
                        })
                    }
                })
            },
            //修改未来计划
            showEditPlan(planId, planName) {
                this.editPlanForm.planId = planId;
                this.editPlanForm.planName = planName;
                this.editPlanVisible = true;
            },
            editPlan(){
                this.$refs.editPlanFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditPlan, this.editPlanForm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改未来计划成功");
                                this.editPlanVisible = false;
                                this.getPlans();
                            } else {
                                this.$message.error("修改未来计划失败");
                            }
                        })
                    }
                })
            },
            //删除未来计划
            delPlan(id){
                this.$confirm('此操作将永久删除该未来计划信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelPlan, {id:id}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getPlans();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>