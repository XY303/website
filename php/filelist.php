<?php
// 获取参数
$htmlDirectory = "K:/nginx/html/" . $_GET["dir"];
$fileformat = isset($_GET["format"]) ? $_GET["format"] : null;

// 构建完整的目录路径
$htmlDirectory = rtrim($htmlDirectory, '/') . '/'; // 确保目录路径以斜杠结尾

// 获取文件列表
if ($fileformat === null) {
    $Files = array_filter(scandir($htmlDirectory), function ($file) use ($htmlDirectory) {
        return is_dir($htmlDirectory . $file) && $file !== '.' && $file !== '..';
    });
} else {
    $Files = array_filter(scandir($htmlDirectory), function ($file) use ($fileformat, $htmlDirectory) {
        // 文件匹配，并过滤掉当前目录（.）和上级目录（..）
        return preg_match('/' . preg_quote($fileformat) . '/i', $file) && $file !== '.' && $file !== '..';
    });
}

// 返回JSON格式的文件列表
header('Content-Type: application/json');
echo json_encode(array_map(function ($file) use ($htmlDirectory) {
    return $_GET["dir"] . $file;
}, array_values($Files)));
?>
