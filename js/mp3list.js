// 使用原生JavaScript创建AJAX请求
const xhr = new XMLHttpRequest();
const url = 'filelist_mp3.php';
// PHP文件的URL

var audioList = document.getElementById('audioList');
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            const response = xhr.responseText;
            // 从服务器获取的响应数据
            audioList = JSON.parse(response);
            // 将JSON格式的响应转换为JavaScript数组
            console.log('MP3 Files:', audioList);
            // 将从服务器获取的MP3文件列表填充到audioList中
            const script2 = document.createElement('script');
            script2.src = '/js/play_control.js';
            script2.defer = true;
            document.body.appendChild(script2);
        } else {
            console.error('Request failed:', xhr.status);
        }
    }
}
;

xhr.open('GET', url);
xhr.send();
