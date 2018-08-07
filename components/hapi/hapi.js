const process = require("process");
const path = require("path");
const fs = require("fs");
const param = getArgv();
const colors = require('colors');

const dirPath = {
    page: path.resolve(__dirname, "./../../page"),
    component: path.resolve(__dirname, "./../../components")
};
(function () {
    let name;
    switch (param[0]) {
        case "page":
            name = param[1];
            log("add", param[0], name, "html", () => {
                return copyFile(dirPath.page, path.resolve(__dirname, `./../../page/${name}.html`), "index.html", `${name}.html`)
            });
            break;
        case "component":
            name = param[1];
            log("add", param[0], name, "jsx | scss | md", () => {
                return copyDirFiles(dirPath.component, `${dirPath.component}/${name}`, name)
            })
            break;
        case "delete":
            name = param[2];
            log("remove", param[1], name, "page", () => {
                return removeFileOrDir(dirPath.page, name, false)
            });
            break;
        case "remove":
            name = param[2];
            log("remove", param[1], name, "component", () => {
                return removeFileOrDir(dirPath.component, name, true)
            });
            break;
        // case "rename":
            
        //     break;
        case "watch":
            watchFileOrDir([dirPath.page, dirPath.component])
            break;
        default:
            throw console.log("illegal param".red)
            break;
    }
})();
/**
 * @desc 获取命令行 传入参数
 */
function getArgv() {
    return process.argv.slice(2);
}
/**
 * @desc 创建文件 日志打印
 * @param style 类型
 * @param name 模块名称
 * @param info 模版信息
 * @param finish 完成函数
 */
function log(behavior, type, name, info, finish) {
    const _enum = {
        "page": "页面",
        "component": "组件"
    };
    let _type = _enum[type];
    switch (behavior) {
        case "add":
            // 新增
            console.log(`* 开始创建`.green);
            console.log(`* ${_type}名称：${name}`.green);
            console.log(`* ${_type}信息：${info}`.green);
            console.log(`* 创建中，请稍等...`.green);
            let status = true
            finish && typeof finish === "function" && (status = finish())
            status ? console.log(`* 创建完成`.green) : console.log("* 文件已存在，创建失败".red);
            break;
        case "remove":
            // 删除
            console.log(`* 开始删除`.green);
            console.log(`* ${_type}名称：${name}`.green);
            console.log(`* ${_type}信息：${info}`.green);
            console.log(`* 删除中，请稍等...`.green);
            let status1 = true;
            finish && typeof finish === "function" && (status1 = finish())
            status1 ? console.log(`* 删除完成`.green) : console.log("* 文件不存在，删除失败".red);
            break;
        default:
            break;
    }
}
/**
 * @desc 拷贝文件
 * @param src_path 文件源目录路径
 * @param dst_path 目标目录路径
 * @param template 模版文件名称
 * @param target 目标文件名称
 */
function copyFile(src_path, dst_path, template, target) {
    files = fs.readdirSync(src_path);
    let allow = true;
    files.forEach(d => {
        if (d === target) {
            allow = false;
            return;
        }
    });
    if (allow) {
        fs.createReadStream(path.resolve(src_path, template)).pipe(fs.createWriteStream(dst_path));
        return true;
    }
    return false;
}
/**
 * @desc 拷贝指定目录下的文件
 */
function copyDirFiles(src, dst, target) {
    const files = fs.readdirSync(src);
    let allow = true;
    files.forEach(d => {
        if (d === target) {
            allow = false;
            return;
        }
    });
    if (allow) {
        fs.mkdirSync(dst);
        fs.readdir(src + "/_template", null, (err, files) => {
            for (const item of files) {
                const data = fs.readFileSync(`${src}/_template/${item}`).toString();
                const _result = data.replace(/_template/g, target);
                const result = _result.replace(/Template/g, target[0].toUpperCase() + target.slice(1));
                fs.createWriteStream(`${dst}/${target}.${item.split(".")[1]}`)
                fs.writeFile(`${dst}/${target}.${item.split(".")[1]}`, result)
            }
        })
        return true;
    }
    return false;
}

/**
 * @desc 删除指定目录或文件
 * @param -v 删除页面 view
 * @param -c 删除组件 component
 */
function removeFileOrDir(path, filename, fileOrDir) {
    let allow = false;
    fs.readdirSync(path).forEach(file => {
        if (file.split(".")[0] === filename) {
            allow = true;
            const _path = `${path}/${filename}`;
            if (fileOrDir) {
                removeFiles(_path)
                fs.rmdirSync(_path)
            } else {
                fs.unlink(`${_path}.${file.split(".")[1]}`)
            }
            // fileOrDir ? removeFiles(_path) && fs.rmdirSync(_path) : fs.unlink(`${_path}.${file.split(".")[1]}`)
            return;
        }
    });
    if (allow) {
        return true;
    }
    return false;
}

function removeFiles(path) {
    fs.readdirSync(path).forEach(file => {
        const _path = `${path}/${file}`;
        fs.statSync(_path).isDirectory() ? removeFiles(_path) : fs.unlinkSync(_path)
    })
}
/**
 * @desc 移动 重命名文件
 */
// function moveOrRenameFile(path, dstPath) {
//     fs.rename(path, dstPath, err => {

//     })
// }

/**
 * @desc 监听文件变化
 * @param  dirs 目录／文件路径 
 */
function watchFileOrDir(dirs) {
    // dirs 0 --> page目录, 1 --> components目录
    dirs.forEach(dir => createWatcher(dir))
    // const fsWatcher = fs.watch(path, (event, filename) => {
    //     console.log("watch")
    //     console.log(event, filename);
    // });
    // fsWatcher.on("change", (event, filename) => {
    //     console.log("watcher")
    //     console.log(event, filename)
    // })
}
/**
 * 
 * @desc 创建监听器
 * @param dir 目录路径 
 */
function createWatcher(dir) {
    fs.readdir(dir, (err, files) => {
        files.length && files.forEach(file => {
            const _path = `${dir}/${file}`;
            fs.stat(_path, (err, stats) => {
                if (stats.isDirectory()) {
                    createWatcher(_path)
                } else {
                    let count = 0;
                    const fsWatcher = fs.watch(_path, (event, filename) => {
                        count++;
                        console.log(`--- 正在监听 ${filename} ---`.green);
                    });
                    fsWatcher.on("change", (event, filename) => {
                        switch (event) {
                            case "rename":
                                console.log(`${filename}正在被重命名`.red);
                                break;
                            case "change":
                                console.log(`${filename}正在被修改`.red);
                                break;
                        }
                    })
                }
            })
        });
    })
}