<?php
// 获取当前HTML文件的目录路径
$htmlDirectory = getcwd();

// 获取MP3文件列表
$mp3Files = array_filter(scandir($htmlDirectory), function ($file) {
  // 忽略大小写的MP3文件扩展名匹配，并过滤掉当前目录（.）和上级目录（..）
  return preg_match('/\.mp3$/i', $file) && $file !== '.' && $file !== '..';
});

// 返回JSON格式的MP3文件名列表
header('Content-Type: application/json');
echo json_encode(array_values($mp3Files)); // 使用array_values()将索引重新排序
?>