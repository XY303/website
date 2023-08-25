// 使用原生JavaScript创建AJAX请求
const xhr = new XMLHttpRequest();
let url = "/php/filelist.php?"
for (cnm in property) {
    url+="&" + cnm + "=" + `${property[cnm]}`;
}
// PHP文件的URL

var fileList;
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // 从服务器获取的响应数据
            const response = xhr.responseText;
            // 将JSON格式的响应转换为JavaScript数组
            fileList = JSON.parse(response);
            // 将从服务器获取的文件列表填充到fileList中
        } else {
            console.error('Request failed:', xhr.status);
        }
    }
}
;

xhr.open('GET', url ,false);
xhr.send();
