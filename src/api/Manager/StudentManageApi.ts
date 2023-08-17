import request from '../../utils/request';

export const importStuList = (data:any)=>{
    return request({
        url:'/manager/importStuList',
        method:'post',
        data:data
    })
}