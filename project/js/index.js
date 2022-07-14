// window.onload定义的是，等页面的所有的dom元素加载完再进行js的操作（事件）
window.onload = function(){
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