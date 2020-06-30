// 集中管理所有api
export default {
    LOGIN: '/auth/login',
    ResetPassword: '/user/password/reset',
    PasswordChange: '/user/password/change',
    Captcha: '/auth/kaptcha',
    OSSToken: '/oss/signature/lecture-img',
    OSSToken1:'/oss/signature/course-video',
    OSSTestVideo:'/oss/test/video-url',
    LectureCover: '/upload',

    //首页echars图表
    DbarDataFirst:'/direction/statistics-of-first',
    DbarDataSecond:'/direction/statistics-of-second',
    PieData: '/plan/selectnum',
    BarData:'/lecture/statistics-of-lecture?from=1',

    //管理员
    CompanyData: '/staff/select',
    StudentData: '/student/select',
    AddTeacher: '/teacher/add',
    GetTeacher: '/teacher/select',
    AddCompany: '/staff/add',
    AddStudent: '/student/add',
    GetCompanyByName: '/auth/getCompanyByName',
    EditCompany: '/auth/editCompany',
    EditStudent: '/auth/editStudent',
    DelCompany: '/auth/delCompany',
    DelStudent: '/auth/delStudent',
    SwitchStatus:'/switch/all-status',
    SwitchClose:'/switch/close',
    SwitchOpen:'/switch/open',


    //学院方向管理
    GetCollegeDirection: '/major/select',
    AddCollegeDirection: '/major/add',
    DelCollegeDirection: '/major/delete',
    EditCollegeDirection: '/major/update',

    // 学院班级管理
    GetCollegeClass: '/major-class/select',
    AddCollegeClass: '/major-class/add',
    EditCollegeClass: '/major-class/update',
    DelCollegeClass: '/major-class/delete',


    //实训方向管理
    GetTrainingDirection: '/direction/select',
    AddTrainingDirection: '/direction/add',
    DelTrainingDirection: '/direction/delete',
    EditTrainingDirection: '/direction/update',
    TrainingDirectionFinished: '/direction/statistics-of-complete',
    TrainingDirectionNoFinished: '/direction/statistics-of-incomplete',
    ChangeDirectionManage:'/direction/application-of-student',
    AgreeChangeDirection:'/direction/agree-application',
    RejectChangeDirection:'/direction/reject-application',

    // 实训班级管理
    GetTrainingClass: '/direction-class/select',
    GetTrainingClassList: '/direction-class/select-all',
    AddTrainingClass: '/direction-class/add',
    EditTrainingClass: '/direction-class/update',
    DelTrainingClass: '/auth/delTrainingClass',

    //获取讲座与方向选择控制
    GetControls: '/auth/getControls',
    ChangeControls: '',

    //获取未来计划
    GetPlan: '/plan/all',
    EditPlan: '/plan/update',
    AddPlan: '/plan/add',
    DelPlan: '/plan/delete',

    //讲座管理
    LectureNoFinishedData: '/lecture/statistics-of-incomplete',
    LectureFinishedData: '/lecture/statistics-of-complete',
    LectureFinishedDataDownload:'/direction/statistics-of-complete',
    EditLectureSite: '/lecture/update',
    LectureSelectedData:'/lecture/statistics-of-lecture',
    GetCompanyList: '/staff/select',
    LectureData: '/lecture/select-of-mange',


    //企业
    CompanyLectureData: '/lecture/select-of-mange',
    AddCompanyLecture: '/lecture/add',
    EditCompanyLecture: '/lecture/update',
    DelCompanyLecture: '/lecture/delete',


    //实训班级
    AddCurriculum:'/curriculum/add',
    GetCurriculumData:'/curriculum/select-own',
    GetCurriculumList:'/curriculum/list-own',
    AdminGetCurriculumList:'/curriculum/list-all',

    GetVideoData:'/video/select-own',
    AdminGetVideo:'/video/select-all',
    CompanyGetVideo:'/video/select-company',
    AddVideo:'/video/add',
}