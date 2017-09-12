
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
// import Map from 'Map'
class PublicContent extends Component {
    //初始化时执行的
    constructor(props) {
        super(props)
        this.state = {
            src:" ",
            center:[[22.54483,114.05785],[22.54397,114.05574]]  //是用来做自定义地图组件的
        }
    }

    //现在在地图上显示的方案有三种  一 ，直接使用连接形式打开地图来，传入参数，（连接式导入）
    componentWillMount(){
        var loc;
        var isMapInit = false;
        var self = this
        //监听定位组件的message事件
        window.addEventListener('message', function(event) { 
            
            loc = event.data; // 接收位置信息
            console.log('location', loc);
        
            if(loc &&loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
            // var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
            //     '?marker=coord:' + loc.lat + ',' + loc.lng + 
            //     ';title:我的位置;addr:' + (loc.addr || loc.city) + 
            //     '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
            //     console.log('markUrl',markUrl)
            //     console.log('this,this',self.state.src)
             var coord = '22.53668,114.05743'
            var title = '香格里拉大酒店'
            var addr =  '广东省深圳市福田区福中三路市民中心A区2016室'
            var headerUrl = 'http://apis.map.qq.com/tools/poimarker?type=0'
            var contextUrl = 'coord'+':'+coord+';'+'title'+':'+title+';'+'addr'+':'+addr+';'
            var contextUrls = 'coord'+':'+loc.lat+','+loc.lng+';title:我的位置;addr:'+(loc.addr||loc.city)+'|'+contextUrl
            var footerUrl = '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=桌电'
            // var markUrl  = headerUrl+'&'+'marker'+'='+contextUrl+footerUrl
            var markUrl = 'http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院;MarkerAnimation.BOUNCE|coord:39.87803,116.19025;title:成都园;addr:北京市丰台区射击场路15号北京园博园|coord:39.88129,116.27062;title:老成都;addr:北京市丰台区岳各庄梅市口路西府景园六号楼底商|coord:39.9982,116.19015;title:北京园博园成都园;addr:北京市丰台区园博园内|coord:22.54483,114.05785;title:小家伙;addr:大家伙&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=桌电'
            // var markUrl = 'http://apis.map.qq.com/uri/v1/search?keyword=肯德基&center=22.543099,114.057868&radius=1000&marker?marker=coord:22.5431,114.05787;title:成都;addr:北京市海淀区复兴路32号院&referer=myapp'
            // var markUrl = 'http://apis.map.qq.com/tools/poimarker?type=1&keyword=餐饮&center=22.543099,114.057868&radius=1000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp'
            // var markUrl = 'http://apis.map.qq.com/uri/v1/marker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院;MarkerAnimation.BOUNCE|coord:39.87803,116.19025;title:成都园;addr:北京市丰台区射击场路15号北京园博园|coord:39.88129,116.27062;title:老成都;addr:北京市丰台区岳各庄梅市口路西府景园六号楼底商|coord:39.9982,116.19015;title:北京园博园成都园;addr:北京市丰台区园博园内|coord:22.54483,114.05785;title:小家伙;addr:大家伙&referer=桌电'
                self.setState({
                    src:markUrl
                })

            } else { //定位组件在定位失败后，也会触发message, event.data为null
                alert('定位失败'); 
            }
           
            // if (!isMapInit && !loc) { //首次定位成功，创建地图
            //     isMapInit = true;
            //     self.createMap(event.data);
            // } else if (event.data) { //地图已经创建，再收到新的位置信息后更新地图中心点
            //     updateMapCenter(event.data);
            // }
                 
            
        }, false);
        console.log('self.refs',self.refs.goPage)
        //设置6s超时，防止定位组件长时间获取位置信息未响应
        setTimeout(function() {
            if(!loc) {
                //主动与前端定位组件通信（可选），获取粗糙的IP定位结果
                self.refs.goPage.contentWindow.postMessage('getLocation.robust', '*');
            }
        }, 6000); //6s为推荐值，业务调用方可根据自己的需求设置改时间，不建议太短
    }


    //不用他的组件组件来写一个地图组件
    // componentDidMount(){
    //     var self = this
    //     var center = new qq.maps.LatLng(22.543099,114.057868)
    //     var center2 = new qq.maps.LatLng(22.53668,114.05743)
    //         var createMap = {
    //             zoom:16,
    //             center:center
    //         }
    //         var map  = new qq.maps.Map('qmap',createMap);
    //         for( var i in   self.state.center){
    //             var center3 =  new qq.maps.LatLng (self.state.center[i][0],self.state.center[i][1])
    //             var marker = new qq.maps.Marker({
    //                 position:center3,
    //                 animation:qq.maps.MarkerAnimation.BOUNCE,
    //                 map:map
    //             })
    //             console.log('center3',center3)
    //         }
    //         var marker1 = new qq.maps.Marker({
    //             position: center,
    //             map: map,
    //         })
    //         var marker = new qq.maps.Marker({
    //             position: center2,
    //             map: map,
    //         })
    //         var info = new qq.maps.InfoWindow({
    //             map: map
    //         })
    //         var listener = qq.maps.event.addListener(
    //             marker1,
    //             'click',
    //             function(event) {
    //                 info.open(event); 
    //                 info.setContent('<div style="text-align:center;white-space:nowrap;'+
    //                 'margin:10px;">具体标注地址</div>');
    //                 info.setPosition(center);;
    //             }
    //         )   
    // }
    render() {
        
        return <div style={{ width:window.screen.width+'px',height:window.screen.height+'px'}}> 
            <iframe ref='goPage' width = '100%' height='10%' scrolling='no' frameBorder='0' src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&effect=zoom"> </iframe>
        <iframe id="markPage" width="100%" height="80%" frameBorder='0' scrolling="no" src={this.state.src}></iframe> 
        </div>
   
        // return <div style={{ width:window.screen.width+'px',height:window.screen.height+'px'}}>
        //     <div style={{ width:'100%',height:'10%'}}>我的位置</div>
        //             <div id ='qmap' style={{ width:'100%',height:'83%'}}>

        //         </div>
        // </div>  
        

    }
}

export default PublicContent;