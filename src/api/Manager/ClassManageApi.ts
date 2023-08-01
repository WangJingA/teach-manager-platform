import request from '../../utils/request';

/**
 * 创建班级
 * @param data
 */
export const classCreate = (data:any)=>{
    return request({
        url:'/manager/createClass',
        method:'post',
        data:data
    })
}

/**
 * 班级列表
 * @param data
 */
export const classList = (data:any)=>{
    return request({
        url:'/manager/listClass',
        method:'post',
        data:data
    })
}

/**
 * 更新
 * @param data
 */
export const editClass = (data:any)=>{
    return request({
        url:'/manager/editClass',
        method:'post',
        data:data
    })
}