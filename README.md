# list2table
Convert a json list(array) to a HTML table

把 json 数组转换为 HTML 表格



在前端自动把 list 数据转换成表格。

## Demo

```html
<html>
    <head>
        <title>Demo</title>
    </head>
<body>
    <div id='table'>
    <!-- 生成表格的目标区域 The area to put the table -->
    </div>
</body>
<script src='../src/list2table.js'></script>
<script>
    list2table(
    	'table',                 // target element id
    	[
            ['Tom', 21, 'Computer Science', 1581576171], 
            ['Amir', 18, 'Mathematics', 1581576171]
        ],                       // data list or url to get a json list
        ['Name', 'Age', 'Major'],// table header (optional)
        {3: 'timestamp'}         // format:set format of col 3 as timestamp (optional)
    );
</script>
</html>
```

结果：

![image.png](https://i.loli.net/2020/02/13/4EH5NZF9BdbpsP7.png)

## 用法

函数 `function list2table(element_id, data, head, format)`

| 参数名称          | 类型           | 作用                                                         |
| ----------------- | -------------- | ------------------------------------------------------------ |
| element_id        | string         | 生成的表格的 html 将写入这个元素内部（覆盖原有内容）         |
| data              | array / string | 用于生成 tbody 内容。如果是字符串类型，则发送 ajax 请求该地址，获取数据作为 data |
| head (optional)   | array          | 表头，用于生成 \<thead>，为空不生成。长度应等于或 data 列数或比之小一，如果小一，data 最后一列为 url，每列会多生成一个超链接。 |
| format (optional) | dict           | 如 {0: 'timestamp'} 设置第一列为时间戳，会自动转换格式       |

