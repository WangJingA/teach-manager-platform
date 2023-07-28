import request from '../../utils/request';

/**
 * 上传文件，多文件上传
 * @param schoolUid
 * @param data
 */
export const schoolImages = (schoolUid:any,data:any)=>{
    return request({
        url:'/manager/uploadSchoolIm?schoolUid='+schoolUid,
        method:'post',
        data:data
    })
}

export const listImages = (schoolUid:any)=>{
    return request({
        url:'/manager/listImages?schoolUid='+schoolUid,
        method:'post',
    })
}

export const delImage = (schoolUid:any,imageUrl:any)=>{
    return request({
        url:'/manager/delImages?schoolUid='+schoolUid+"&imageUrl="+imageUrl,
        method:'post',
    })
}