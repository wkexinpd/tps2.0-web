import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";

const AllData = () =>Promise.resolve(import("@/views/admin/dataStatistics/AllData"));

Vue.use(Vuex);

var role = new Array();
role['admin'] = [
    {
        path: '/admin',
        name: 'admin',
        component: ()=>import("@/views/Index"),
        redirect: '/admin/dataStatistics/allData',
        children: [
            {
                path: "dataStatistics",
                name: "dataStatistics",
                meta: {
                    title: "数据统计",
                    icon: "el-icon-data-line",
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'allData',
                        name: 'allData',
                        meta: {
                            title: "首页"
                        },
                        component: AllData,
                    },
                    {
                        path: 'attendance',
                        name: 'attendance',
                        meta: {
                            title: "考勤统计",
                        },
                        component: ()=>import("@/views/admin/dataStatistics/Attendance"),
                    },
                ]
            },
            {
                path: "lecture",
                name: "lecture",
                meta: {
                    title: "讲座管理",
                    icon: "el-icon-reading"
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'noFinished',
                        name: 'noFinished',
                        meta: {
                            title: "选择未完成"
                        },
                        component: ()=> import("@/views/admin/lecture/LectureNoFinished"),
                    },
                    {
                        path: 'finished',
                        name: 'finished',
                        meta: {
                            title: "选择已完成",
                        },
                        component: ()=> import("@/views/admin/lecture/LectureFinished"),
                    },
                    {
                        path: 'lectureSelected',
                        name: 'lectureSelected',
                        meta: {
                            title: "按讲座汇总"
                        },
                        component: ()=> import("@/views/admin/lecture/LectureSelected"),
                    },
                    {
                        path: 'lectureManage',
                        name: 'lectureManage',
                        meta: {
                            title: "讲座信息管理"
                        },
                        component: ()=> import("@/views/admin/lecture/LectureManage"),
                    }
                ]
            },
            {
                path: "practicalTraining",
                name: "practicalTraining",
                meta: {
                    title: "实训管理",
                    icon: "el-icon-edit-outline",
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'achievement',
                        name: 'achievement',
                        meta: {
                            title: "成绩统计"
                        },
                        component: () =>import("@/views/admin/trainingManage/AchievementManage"),
                    },
                    {
                        path: 'attendanceDataManage',
                        name: 'attendanceDataManage',
                        meta: {
                            title: "考勤统计",
                        },
                        component: () =>import("@/views/admin/trainingManage/AttendanceDataManage"),
                    },
                    {
                        path: 'trainingDirectionManage',
                        name: 'trainingDirectionManage',
                        meta: {
                            title: "方向选择未完成"
                        },
                        component: () => import("@/views/admin/trainingManage/TrainingDirectionManage"),
                    },
                    {
                        path: 'trainingDirectionFinished',
                        name: 'trainingDirectionFinished',
                        meta: {
                            title: "方向选择已完成"
                        },
                        component: () =>import("@/views/admin/trainingManage/TrainingDirectionFinished"),
                    },
                    {
                        path: 'ChangeDirectionManage',
                        name: 'ChangeDirectionManage',
                        meta: {
                            title: "申请修改方向",
                        },
                        component: ()=> import("@/views/admin/trainingManage/ChangeDirectionManage"),
                    },
                    {
                        path: 'companyVideoManage',
                        name: 'companyVideoManage',
                        meta: {
                            title: "视频信息管理"
                        },
                        component: () => import("@/views/company/video/CompanyVideoManage"),
                    },
                ]
            },
            {
                path: "userManage",
                name: "userManage",
                meta: {
                    title: "用户管理",
                    icon: "el-icon-user",
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'studentUserManage',
                        name: 'studentUserManage',
                        meta: {
                            title: "学生信息管理"
                        },
                        component: () => import("@/views/admin/userManage/StudentUserManage"),
                    },
                    {
                        path: 'companyUserManage',
                        name: 'companyUserManage',
                        meta: {
                            title: "企业用户管理",
                        },
                        component: () => import("@/views/admin/userManage/CompanyUserManage"),
                    },
                    {
                        path: 'teacherUserManage',
                        name: 'teacherUserManage',
                        meta: {
                            title: "教师用户管理",
                        },
                        component: () =>import("@/views/admin/userManage/TeacherUserManage"),
                    },
                    {
                        path: 'trainingClassManage',
                        name: 'trainingClassManage',
                        meta: {
                            title: "实训班级管理",
                        },
                        component: () => import("@/views/admin/userManage/TrainingClassManage"),
                    },
                ]
            },
            {
                path: "basicManage",
                name: "basicManage",
                meta: {
                    title: "基础设置",
                    icon: "el-icon-setting",
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'passwordChange',
                        name: 'passwordChange',
                        meta: {
                            title: "修改密码"
                        },
                        component: ()=>import("@/components/PasswordChange"),
                    },
                    {
                        path: 'commomSet',
                        name: 'commomSet',
                        meta: {
                            title: "通用设置"
                        },
                        component: () => import("@/views/admin/basicManage/CommonSet"),
                    },
                ]
            },
        ]

    }];
