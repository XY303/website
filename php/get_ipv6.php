<?php
// 使用file_get_contents与ifconfig.co通信，获取全球IPv6地址
$ipv6 = file_get_contents('https://6only.ip6.nl/myip.plp');

// 返回全球IPv6地址给客户端
echo $ipv6;
?>
