import request from '../../utils/request';

/**
 * 新增专业
 * @param data
 */
export const addMajor = (data:any)=>{
    return request({
        url:'/manager/addMajor',
        method:"post",
        data:data
    })
}

/**
 * 更新专业
 */
export const updateMajor = (data:any)=>{
    return request({
        url:'/manager/updateMajor',
        method:'post',
        data:data
    })
}

/**
 * 删除专业
 */
export const delMajor = (uuid:any)=>{
    return request({
        url:'/manager/delMajor?uuid='+uuid,
        method:"post",
    })
}
/**
 * 查询专业
 */
export const listMajor = (data:any)=>{
    return request({
        url:'/manager/listMajor',
        method:"post",
        data:data
    })
}