import * as API from "api/config.json";
import * as Path from "api/path.json";
import { ajax } from "common";

export function login(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.token,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}

// 专家列表
export function expertList(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertList,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}

// 专家删除
export function expertDelete(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertDelete,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 删除专家教育经历
export function expertDeleteEduExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertDeleteEduExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 删除专家总体介绍
export function expertDeleteGeneralComments(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertDeleteGeneralComments,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 删除专家注释记录
export function expertDeleteNotes(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertDeleteNotes,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 删除专家工作经验
export function expertDeleteWorkExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertDeleteWorkExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 创建专家，填写基础信息
export function expertCreate(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertCreate,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 创建专家教育信息
export function expertCreateEduExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertCreateEduExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 创建专家总体介绍
export function expertCreateGeneralComments(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertCreateGeneralComments,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 创建专家注释记录
export function expertCreateNotes(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertCreateNotes,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 创建专家工作经验
export function expertCreateWorkExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertCreateWorkExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改联系人
export function expertUpdateContactInfo(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateContactInfo,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改教育经历
export function expertUpdateEduExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateEduExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改财富信息
export function expertUpdateFinanceInfo(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateFinanceInfo,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改大体经历
export function expertUpdateGeneralComments(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateGeneralComments,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改身份信息
export function expertUpdateIdentityInfo(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateIdentityInfo,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改基本信息
export function expertUpdateMeta(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateMeta,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改注释记录
export function expertUpdateNotes(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateNotes,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 修改简历
export function expertUpdateResume(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateResume,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 修改工作经历
export function expertUpdateWorkExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertUpdateWorkExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
} 
// 获取专家meta信息
export function expertGetMeta(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetMeta,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家联系人信息
export function expertGetContactInfo(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetContactInfo,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家教育信息
export function expertGetEducationExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetEducationExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家财富信息
export function expertGetFinanceInfo(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetFinanceInfo,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家总体介绍
export function expertGetGeneralComments(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetGeneralComments,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家身份信息
export function expertGetIdentityInfo(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetIdentityInfo,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家注释记录
export function expertGetNotes(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetNotes,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家简历
export function expertGetResume(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetResume,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}
// 获取专家工作信息
export function expertGetWorkExp(param, options, success, error, others) {
    const _options = options || {}
    return ajax({
        url: Path.api + API.expertGetWorkExp,
        contentType: _options.contentType || "application/x-www-form-urlencoded",
        type: _options.type || "GET",
        data: param,
        success: success,
        error: error,
        ...others
    });
}

// export function all(loanId?: string, success?: (data: Result<OrderAllInfoVO>["data"], response: Result<OrderAllInfoVO>, xhr: any) => void, error?: (message: Result<OrderAllInfoVO>["message"], response: Result<OrderAllInfoVO>, xhr: any) => void, options?: any): Promise<Result<OrderAllInfoVO>["data"]> {
//     return ajax({
//         url: "/agc/applyinfo/all",
//         data: {
//             loanId: loanId
//         },
//         success: success,
//         error: error,
//         ...options
//     }) as any;
// }