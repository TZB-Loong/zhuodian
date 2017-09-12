/**
 * Created by Administrator on 2017/1/7.
 */
import React from 'react';
import Home from './components/Home/Home';
import Map from './components/Map/Map';
import PublicContent from './components/Context/PublicContent';
import Public from './components/Publichome/public';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

(function (window) {

// class Tree extends Component {
//     //适用手机端的React 适用各种屏幕（兼容）?
//     constructor(props) {
//         super(props)
//         this.state = {}
//         console.log('props', props)
//     }
//     render() {
//         console.log('this,context',this.context)
//         return   <div >
//             <Home/>
//         </div>

//     }

// }
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={Home} />
              <Route path="/PublicContent" component={PublicContent} />     
             <Route path="/Public" component={Public} /> 
             <Route path="/goMap" component={Map} /> 
        </Router>,
        // <Home/>,
        document.getElementsByClassName('todoapp')[0])
})(window);



// 个人馆 
// 1，在开始的想法不成立时，我还是想保持住我最初的想想法，已生成模板简历为主 
// 即开始时 通过这个小程序来输入个人信息，职位等来生成一个网站式的个人简历
//在登录进小程序中去，我们只要获取到他的登录信息，然后提供一些简历模板来给他选择
//在选择好简历模板后开始让用户按照模板来进行简历的填写
//在简历完成后，提交数据，我们把数据发给后台
//后台通过模板的id来把相应奖励模板的数据送给web端的简历，动态生成一个网址返回到小程序，
//这个网址就是用户的简历，这个简历可适用手机端和电脑端
// 我们就通过微信这个平台来获取到用户的数据，动态生成一个网页 即跳转到第三方，只要返回小程序一个网址就好
//这样就不用想我们能从微信中拿到什么，就一且我们自己来处理数据交互，跳转等，自己做。

//个人馆基本功能实现
//1，在小程序的首页对这个小程序的功能做一个简介
// 即整个小程序的页面分为三个页面 1首页 2编辑我的简历  3我的简历（即在我的个人创建历史啊，个人资料啊，等）
// 1.1 在小程序的首页上展示的是这个小程序的主要功能，以及一些案例的展示，即就是一成功图片的展示等
//1.2在小程序的编辑我的简历页面包含 简历模板的选择 ，按照简历模板的样式填写用户的数据，资料填写完成后生成一个可预览的简历模板，并可装换为word文档，可提供下载，在点击创建后，将数据提供给后台，经过后台处理后返回一个展示个人简历的网址
//1.3 在我的简历页面，可查看已经创建的简历，查看本人资料，提供生成的个人简历的网址。
//2在后台方面，需要提供创建个人简历所需的字段 ，接受由小程序提供过来的个人简历的数据，处理在转发给对应简历模板的网址上的个人简历，返回小程序一个对应个人简历的网址
//2.2在个人简历网址的页面上需要接受由后台传出来的数据并进行展现，而且这个个人简历可生成word文档提供下载，也可在线进行打印

//问题1：怎么生成可预览简历 ，生成的预览简历是以图片的形式进行展示，还是以文档的形式进行展示？
//问题2：不同的人不同的网址怎么提供  网址的提供时间是否限制，最多可同时提供的多少个网站？到了时间怎么清除掉网址上的内容？这些数据是从服务器上进行销毁，还是在页面端进行销毁？
//问题3，怎么转换为word文档，生成word文档后是否可再进行修改？
//问题4：简历模板以怎样的形式提供，是否可查看，是否可在模板上进行直接的增删改查？