role['company'] = [
    {
        path: '/company',
        name: 'company',
        component: ()=>import("@/views/Index"),
        redirect: '/company/lecture/companyLectureManage',
        children: [
            {
                path: "lecture",
                name: "lecture",
                meta: {
                    title: "讲座管理",
                    icon: "el-icon-reading"
                },
                component: () => import("@/views/company/Company"),
                children: [
                    {
                        path: 'companyLectureManage',
                        name: 'companyLectureManage',
                        meta: {
                            title: "讲座信息管理"
                        },
                        component: () => import("@/views/company/lecture/CompanyLectureManage"),
                    },
                ]
            },
            {
                path: "video",
                name: "video",
                meta: {
                    title: "视频管理",
                    icon: "el-icon-video-camera"
                },
                component: () => import("@/views/company/Company"),
                children: [
                    {
                        path: 'companyVideoManage',
                        name: 'companyVideoManage',
                        meta: {
                            title: "视频信息管理"
                        },
                        component: () => import("@/views/company/video/CompanyVideoManage"),
                    },
                ]
            },
            {
                path: "basicManage",
                name: "basicManage",
                meta: {
                    title: "基础设置",
                    icon: "el-icon-setting",
                },
                component: () => import("@/views/company/Company"),
                children: [
                    {
                        path: 'passwordChange',
                        name: 'passwordChange',
                        meta: {
                            title: "修改密码"
                        },
                        component: ()=>import("@/components/PasswordChange"),
                    }
                ]
            },
        ]

    }];
role['class'] = [
    {
        path: '/class',
        name: 'class',
        component: ()=>import("@/views/Index"),
        redirect: '/class/attendance/attendanceStatistics',
        children: [
            {
                path: "attendance",
                name: "attendance",
                meta: {
                    title: "考勤管理",
                    icon: "el-icon-date"
                },
                component: () => import("@/views/class/Class"),
                children: [
                    {
                        path: 'attendanceStatistics',
                        name: 'attendanceStatistics',
                        meta: {
                            title: "考勤数据统计"
                        },
                        component: () => import("@/views/class/attendance/AttendanceStatistics"),
                    },
                    {
                        path: 'currentAttendance',
                        name: 'currentAttendance',
                        meta: {
                            title: "当前考勤数据"
                        },
                        component: () =>import("@/views/class/attendance/CurrentAttendance"),
                    },
                    {
                        path: 'attendanceManage',
                        name: 'attendanceManage',
                        meta: {
                            title: "添加考勤"
                        },
                        component: () => import("@/views/class/attendance/AttendanceManage"),
                    },
                ]
            },
            {
                path: "video",
                name: "video",
                meta: {
                    title: "视频管理",
                    icon: "el-icon-video-camera"
                },
                component: () => import("@/views/company/Company"),
                children: [
                    {
                        path: 'curriculumManage',
                        name: 'curriculumManage',
                        meta: {
                            title: "课程管理"
                        },
                        component: () => import("@/views/class/video/CurriculumManage"),
                    },
                    {
                        path: 'videoManage',
                        name: 'videoManage',
                        meta: {
                            title: "视频信息管理"
                        },
                        component: () => import("@/views/class/video/VideoManage"),
                    },
                ]
            },
            {
                path: "basicManage",
                name: "basicManage",
                meta: {
                    title: "基础设置",
                    icon: "el-icon-setting",
                },
                component: () => import("@/views/company/Company"),
                children: [
                    {
                        path: 'passwordChange',
                        name: 'passwordChange',
                        meta: {
                            title: "修改密码"
                        },
                        component: ()=>import("@/components/PasswordChange"),
                    }
                ]
            },
        ]

    }];
