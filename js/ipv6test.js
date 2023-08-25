function testIPv6Support() {
    return new Promise(function(resolve, reject) {
        let ipv6Url = 'https://api64.ipify.org?format=json';
        let xhr = new XMLHttpRequest();

        xhr.open('GET', ipv6Url, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    let response = JSON.parse(xhr.responseText);
                    let ipAddress = response.ip;

                    if (isIPv6Address(ipAddress)) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } catch (error) {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        }
        ;

        xhr.onerror = function() {
            resolve(false);
        }
        ;

        xhr.send();
    }
    );
}

function isIPv6Address(ipAddress) {
    // 检查IP地址是否为IPv6格式
    let regex = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;
    return regex.test(ipAddress);
}
