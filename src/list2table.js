// list2table https://github.com/sxwxs/list2table

let bootstrap_cdn = '<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"/><script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>'


function conv_btc(satoshi) {
    satoshi = satoshi + '';
    let r = '', i = 0, x='';
    if (satoshi.length > 8) {
        r = satoshi.substr(0, satoshi.length - 8);
        i = satoshi.length - 8;
    }
    else {
        for (let j = 0; j < 8 - satoshi.length;j ++) {
            x += '0';
        }
        r = '0'
    }
    let j = satoshi.length - 1;
    while (j > i) {
        if (satoshi[j] != '0') {
            break;
        }
        j --;
    }
    if (j > i){
        r += '.' + x + satoshi.substr(i, j-i+1);
    }
    return r;
}

//数据转化
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function htime(sec) {
    if (sec == 0) return '瞬间';
    let units = [['秒', 60], ['分', 60], ['时', 24], ['天', 30]];
    let value = [];
    let i = 0;
    while (i < units.length) {
        let c = sec % units[i][1];
        sec = Math.floor(sec / units[i][1]);
        value.push(c);
        if (sec <= 0) break;
        i ++;
    }
    let r = ''
    for (let i = value.length-1; i >= 0; i--) {
        if (value[i] > 0) {
            r += value[i] + ' ' + units[i][0] + ' ';
        }
    }
    return r;
}

function formatTime(number,format) {

    var formateArr  = ['Y','M','D','h','m','s'];
    var returnArr   = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr)
    {
    format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

function list2table(element_id, data, head, format) {
    if (data instanceof Array) {
        let table_body = '<tbody>';
        let col_num = 0;
        if (data.length > 0) {
            col_num = data[0].length;
            for (let i = 0; i < data.length; i++) {
                table_body += '<tr>';
                for (let j = 0; j < data[i].length; j++) {
                    let val = data[i][j];
                    if (format && format[j]) {
                        if (format[j] === 'timestamp') {
                            val = formatTime(val, "Y/D/M h:m");
                        }
                    }
                    if (j === data[i].length-1 && head && head.length === col_num-1) {
                        table_body += '<td><a href="' + val + '">详情</a></td>';
                    }
                    else {
                        table_body += '<td>' + val + '</td>';
                    }
                }
                table_body += '</tr>';
            }
        }
        let table_head = '<table class="table table-striped">';
        if (head) {
            table_head += '<thead>'
            for (let i = 0; i < head.length; i++) {
                table_head += '<th>'+ head[i] +'</th>';
            }
            if(head.length === col_num-1)
                table_head += '<th></th>';
            table_head += '</thead>'
        }
        table_body += '</tbody>';
        document.getElementById(element_id).innerHTML = table_head + table_body + '</table>';
    }
    else {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    list2table(element_id, JSON.parse(xhr.responseText), head, format);
                } else {
                    alert('失败！' +  xhr.responseText);
                }
            }
        };
        xhr.open('GET', data);
        xhr.send();
    }
    if (document.body.parentElement.innerText.indexOf('bootstrap.min.css') == -1) {
        document.body.innerHTML += bootstrap_cdn;
    }
}