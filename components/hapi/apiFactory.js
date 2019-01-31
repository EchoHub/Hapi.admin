const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
module.exports = function APIFactory(apiOpt) {
    const entry = apiOpt.entry;
    const options = apiOpt.options
    this.apiSource = fs.readFileSync(entry, options);
    // 异常处理
    function errCatch(err) {
        console.log(err)
    }

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

    const paganitionOptions = {
        page: 1,
        pageSize: 10,
        total: 5,
        code: "0",
        message: "message_1"
    }

    // 校验数据结构
    function checkDataType(type, types, mock) {
        if (/^hapi\.data\.result<[a-zA-Z\.]+>$/.test(type)) {
            _type = type.replace(/^hapi\.data\.result<([a-zA-Z\.]+)>$/, "$1");
            let paganitionData = Object.assign({}, paganitionOptions);
            paganitionData["data"] = checkDataType(_type, types, _type);
            return paganitionData
        } else {
            let result = new Object()
            for (const key in types) {
                if (type === key) {
                    const typesResult = types[key]
                    for (const _key in typesResult) {
                        let value;
                        if (typesResult[_key].type) {
                            value = checkDataType(typesResult[_key].type, types, _key)
                            result[_key] = value;
                        } else if (_key === "alias") {
                            switch (typesResult[_key]) {
                                case "number":
                                    value = Number(Math.random(1000).toFixed(0));
                                    break;
                                case "string":
                                    value = `${mock}_1`;
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
            return result
        }
    }

    // 根据数据类型 生成mock数据
    function buildMockByTypes(type, types) {
        let mockData = checkDataType(type, types, type)
        if(typeof mockData === "object") {
            mockData = JSON.stringify(mockData);
        }
        return mockData;
    }
    return {
        apiSource: this.apiSource,
        buildMock: () => {
            const mockRootPath = path.join(__dirname, "./../../mock");
            const api = JSON.parse(this.apiSource);
            const apis = api.apis;
            const types = api.types;
            let p = new Promise((resolve, reject) => {
                rimraf(mockRootPath, err => {
                    if (!err) resolve()
                    else reject(err)
                })
            });
            p.then(() => {
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
                        const fw = fs.createWriteStream(path.join(rootPath, name + ".json"), {
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
