// window.onload定义的是，等页面的所有的dom元素加载完再进行js的操作（事件）
window.onload = function(){
    
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

    // 放大镜的鼠标移入移出，蒙版和大图激活效果函数
    mouseMoveActivate()
    function mouseMoveActivate(){
        // 思路
        // 1.获取小图框元素对象，设置移入的事件（onmouseover）(onmousenetr 我没有事件冒泡效果)
        // 2.动态创建蒙版元素以及大图框和大图框元素
        // 3.移出时，移除蒙版元素和大图框

        // 获取小图框元素对象
        var smallPic = document.querySelector(".smallPic")
        smallPic.onmouseenter = function(){

            // 动态创建蒙版元素
            var maskdiv = document.createElement("div")
            maskdiv.className = "mask"

            //创建大图框元素
            var bigPic = document.createElement("div")
            bigPic.className = "bigPic"

            // 创建大图片元素
            var Bigimg = document.createElement("img")
            Bigimg.src = "images/b1.png"

            // 大图框里引入大图片
            bigPic.appendChild(Bigimg)
            // 小图框里引入蒙版
            smallPic.appendChild(maskdiv)
            // leftTop里引入大图框，引入小图框
            var leftTop = document.querySelector(".leftTop")
            leftTop.appendChild(bigPic)
            leftTop.appendChild(smallPic)

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
    
    

}