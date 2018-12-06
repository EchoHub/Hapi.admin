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