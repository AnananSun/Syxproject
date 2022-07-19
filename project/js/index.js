// window.onload定义的是，等页面的所有的dom元素加载完再进行js的操作（事件）
window.onload = function(){
    // 声明一个全局变量来记录下标数据
    var Bigimgindex = "./images/b1.png"

    // 路径导航的动态渲染，封入函数中
    navPathDatabing()
    function navPathDatabing(){
        // 动态渲染路径导航
        // 1.先获取动态路径的元素
        // 2.获取所需要的数据，在data.js中
        // 3.动态生成节点(dom元素)，插入我们的nvapath中
        // 4.最后一条只创建a，不做链接

        // 获取动态路径的元素
        var nvapath = document.querySelector(".nvapath")
        // 获取所需要的数据，在data.js中
        var pathdata = goodData.path

        for(let i = 0; i<pathdata.length; i++){
            // 创建a标签
            var anode = document.createElement("a")
            if(i!==pathdata.length-1){//判断最后一个元素不加url
                anode.href = pathdata[i].url
            }
            anode.innerText = pathdata[i].title
            //创建i标签
            var inode = document.createElement("i")
            if(i!==pathdata.length-1){//判断最后一个元素不加i标签
                inode.innerText = "/"
            }
            // 注入节点
            nvapath.appendChild(anode)
            nvapath.appendChild(inode)
        }
    }

    // 放大镜缩略图的动态渲染函数,
    SsmallPicDatabing()
    function SsmallPicDatabing(){
        // 1.获取需要动态添加路径的元素，这里是ul
        var Ssmallul = document.querySelector(".Ssmallul")
        //获取动态渲染的列表
        var PicdataPath = goodData.imagessrc
        //循环创建li标签
        for(let i = 0;i<PicdataPath.length;i++){
            var Ssmallli = document.createElement("li")
            //创建img标签
            var Ssmallimg = document.createElement("img")
            //注入img标的src
            Ssmallimg.src = PicdataPath[i].s
            //为li添加img标签
            Ssmallli.appendChild(Ssmallimg)
            // 为ul添加ul标签
            Ssmallul.appendChild(Ssmallli)

        }
    }

    // 放大镜的鼠标移入移出，蒙版和大图激活效果函数
    mouseMoveActivate()
    function mouseMoveActivate(){
        // 思路
        // 1.获取小图框元素对象，设置移入的事件（onmouseover）(onmousenetr 我没有事件冒泡效果)
        // 2.动态创建蒙版元素以及大图框和大图框元素
        // 3.移出时，移除蒙版元素和大图框

        // 获取小图框元素对象
        var smallPic = document.querySelector(".smallPic")
        // 鼠标跟踪事件
        smallPic.onmouseenter = function(){

            // 动态创建蒙版元素
            var maskdiv = document.createElement("div")
            maskdiv.className = "mask"

            //创建大图框元素
            var bigPic = document.createElement("div")
            bigPic.className = "bigPic"

            // 创建大图片元素
            var Bigimg = document.createElement("img")
            Bigimg.src = Bigimgindex

            // 大图框里引入大图片
            bigPic.appendChild(Bigimg)
            // 小图框里引入蒙版
            smallPic.appendChild(maskdiv)
            // leftTop里引入大图框，引入小图框
            var leftTop = document.querySelector(".leftTop")
            leftTop.appendChild(bigPic)
            leftTop.appendChild(smallPic)

            // 设置移动事件
            smallPic.onmousemove = function(event){
                //在这里主要是要明白两个值，来定位蒙版元素的位置
                //1是蒙版元素左边到小图框左边的距离left
                //2是蒙版元素顶部到小图框顶部的距离top
                //鼠标跟随，鼠标点的位置来相互计算位置的距离
                //例如鼠标距离 浏览器 左边间的值，与鼠标距离浏览器上边的距离
                // 最终有个公式， left（top） = 鼠标中心到浏览器的边界距离 - 蒙版元素宽度（高度）的一半 - 小图框边界到浏览器可视的距离
                //转化为代码：

                //   鼠标当前位置距上边界   小图框元素到浏览器可视的距离的对象集合    蒙版元素宽度一半
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskdiv.offsetWidth/2
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskdiv.offsetHeight/2
                
                // 做出位置限制
                // 四个边界限制
                if(left<0){
                    left = 0
                }
                if(top<0){
                    top = 0
                }
                if(left>smallPic.offsetWidth - maskdiv.offsetWidth){
                    left = smallPic.offsetWidth - maskdiv.offsetWidth
                }
                if(top>smallPic.offsetHeight - maskdiv.offsetHeight){
                    top = smallPic.offsetHeight - maskdiv.offsetHeight
                }

                // 注入样式
                maskdiv.style.left = left + "px"
                maskdiv.style.top = top + "px"
                // if(left >= 0  && left <= smallPic.offsetWidth - maskdiv.offsetWidth){
                //     maskdiv.style.left = left + "px"
                // }
                // if(top >= 0  && top <= smallPic.offsetHeight - maskdiv.offsetHeight){
                //     maskdiv.style.top = top + "px"
                // }


                // 在鼠标移动过程中，需要动态更新大图移动的位置，实现放大随动效果
                // 实际反映到样式属性上来讲，蒙版元素走的比例，也就是大图片（背景）从相反方向走的比例
                // 移动比计算 0.495
                var scale = (smallPic.clientWidth - maskdiv.offsetWidth)/(Bigimg.offsetWidth - bigPic.clientWidth)
                
                Bigimg.style.left =  -left/scale + "px"
                Bigimg.style.top =  -top/scale + "px"
            }

            // 嵌套设置移出事件，为什么在移入事件中设置移出事件
            // 其实是设置事件只是一个属性，嵌套时 移入事件的调用，绑定了移出事件
            // 实际上是减少了无用的事件绑定，不移入你给他绑个移出干锤子
            smallPic.onmouseleave = function(){
                //移除蒙版元素
                // 调用这个api的时候，必须是有父子关系的元素才能调用，不然会报错
                smallPic.removeChild(maskdiv)
                // 移除大图框元素
                leftTop.removeChild(bigPic)
            }

        }
    }

    // 缩略图点击事件切换效果
    Ssmallclick()
    function Ssmallclick(){
        // 1.获取所有的li，绑定点击事件
        // 2.小图的路径和大图路径动态修改，点击缩略图需要确定其下标位置，替换现有小图大图的src的地址
        var liNodes = document.querySelectorAll("#wrapper #center .left .leftBottom .piclist ul li")
        var smallimg = document.querySelector("#smallpic")
        // 循环绑定事件
        for(let i = 0;i<liNodes.length;i++){
            // 使用闭包，保存了各自的数组下标
            (function(){
                liNodes[i].onclick = function(){
                    // 要使用另一个函数里的数据，传递消息，依靠全局作用域里的变量Bigimgindex
                    // 大图索引改变
                    Bigimgindex = goodData.imagessrc[i].b
                    // 小图同理,直接用id拿到元素，修改他的src就可以
                    smallimg.src = goodData.imagessrc[i].s
                }
            })()
            
        }
    }

    //点击缩略图左右点击按钮移动事件
    SsmallMove()
    function SsmallMove(){
        //得知道ul和div定位关系以及位置的移动
        //关键要算出ul要移动的距离

        // 获取按钮元素
        var SsmallMoveleft = document.querySelector("#SsmallMoveleft")
        var SsmallMoveright = document.querySelector("#SsmallMoveright")
        // 获取ul元素
        var Ssmallul = document.querySelector(".Ssmallul")
        // 获取div元素
        var piclist = document.querySelector(".piclist")
        // 获取li元素,因为是动态添加的,直接使用选择器来选择 All 所有的li节点
        var liNode = document.querySelectorAll("#wrapper #center .left .leftBottom .piclist ul li")

        // 重点！！运动发生起点
        // 每次点击运动两个步长，也就是两个li的宽度加上两个间隔
        // 边界值
        var start = 0//运动起点
        var step = (liNode[0].offsetWidth + 20) * 2//每次移动距离
        // 总体的运动距离 = ul 的宽度 - div框的宽度 = (图片总数减去div里显示的数) * （li宽度+20）
        var endPostion = (liNode.length - 5) * (liNode[0].offsetWidth + 20)

        // 绑定事件
        SsmallMoveleft.onclick = function(){
            start = start - step
            if(start<0){
                start = 0
            }
            Ssmallul.style.left = -start + "px"
        }
        SsmallMoveright.onclick = function(){
            start = start + step
            if(start>endPostion){
                start = endPostion
            }
            // ul向左移动
            Ssmallul.style.left = -start + "px"
        }
    }
}