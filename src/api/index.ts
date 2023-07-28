import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};

export const managerLogin=(data:any)=>{
    return request({
        url:'manager/login',
        method:"post",
        data:data
    })
}

export const loginCallBack=(uuid:string)=>{
    return request({
        url:'manager/backCall?uuid='+uuid,
        method:"post",
    })
}
