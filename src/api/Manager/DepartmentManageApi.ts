import request from '../../utils/request';

/**
 * 创建学院
 */
export const createDepartment=(data:any)=>{
    return request({
        url:'/manager/createDep',
        method:"post",
        data:data
    })
}
/**
 * 学校学院列表
 * @param data
 */
export const listDepartment=(data:any)=>{
    return request({
        url:'/manager/listDep',
        method:"post",
        data:data
    })
}
/**
 * 退出登录
 */
export const loginOut=()=>{
    return request({
        url:'/manager/loginOut',
        method:'post'
    })
}