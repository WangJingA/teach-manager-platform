import {defineStore} from "pinia";
import {ref} from "vue";

    export const manager = defineStore("managerInfo",()=>{
    const token = ref<string>('')
    const role = ref<string>('')
    const schoolUid = ref<string>()

    const setSchoolUid = (data: string) => {
        schoolUid.value = data

    }
    const setToken = (data: string) => {
        token.value = data

    }
    const setRole = (data: string) => {
        role.value = data

    }
    return {
        token,
        role,
        schoolUid,
        setToken,
        setRole,
        setSchoolUid
    }
},{
    //@ts-ignore
        persist: {
            storage: sessionStorage
        }
    }
)