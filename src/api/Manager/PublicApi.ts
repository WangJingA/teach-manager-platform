import request from "../../utils/request";

/**
 * 学校下拉列表
 */
export const schoolList = ()=>{
    return request({
        url:'passUse/schoolList',
        method:"post"
    })
}
/**
 * 学院下拉列表
 * @param schoolUid
 */
export const distinctDep = (schoolUid:any)=>{
    return request({
        url:'passUse/distinctDep?schoolUid='+schoolUid,
        method:"post"
    })
}

/**
 * 上传文件
 * @param data
 */
export const uploadIcon = (data:any)=>{
    return request({
        url:'passUse/uploadIcon',
        method:"post",
        data:data
    })
}

/**
 * 班级下拉列表
 * @param majorUid
 */
export const classList = (majorUid:any)=>{
    return request({
        url:'passUse/classList?majorUid='+majorUid,
        method:"post",
    })
}
/**
 * 专业下拉列表
 * @param departmentUid
 */
export const majorList = (departmentUid:any)=>{
    return request({
        url:'passUse/majorList?departmentUid='+departmentUid,
        method:"post",
    })
}