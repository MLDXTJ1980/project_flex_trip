window.addEventListener("load", function() {
    // 1. get elements
    var focus = document.querySelector(".focus")
    var ul = focus.children[0]
    var ol = focus.children[1]
    var w = focus.offsetWidth
        // 2. 利用定时器自动轮播图
    var index = 0
    var flag = false
    var timer = setInterval(function() {
            index++
            var translatex = -index * w
            ul.style.transition = "all .3s"
            ul.style.transform = "translateX(" + translatex + "px)"
        }, 2000)
        //过渡完成之后再判断， 监听过渡完成的事件 transitionend
        //index>=3, 如果是index==3,页面过一会儿轮播图就不显示了
    ul.addEventListener("transitionend", function() {
            if (index >= 3) {
                index = 0
                ul.style.transition = "none"
                var translatex = -index * w
                ul.style.transform = "translateX(" + translatex + "px)"
            } else if (index < 0) {
                index = 2
                ul.style.transition = "none"
                var translatex = -index * w
                ul.style.transform = "translateX(" + translatex + "px)"
            }
            // 3. 小圆点跟随轮播图相应变化
            // 选出ol里面li带有current类名然后去掉类名
            ol.querySelector(".current").classList.remove("current")
            ol.children[index].classList.add("current")
        })
        // 4. 手指滑动轮播图
        // 触摸元素touchstart
    var startX = 0
    var moveX = 0
    ul.addEventListener("touchstart", function(e) {
            startX = e.targetTouches[0].pageX
            clearInterval(timer)
        })
        // 移动手指 touchmove 计算手指的滑动距离 并且相应移动盒子
    ul.addEventListener("touchmove", function(e) {
            moveX = e.targetTouches[0].pageX - startX
                // 移动盒子距离= 盒子原来位置 + 手指移动距离
            var translatex = -index * w + moveX
                // 手指拖动的时候 不需要动画效果 所以取消transition
            ul.style.transition = "none"
            ul.style.transform = "translateX(" + translatex + "px)"
            flag = true
            e.preventDefault() //阻止默认滚动屏幕
        })
        // 手指离开 根据移动距离判断是回弹上一张 还是滑动到下一张
        //移动距离>50px 播放下一张，小于50px回弹到上一张
    ul.addEventListener("touchend", function(e) {
            if (flag) {
                if (Math.abs(moveX) > 50) {
                    if (moveX > 0) {
                        // moveX>0 右滑到下一张
                        index--
                    } else {
                        // moveX<0 回弹到下一张
                        index++
                    }
                    var translatex = -index * w
                        // 手指拖动的时候 不需要动画效果 所以取消transition
                    ul.style.transition = "all .3s"
                    ul.style.transform = "translateX(" + translatex + "px)"
                } else {
                    var translatex = -index * w
                        // 手指拖动的时候 不需要动画效果 所以取消transition
                    ul.style.transition = "all .1s"
                    ul.style.transform = "translateX(" + translatex + "px)"
                }
            }
            // 手指离开就重新开启timer，开启之前先清除timer，确保只有一个timer运行
            clearInterval(timer)
            timer = setInterval(function() {
                index++
                var translatex = -index * w
                ul.style.transition = "all .3s"
                ul.style.transform = "translateX(" + translatex + "px)"
            }, 2000)
        })
        /* go top */
    var goTop = document.querySelector(".goTop")
    var nav = document.querySelector("nav")
    window.addEventListener("scroll", function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goTop.style.display = "block"
        } else {
            goTop.style.display = "none"
        }
    })

    goTop.addEventListener("click", function() {
        window.scroll(0, 0)
    })
})