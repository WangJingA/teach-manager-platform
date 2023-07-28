import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';
import {manager} from "../store/manager";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/table',
                name: 'basetable',
                meta: {
                    title: '表格',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/table.vue'),
            },
            {
                path: '/charts',
                name: 'basecharts',
                meta: {
                    title: '图表',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
            },
            {
                path: '/form',
                name: 'baseform',
                meta: {
                    title: '表单',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/form.vue'),
            },
            {
                path: '/tabs',
                name: 'tabs',
                meta: {
                    title: 'tab标签',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
            },
            {
                path: '/donate',
                name: 'donate',
                meta: {
                    title: '鼓励作者',
                    permiss: '14',
                },
                component: () => import(/* webpackChunkName: "donate" */ '../views/donate.vue'),
            },
            {
                path: '/permission',
                name: 'permission',
                meta: {
                    title: '权限管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "permission" */ '../views/permission.vue'),
            },
            {
                path: '/upload',
                name: 'upload',
                meta: {
                    title: '上传插件',
                    permiss: '6',
                },
                component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue'),
            },
            {
                path: '/icon',
                name: 'icon',
                meta: {
                    title: '自定义图标',
                    permiss: '10',
                },
                component: () => import(/* webpackChunkName: "icon" */ '../views/icon.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/editor.vue'),
            },
            {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
            },
            {
                path: '/export',
                name: 'export',
                meta: {
                    title: '导出Excel',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
            },
            {
                path: '/import',
                name: 'import',
                meta: {
                    title: '导入Excel',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "import" */ '../views/import.vue'),
            },
            //管理员首页
            {
                path:'/ManagerHomePage',
                name:'ManagerHomePage',
                meta:{
                    title: '管理员首页',
                },
                component:() => import('../views/manager/ManagerHomePage.vue')
            },
            //管理员学校信息管理
            {
              path: '/SchoolInfoManage',
                name:'SchoolInfoManage',
                meta:{
                  title: '学校信息管理',
                },
                children:[
                    {
                        path: '/SchoolManage',
                        name: 'SchoolManage',
                        meta: {
                            title: '学校首页图片信息',
                        },
                        component:()=>import('../views/manager/SchoolInfoManage/SchoolManage.vue')
                    },
                    {
                        path: '/SchoolDetail',
                        name: 'SchoolDetail',
                        meta: {
                            title: '学校信息统计',
                        },
                        component:()=>import('../views/manager/SchoolInfoManage/SchoolDetail.vue')
                    }
                ]
            },
            //管理员班级管理
            {
                path:'/ClassManage',
                name:'ClassManage',
                meta:{
                    title: '班级管理',
                },
                children:[
                    {
                        path: '/ClassList',
                        name: 'ClassList',
                        meta: {
                            title: '班级列表'
                        },
                        component:() => import('../views/manager/ClassManage/ClassList.vue')
                    },
                    {
                        path: '/ClassDetail',
                        name: 'ClassDetail',
                        meta: {
                            title: '班级详情'
                        },
                        component:() => import('../views/manager/ClassManage/ClassDetail.vue')
                    },
                    {
                        path: '/ClassStudent',
                        name: 'ClassStudent',
                        meta: {
                            title: '班级学生'
                        },
                        component:() => import('../views/manager/ClassManage/ClassStudent.vue')
                    },
                    {
                        path: '/ClassCreate',
                        name: 'ClassCreate',
                        meta: {
                            title: '创建班级'
                        },
                        component:() => import('../views/manager/ClassManage/ClassCreate.vue')
                    },
                    {
                        path: '/ClassCourse',
                        name: 'ClassCourse',
                        meta: {
                            title: '班级课程'
                        },
                        component:() => import('../views/manager/ClassManage/ClassCourse.vue')
                    },
                ]
            },
            //管理员学院管理
            {
                path:'/DepartmentManage',
                name:'DepartmentManage',
                meta:{
                    title: '学院管理',
                },
                children:[
                    {
                        path: '/DepartmentList',
                        name: 'DepartmentList',
                        meta: {
                            title: '学院列表'
                        },
                        component:() => import('../views/manager/DepartmentManage/DepartmentList.vue')
                    },
                    {
                        path: '/DepartmentDetail',
                        name: 'DepartmentDetail',
                        meta: {
                            title: '学院详情'
                        },
                        component:() => import('../views/manager/DepartmentManage/DepartmentDetail.vue')
                    },
                    {
                        path: '/DepartmentMajor',
                        name: 'DepartmentMajor',
                        meta: {
                            title: '学院专业'
                        },
                        component:() => import('../views/manager/DepartmentManage/DepartmentMajor.vue')
                    },
                    {
                        path: '/DepartmentCreate',
                        name: 'DepartmentCreate',
                        meta: {
                            title: '创建学院'
                        },
                        component:() => import('../views/manager/DepartmentManage/DepartmentCreate.vue')
                    },
                ]
            },
            //管理员专业管理
            {
                path:'/MajorManage',
                name:'MajorManage',
                meta:{
                    title: '专业管理',
                },
                children:[
                    {
                        path: '/MajorList',
                        name: 'MajorList',
                        meta: {
                            title: '专业列表'
                        },
                        component:() => import('../views/manager/MajorManage/MajorList.vue')
                    },
                    {
                        path: '/MajorDetail',
                        name: 'MajorDetail',
                        meta: {
                            title: '专业详情'
                        },
                        component:() => import('../views/manager/MajorManage/MajorDetail.vue')
                    },
                    {
                        path: '/MajorClass',
                        name: 'MajorClass',
                        meta: {
                            title: '专业班级'
                        },
                        component:() => import('../views/manager/MajorManage/MajorClass.vue')
                    },
                    {
                        path: '/MajorCreate',
                        name: 'MajorCreate',
                        meta: {
                            title: '创建专业'
                        },
                        component:() => import('../views/manager/MajorManage/MajorCreate.vue')
                    },
                ]
            },
            //管理员课程管理
            {
                path:'/CourseManage',
                name:'CourseManage',
                meta:{
                    title: '课程管理',
                },
                children:[
                    {
                        path: '/CourseList',
                        name: 'CourseList',
                        meta: {
                            title: '课程列表'
                        },
                        component:() => import('../views/manager/CourseManage/CourseList.vue')
                    },
                    {
                        path: '/CourseDetail',
                        name: 'CourseDetail',
                        meta: {
                            title: '课程详情'
                        },
                        component:() => import('../views/manager/CourseManage/CourseDetail.vue')
                    },
                    {
                        path: '/CourseStudent',
                        name: 'CourseStudent',
                        meta: {
                            title: '课程学生'
                        },
                        component:() => import('../views/manager/CourseManage/CourseStudent.vue')
                    },
                    {
                        path: '/TeacherApplyCourse',
                        name: 'TeacherApplyCourse',
                        meta: {
                            title: '开课申请'
                        },
                        component:() => import('../views/manager/CourseManage/TeacherApplyCourse.vue')
                    },
                    {
                        path: '/TeacherApplyCourseDetail',
                        name: 'TeacherApplyCourseDetail',
                        meta: {
                            title: '开课详情'
                        },
                        component:() => import('../views/manager/CourseManage/TeacherApplyCourseDetail.vue')
                    },
                    {
                        path: '/CourseCreate',
                        name: 'CourseCreate',
                        meta: {
                            title: '创建课程'
                        },
                        component:() => import('../views/manager/CourseManage/CourseCreate.vue')
                    },
                ]
            },
            //管理员题目创编
            {
                path:'/Question',
                name:'Question',
                meta:{
                    title: '题目创编',
                },

                children:[
                    {
                        path:'/ManageQuestionList',
                        name:'ManageQuestionList',
                        meta:{
                            title: '问题列表',
                        },
                        component:() => import('../views/manager/QuestionManage/QuestionList.vue')
                    },
                    {
                        path:'/CreateRadioQuestion',
                        name:'CreateRadioQuestion',
                        meta:{
                            title: '单选题创编',
                        },
                        component:() => import('../views/manager/QuestionManage/CreateRadioQuestion.vue')
                    },
                    {
                        path:'/FillInBlanksQuestion',
                        name:'FillInBlanksQuestion',
                        meta:{
                            title: '填空题创编',
                        },
                        component:() => import('../views/manager/QuestionManage/FillInBlanksQuestion.vue')
                    },
                    {
                        path:'/MultipleChoiceQuestions',
                        name:'MultipleChoiceQuestions',
                        meta:{
                            title: '多选题创编',
                        },
                        component:() => import('../views/manager/QuestionManage/MultipleChoiceQuestions.vue')
                    },
                    {
                        path:'/ShortAnswerQuestion',
                        name:'ShortAnswerQuestion',
                        meta:{
                            title: '简答题创编',
                        },
                        component:() => import('../views/manager/QuestionManage/ShortAnswerQuestion.vue')
                    },
                    {
                        path:'/TrueOrFalseQuestion',
                        name:'TrueOrFalseQuestion',
                        meta:{
                            title: '判断题创编',
                        },
                        component:() => import('../views/manager/QuestionManage/TrueOrFalseQuestion.vue')
                    },
                ]
            },
            //管理员组卷管理
            {
                path:'/GroupScrollManage',
                name:'GroupScrollManage',
                meta:{
                    title: '组卷管理',
                },
                children:[
                    {
                        path:'/ExamList',
                        name:'ExamList',
                        meta:{
                            title: '考试组卷',
                        },
                        component:() => import('../views/manager/GroupScrollManage/ExamList.vue')
                    },
                    {
                        path:'/PracticeList',
                        name:'PracticeList',
                        meta:{
                            title: '练习题创编',
                        },
                        component:() => import('../views/manager/GroupScrollManage/PracticeList.vue')
                    },
                ]
            },
            //管理员学生管理
            {
                path:'/StudentManage',
                name:'StudentManage',
                meta:{
                    title: '学生管理',
                },
                children:[
                    {
                        path:'/StudentList',
                        name:'StudentList',
                        meta:{
                            title: '学生列表',
                        },
                        component:() => import('../views/manager/StudentManage/StudentList.vue')
                    },
                    {
                        path:'/StudentDetail',
                        name:'StudentDetail',
                        meta:{
                            title: '学生详情',
                        },
                        component:() => import('../views/manager/StudentManage/StudentDetail.vue')
                    },
                    {
                        path:'/StudentCreate',
                        name:'StudentCreate',
                        meta:{
                            title: '学生详情',
                        },
                        component:() => import('../views/manager/StudentManage/StudentCreate.vue')
                    },
                ]
            },
            //管理员教师管理
            {
                path:'/TeacherManage',
                name:'TeacherManage',
                meta:{
                    title: '教师管理',
                },
                children:[
                    {
                        path:'/TeacherList',
                        name:'TeacherList',
                        meta:{
                            title: '教师列表',
                        },
                        component:() => import('../views/manager/TeacherManage/TeacherList.vue')
                    },
                    {
                        path:'/TeacherDetail',
                        name:'TeacherDetail',
                        meta:{
                            title: '教师详情',
                        },
                        component:() => import('../views/manager/TeacherManage/TeacherDetail.vue')
                    },
                    {
                        path:'/TeacherCreate',
                        name:'TeacherCreate',
                        meta:{
                            title: '教师创建',
                        },
                        component:() => import('../views/manager/TeacherManage/TeacherCreate.vue')
                    },
                ]
            },
            //管理员用户登录管理
            {
                path:'/UserLoginLog',
                name:'UserLoginLog',
                meta:{
                    title: '登录管理',
                },
                children:[
                    {
                        path:'/LoginLog',
                        name:'LoginLog',
                        meta:{
                            title: '教师列表',
                        },
                        component:() => import('../views/manager/UserLoginLog/LoginLog.vue')
                    },
                    {
                        path:'/OnlineUserManage',
                        name:'OnlineUserManage',
                        meta:{
                            title: '在线用户',
                        },
                        component:() => import('../views/manager/UserLoginLog/OnlineUserManage.vue')
                    },
                ]
            },
            //管理员视频管理
            {
                path:'/VideoManage',
                name:'VideoManage',
                meta:{
                    title: '视频管理',
                },
                children:[
                    {
                        path:'/VideoManage',
                        name:'VideoManage',
                        meta:{
                            title: '视频管理',
                        },
                        component:() => import('../views/manager/VideoManage/VideoManage.vue')
                    },
                ]
            },
            //管理员管理敏感词
            {
                path:'/SentityManage',
                name:'SentityManage',
                meta:{
                    title: '敏感词管理',
                },
                children:[
                    {
                        path:'/SensityList',
                        name:'SensityList',
                        meta:{
                            title: '敏感词管理',
                        },
                        component:() => import('../views/manager/SensityWorkManage/SensityList.vue')
                    },
                ]
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const managerInfo = manager()
    const whiteList = ["/login"]
    if (managerInfo.token ){
        //token存在，返回登录页面路由，设置回到登录页面
        if (to.path === '/login' || managerInfo.token === ''){
            next("/login")
        }
    }else {
        //白名单，登录时没有token，直接放行
        if (whiteList.indexOf(to.path)>-1){
            next()
        }else{
            //非登录路由，token不存在，返回登录页面
            next("/login")
        }
    }
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    }

    // else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    //     // 如果没有权限，则进入403
    //     next('/403');
    // }
    else {
        next();
    }
});

export default router;
