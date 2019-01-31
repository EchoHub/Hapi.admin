const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
module.exports = function APIFactory(apiOpt) {
    const { entry, options } = apiOpt

    apiSource = fs.readFileSync(entry, options);

    resultOptions = {
        code: "0",
        message: "message_1"
    }

    arrlen = 5

    // 常见目录 若目录不存在则创建
    function dirExists(folderpath) {
        const pathArr = folderpath.split('/');
        let _path = '';
        for (let i = 0; i < pathArr.length; i++) {
            if (pathArr[i]) {
                _path += `/${pathArr[i]}`;
                if (!fs.existsSync(_path)) {
                    fs.mkdirSync(_path);
                }
            }
        }
    }

    // 数据工厂
    function checkDataType(type, types, mock, index) {
        const regExp = /\[\]$/
        const pageRegExp2 = /^hapi\.data\.pagevo<([a-zA-Z\.]+)>$/
        let resultData = Object.assign({}, resultOptions);
        if (regExp.test(type)) {
            // 返回是否为数组对象
            const type_ = type.replace(regExp, "");
            let resultList = []
            for (let i = 0; i < arrlen; i++) {
                resultList.push(checkDataType(type_, types, type_, i))
            }
            resultData["data"] = resultList;
        } else if (pageRegExp2.test(type)) {
            resultData = Object.assign({},
                resultOptions,
                {
                    page: 1,
                    pageSize: 10,
                    total: 5
                }
            )
            // 返回是否为数组对象
            const type_ = type.replace(pageRegExp2, "$1");
            let resultList = []
            for (let i = 0; i < arrlen; i++) {
                resultList.push(checkDataType(type_, types, type_, i))
            }
            resultData["data"] = resultList;
        } else {
            // resultData["data"] = checkDataType(_type, types, _type, 1);
            let result = new Object()
            for (const key in types) {
                if (type === key) {
                    const typesResult = types[key]
                    for (const _key in typesResult) {
                        let value;
                        if (typesResult[_key].type) {
                            value = checkDataType(typesResult[_key].type, types, _key, index)
                            result[_key] = value;
                        } else if (_key === "alias") {
                            switch (typesResult[_key]) {
                                case "number":
                                    value = Number(Math.random(1000).toFixed(0));
                                    break;
                                case "string":
                                    value = `${mock}_${index}`;
                                    break;
                                case "boolean":
                                    value = true;
                                    break;
                                case "date":
                                    value = new Date().toLocaleString();
                                    break;
                            }
                            return value;
                        }
                    }
                    break;
                }
            }
            resultData["data"] = result
        }
        return resultData
    }

    // 根据数据类型 生成mock数据
    function buildMockByTypes(type, types) {
        const _type = type.replace(/^hapi\.data\.result<(\S+)>$/, "$1")
        let mockData = checkDataType(_type, types, type, 1)
        if (typeof mockData === "object") {
            mockData = JSON.stringify(mockData);
        }
        return mockData;
    }

    // 异常处理
    function errCatch(err) {
        console.log(err)
    }

    return {
        apiSource: apiSource,
        buildMock: () => {
            const mockRootPath = path.join(__dirname, "./../../mock");
            const api = JSON.parse(apiSource);
            const apis = api.apis;
            const types = api.types;
            let p = new Promise((resolve, reject) => {
                rimraf(mockRootPath, err => {
                    console.log("1.mock目录清除，请稍后...".underline.red)
                    if (!err) resolve()
                    else reject(err)
                })
            });
            p.then(() => {
                console.log("2.清除完成，mock目录开始创建...".underline.red)
                dirExists(mockRootPath)
                for (const api in apis) {
                    const dirs = api.split("/");
                    const len = dirs.length;
                    const apiName = dirs.splice(len - 1)[0];
                    let apiDirPath = dirs.splice(0, len - 1).join("/").replace(/^\//, "");
                    const apiPath = path.join(__dirname, `./../../mock/${apiDirPath}`);
                    const apiConfig = apis[api];
                    new Promise((resolve, reject) => {
                        // 创建mock文件目录
                        dirExists(apiPath)
                        resolve([apiName, apiPath])
                    }).then(data => {
                        // 创建mock文件
                        const [name, rootPath] = data;
                        const mockFileName = path.join(rootPath, name + ".json");
                        const fw = fs.createWriteStream(mockFileName, {
                            flags: 'w',
                            defaultEncoding: 'utf8',
                        })
                        const { summary, parameters, responses } = apiConfig
                        let mock = ""
                        for (const item of responses) {
                            const type = item.type
                            mock = buildMockByTypes(type, types)
                        }
                        fw.write(mock, () => {
                            console.log(`${name.yellow} mock文件创建成功，数据文件路径：`.blue, mockFileName.underline.green)
                            fw.close()
                        })
                    })
                }
            })
            p.catch(err => {
                errCatch(err)
            })
        },
        buildApi: () => {

            // const version = api.version;
            // const modified = api.modified;
        }
    }
}
