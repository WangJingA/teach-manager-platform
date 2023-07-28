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