role['teacher'] = [
    {
        path: '/teacher',
        name: 'teacher',
        component: ()=>import("@/views/Index"),
        redirect: '/teacher/lecture/noFinished',
        children: [
            {
                path: "lecture",
                name: "lecture",
                meta: {
                    title: "讲座管理",
                    icon: "el-icon-reading"
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'noFinished',
                        name: 'noFinished',
                        meta: {
                            title: "选择未完成"
                        },
                        component: ()=> import("@/views/admin/lecture/LectureNoFinished"),
                    },
                    {
                        path: 'finished',
                        name: 'finished',
                        meta: {
                            title: "选择已完成",
                        },
                        component: ()=> import("@/views/admin/lecture/LectureFinished"),
                    },
                    {
                        path: 'lectureSelected',
                        name: 'lectureSelected',
                        meta: {
                            title: "按讲座汇总"
                        },
                        component: ()=> import("@/views/admin/lecture/LectureSelected"),
                    },
                    {
                        path: 'teacherLectureManage',
                        name: 'teacherLectureManage',
                        meta: {
                            title: "讲座信息查看"
                        },
                        component: ()=> import("@/views/teacher/lecture/TeacherLectureManage"),
                    }
                ]
            },
            {
                path: "practicalTraining",
                name: "practicalTraining",
                meta: {
                    title: "实训管理",
                    icon: "el-icon-edit-outline",
                },
                component: () => import("@/views/admin/Admin"),
                children: [
                    {
                        path: 'trainingDirectionManage',
                        name: 'trainingDirectionManage',
                        meta: {
                            title: "方向选择未完成"
                        },
                        component: () => import("@/views/admin/trainingManage/TrainingDirectionManage"),
                    },
                    {
                        path: 'trainingDirectionFinished',
                        name: 'trainingDirectionFinished',
                        meta: {
                            title: "方向选择已完成"
                        },
                        component: () =>import("@/views/admin/trainingManage/TrainingDirectionFinished"),
                    },
                ]
            },
            {
                path: "basicManage",
                name: "basicManage",
                meta: {
                    title: "基础设置",
                    icon: "el-icon-setting",
                },
                component: () => import("@/views/company/Company"),
                children: [
                    {
                        path: 'passwordChange',
                        name: 'passwordChange',
                        meta: {
                            title: "修改密码"
                        },
                        component: ()=>import("@/components/PasswordChange"),
                    }
                ]
            },
        ]

    }];

role['student'] = [{
    path: '/student',
    name: 'student',
    component: () => import("@/views/student/Student"),
    redirect: '/student/welcome',
    children: [
        {
            path: "welcome",
            name: "welcome",
            meta: {
                title: "首页",
            },
            component: () => import("@/views/student/welcome/StudentIndex"),
        },
        {
            path: "studentLectureList",
            name: "studentLectureList",
            meta: {
                title: "讲座选择",
            },
            component: () => import("@/views/student/welcome/StudentLectureList"),
        },
        {
            path: "studentVideoList",
            name: "studentVideoList",
            meta: {
                title: "视频资源",
            },
            component: () => import("@/views/student/welcome/StudentVideList"),
        },
        {
            path: "studentTrainingDirection",
            name: "studentTrainingDirection",
            meta: {
                title: "实训方向",
            },
            component: () => import("@/views/student/welcome/StudentTrainingDirection"),
        },
        {
            path: "studentTrainingManage",
            name: "studentTrainingManage",
            meta: {
                title: "实训管理",
            },
            component: () => import("@/views/student/welcome/StudentTrainingManage"),
        },
    ]
}];
export default new Vuex.Store({
    state: {
        routeData: []
    },
    mutations: {
        updateRouteData(state, obj) {
            sessionStorage.setItem('route', obj);
            let routes = role[obj];
            state.routeData = routes;
            router.addRoutes(routes);
            router.push({name: obj});
        }
    },
    actions: {},
    modules: {}
})
