<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-sub-menu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                                v-permiss="item.permiss"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index" v-permiss="item.permiss">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: '系统首页',
        permiss: '1',
    },
    {
        icon: 'Calendar',
        index: '1',
        title: '表格相关',
        permiss: '2',
        subs: [
            {
                index: '/table',
                title: '常用表格',
                permiss: '2',
            },
            {
                index: '/import',
                title: '导入Excel',
                permiss: '2',
            },
            {
                index: '/export',
                title: '导出Excel',
                permiss: '2',
            },
        ],
    },
    {
        icon: 'DocumentCopy',
        index: '/tabs',
        title: 'tab选项卡',
        permiss: '3',
    },
    {
        icon: 'Edit',
        index: '3',
        title: '表单相关',
        permiss: '4',
        subs: [
            {
                index: '/form',
                title: '基本表单',
                permiss: '5',
            },
            {
                index: '/upload',
                title: '文件上传',
                permiss: '6',
            },
            {
                index: '4',
                title: '三级菜单',
                permiss: '7',
                subs: [
                    {
                        index: '/editor',
                        title: '富文本编辑器',
                        permiss: '8',
                    },
                    {
                        index: '/markdown',
                        title: 'markdown编辑器',
                        permiss: '9',
                    },
                ],
            },
        ],
    },
    {
        icon: 'Setting',
        index: '/icon',
        title: '自定义图标',
        permiss: '10',
    },
    {
        icon: 'PieChart',
        index: '/charts',
        title: 'schart图表',
        permiss: '11',
    },
    {
        icon: 'Warning',
        index: '/permission',
        title: '权限管理',
        permiss: '13',
    },
    {
        icon: 'CoffeeCup',
        index: '/donate',
        title: '支持作者',
        permiss: '14',
    },
  {
    icon: 'CoffeeCup',
    index: '/ManagerHomePage',
    title: '首页',
    permiss: 'teacher-question',
  },
    //管理员学校信息管理
  {
    icon: 'CoffeeCup',
    index: '/SchoolInfoManage',
    title: '学校信息管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/SchoolManage',
        title: '首页图片设置',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/SchoolDetail',
        title: '学校详情',
        permiss: 'teacher-question',
      },
    ]
  },
    //管理员学院管理
  {
    icon: 'CoffeeCup',
    index: '/DepartmentManage',
    title: '学院信息管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/DepartmentList',
        title: '学院列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/DepartmentDetail',
        title: '学院详情',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/DepartmentMajor',
        title: '学院专业',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/DepartmentCreate',
        title: '创建学院',
        permiss: 'teacher-question',
      },
    ]
  },
    //管理员专业管理
  {
    icon: 'CoffeeCup',
    index: '/MajorManage',
    title: '专业信息管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/MajorList',
        title: '专业列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/MajorDetail',
        title: '专业详情',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/MajorClass',
        title: '专业班级',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/MajorCreate',
        title: '创建专业',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员教师管理
  {
    icon: 'CoffeeCup',
    index: '/TeacherManage',
    title: '教师管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/TeacherList',
        title: '教师列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/TeacherDetail',
        title: '教师详情',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/TeacherCreate',
        title: '教师创建',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员学生管理
  {
    icon: 'CoffeeCup',
    index: '/StudentManage',
    title: '学生管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/StudentList',
        title: '学生列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/StudentDetail',
        title: '学生详情',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/StudentCreate',
        title: '学生创建',
        permiss: 'teacher-question',
      },
    ]
  },
    //管理员班级管理
  {
    icon: 'CoffeeCup',
    index: '/ClassManage',
    title: '班级信息管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/ClassList',
        title: '班级列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/ClassDetail',
        title: '班级详情',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/ClassStudent',
        title: '班级学生',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/ClassCourse',
        title: '班级课程',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/ClassCreate',
        title: '创建班级',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员课程管理
  {
    icon: 'CoffeeCup',
    index: '/CourseManage',
    title: '课程信息管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/CourseList',
        title: '课程列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/CourseDetail',
        title: '课程详情',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/CourseStudent',
        title: '课程学生',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/TeacherApplyCourse',
        title: '课程申请',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/TeacherApplyCourseDetail',
        title: '课程申请详情',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员题库管理
  {
    icon: 'CoffeeCup',
    index: '/QuestionManage',
    title: '题库管理',
    permiss: 'teacher-question',
    subs: [
      {
        icon: 'CoffeeCup',
        index: '/ManageQuestionList',
        title: '题目列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/CreateRadioQuestion',
        title: '单选题创编',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/MultipleChoiceQuestions',
        title: '多选题创编',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/FillInBlanksQuestion',
        title: '填空题创编',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/ShortAnswerQuestion',
        title: '简答题创编',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/TrueOrFalseQuestion',
        title: '判断题创编',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员组卷管理
  {
    icon: 'CoffeeCup',
    index: '/GroupScrollManage',
    title: '组卷管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/ExamList',
        title: '考试列表',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/PracticeList',
        title: '练习列表',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员教师管理
  {
    icon: 'CoffeeCup',
    index: '/VideoManage',
    title: '视频管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/VideoManage',
        title: '视频管理',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员敏感词管理
  {
    icon: 'CoffeeCup',
    index: '/SensityManage',
    title: '敏感词管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/SensityList',
        title: '敏感词列表',
        permiss: 'teacher-question',
      },
    ]
  },
  //管理员用户管理
  {
    icon: 'CoffeeCup',
    index: '/UserLoginLog',
    title: '用户登录管理',
    permiss: 'teacher-question',
    subs:[
      {
        icon: 'CoffeeCup',
        index: '/LoginLog',
        title: '登录记录',
        permiss: 'teacher-question',
      },
      {
        icon: 'CoffeeCup',
        index: '/OnlineUserManage',
        title: '用户在线管理',
        permiss: 'teacher-question',
      },
    ]
  },
];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
/deep/ .el-menu-item{
  font-size: 18px;
}
/deep/.el-sub-menu__title{
  font-size: 18px;
}
</style>
