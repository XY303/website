const p = ["?????", "你干嘛?哎呦", "别点了,我要睡觉!", "你还点?", "你再点我生气了啊!", "别看了,没彩蛋.", "不信?", "不信也是没有!", ".", "..", "...", "....", ".....", "......", "哎,看来你很固执", "呐,送你一个梯子,自己去外面的世界浪一浪吧!","记得别跟我要钱冲VPN,我用的都是免费版(再点一下跳转)"]
let x = 0
document.getElementById("head").addEventListener("click", eihei);
function eihei() {
    if (x <= p.length - 1) {
        document.getElementById("head").innerText = p[x];
        x++;
    } else {
        window.location.href="http://run.weaksharedptr.com/register?share_id=aa15aede-a068-4206-9b73-8fb5d902e2b9"
    }
}