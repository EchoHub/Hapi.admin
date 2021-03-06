# HAPI.ADMIN 
一套 **React** 选型的中后台系统开发脚手架
## 特性
- 丰富的UI组件库
- 丰富的工具类
- 数据可视化工具
- Mock数据工厂
- 中后台开发模版。
## 安装运行
```
npm install 
npm run start
```
## 组件库
基础
- Button 按钮
- ButtonGroup 按钮组

排版
- GridLayout 栅格容器
- Layout 栅格

表单
- checkBox 多选框 
- checkBoxGroup 多选框组 
- cascader 级联选择器
- datePicker 时间选择器
- radioBox 单选框 
- radioBoxGroup 单选框组
- form 表单
- select 下拉框
- slider 滑块
- suggest 带模糊查询的输入框
- switch 开关
- textArea 文本域 
- textBox 文本框 

通知
- toolTip 提示
- message 消息提示
- notification 通知

列表
- dataGridView 列表 
- pagination 分页器 

菜单
- navMenu 导航菜单
- dropDown 下拉菜单

模态
- dialog 对话框
- modal 模态框
- sidebarPopup 侧边弹窗

图表
- chart 图表
- (持续更新...)

其他
- breadCrumb 面包屑
- carousel 跑马灯
- collapse 折叠面板
- panel 面板
- rate 评分器
- steps 步骤条
- transfer 穿梭框

## Mock数据工厂

- 导入api.json文件
- 执行mock生成指令
- 一键生成 mock 数据

导入api.json文件
```
{
    "apis": {
        "/api/query":{
			"summary":"获取数据",
			"parameters":{
				"page":{
					"notEmpty":true,
					"summary":"页数",
					"optional":true,
					"type":"java.lang.Integer"
                },
                "pageSize":{
					"notEmpty":true,
					"summary":"单页数据大小",
					"optional":true,
					"type":"java.lang.Integer"
				}
			},
			"responses":[
				{
					"type":"hapi.data.result<hapi.data.queryInfo>"
				}
			]
        }
    },
    "types": {
        "hapi.data.result":{
			"properties":{
				"total":{
					"type":"java.lang.Integer"
				},
				"message":{
					"type":"java.lang.String"
				},
				"data":{
					"type":"T"
				},
				"code":{
					"type":"java.lang.String"
				}
			}
        },
        "hapi.data.queryInfo": {
			"username": {
				"summary": "用户名",
				"type": "java.lang.String"
			},
			"age": {
				"summary": "年龄",
				"type": "java.lang.Integer"
			},
			"sex": {
				"summary": "性别",
				"type": "java.lang.Integer"
			},
			"idCard": {
				"summary": "身份证号",
				"type": "java.lang.String"
			},
			"address": {
				"summary": "现住址",
				"type": "java.lang.String"
			}
        },
        "java.lang.String":{
			"alias":"string"
        },
        "java.lang.Integer":{
			"alias":"number"
		}
    },
    "version": "0.0.1",
    "modified": "2019-01-29 16:43:00"
}
```
执行指令
```
$ npm run api
```
生成数据
```
{
    "page": 1,
    "pageSize": 10,
    "total": 5,
    "code": "0",
    "message": "message_1",
    "data": {
        "username": "username_1",
        "age": 1,
        "sex": 0,
        "idCard": "idCard_1",
        "address": "address_1"
    }
}
```
## 开发
```
$ git clone git@github.com:EchoHub/Hapi.admin.git
$ npm install
$ npm run start
```


