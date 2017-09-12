import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Route, Link } from 'react-router';
// import Map from 'Map';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ['当前设备型号', '手机型号'],
            foot: ['点击支付', '进入公众号'],
            content: ['选择充电时间', '预计收费'],
            listOption: [[1, '半个小时'], [2, '一个小时'], [3, '一个半小时'], [4, '两个小时'], [5, '两个半个小时'], [6, '三个小时']],
            charging: '',
            isShow: true,
            endContent: ['开始时间', '结束时间'],
            startTime: '',
            endTiem: ''
        }
    }
    

    // 使用bootstrap 来进行布局
    render() {
        const self = this

        // const onClick = function(){
        //     var myLatlng = new qq.maps.LatLng(22.543099,114.057868)
        //     var myOptions = {
        //         zoom:8,
        //         center:myLatlng
        //     }
        //     var map  = new qq.maps.Map('qmap',myOptions);
        // }

        const onChange = function (e) {
            console.log('onChange', e.target.value)
            self.setState({
                charging: e.target.value
            })

        }

        const options = function (data) {

            return (
                data.map(item => {
                    return <option key={item} value={item[0]}>{item[1]}</option>
                })
            )
        }
        const payOnClick = function (e) {
            console.log('payOnClick 调用支付接口', e.target.className)
            //在支付完成后将触发一个状态  做了一个延迟触发（只会执行一次我只要一次）
            //在支付完成后的第二次触发支付时，做一个时间间隔判断，充电时间结束（修改显示内容的状态）后才会再次触发支付
            //只有在选择了充电时间后才能触发支付接口的调用

            if (self.state.charging != '') {  //保证有充电时间的传入
                setTimeout(function () {
                    //获取时间当前系统函数
                    //每隔一秒更新一次时间的状态
                    var myDate = new Date(), hours, minutes;
                    console.log('maDate', myDate)
                    if (myDate.getHours() < 10) {
                        hours = '0' + myDate.getHours()
                    } else {
                        hours = myDate.getHours()
                    }
                    if (myDate.getMinutes() < 10) {
                        minutes = myDate.getMinutes() + '0'
                    } else {
                        minutes = myDate.getMinutes()
                    }
                    var time = hours + ':' + minutes
                    console.log('time', time)
                    console.log('charging', self.state.charging)

                    self.setState({
                        isShow: !self.state.isShow,
                        startTime: time,
                        // endTiem:''
                    })
                }, 3000)
            } else {
                alert('请选择充电时间')
            }
        }

        const EnterOnclick = function () {
            console.log('EnterOnClick 进入公众号关注界面，这个东西是不是要调用微信？ 是不是需要从微信里面调用微信公众号的界面？')
            //提交路由 来进行跳转
            var str = location.href //获取地址栏参数
            console.log('www', str)


        }


        //使用三个函数来对这三个部分进行映射 就像是一个表格一样
        const header = function (data) {
            return (
                data.map(item => {
                    return <div key={item} className='col-xs-6 bg-info'>
                        {item}
                    </div>
                })
            )
        }
        const context = function (data) {
            //中间是一要显示的主要内容
            return (
                data.map(item => {
                    return <div key={item} className='control-group'>
                        <label className='control-label'> {item}</label>
                        {item == '选择充电时间' ?
                            <select onChange={onChange} className='input-xlarge'>
                                {options(self.state.listOption)}
                            </select>
                            : <input value={item == '预计收费' ? '￥' + self.state.charging * 5 : item == '开始时间' ? self.state.startTime : item == '结束时间' ? self.state.endTiem : item} disabled placeholder='请选择充电时间' className='input-xlarge' />}
                            {/* <div> <button onClick = {onClick}>点击进入腾讯地图接口</button></div> */}
                    </div>
                })
            )
        }
        const footer = function (data) {
            //尾部也是一一个标题是内容
            return (
                data.map(item => {
                    return <button key={item} onClick={item == '点击支付' ? payOnClick : EnterOnclick} className={item == '点击支付' ? 'col-xs-5 btn btn-primary ' : 'col-xs-5 btn btn-primary col-xs-offset-2'} >
                        {item}
                    </button>
                })
            )
        }

        // const url = function(){ //拼接url参数
            // var coord = '39.96554,116.26719'
            // var title = '成都'
            // var addr =  '北京市海淀区复兴路32号院'
            // var headerUrl = 'http://apis.map.qq.com/tools/poimarker?type=0'
            // var contextUrl = 'coord'+':'+coord+';'+'title'+':'+title+';'+'addr'+':'+addr+';'
            // var footerUrl = '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=桌电'
            // var url  = headerUrl+'&'+'marker'+'='+contextUrl+footerUrl
            // console.log('url',url)
            // var url = 'http://apis.map.qq.com/tools/poimarker?type=0'+'&'+'marker='+'coord'+':'+coord+';'+'title'+':'+title+';'+'addr'+':'+addr+';'+'&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=桌电'
            //'http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院|coord:39.87803,116.19025;title:成都园;addr:北京市丰台区射击场路15号北京园博园|coord:39.88129,116.27062;title:老成都;addr:北京市丰台区岳各庄梅市口路西府景园六号楼底商|coord:39.9982,116.19015;title:北京园博园成都园;addr:北京市丰台区园博园内&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=桌电'
        // }

        return <div style={{ height: '100%' }}>
            <nav className='navbar navbar-default  text-center' >莱克瑞斯智能家居</nav>
            <div className='container'  >
                {/* <div id ='qmap' style={{ width:'100vw',height:'100vh'}}>

                </div>    */}
                <div className='row ' >
                    <div className='col-xs-10  bg-success' style={{ position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}} >
                        <div className='row' >{header(self.state.title)}</div>
                        <div style={{height:'250px' }}>
                            <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:'80%'}}>
                            {context(self.state.isShow ? self.state.content : self.state.endContent)}
                            </div>
                        </div>
                        <div className='row ' >{footer(self.state.foot)}</div>
                    </div>
                </div>
            </div>
            <footer className='container' >
                <div className='navbar navbar-default navbar-fixed-bottom'>
                <div style={{ border:'1px solid red'}}> 链接式导入腾讯地图
                <a href='http://apis.map.qq.com/uri/v1/marker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院;MarkerAnimation.BOUNCE|coord:39.87803,116.19025;title:成都园;addr:北京市丰台区射击场路15号北京园博园|coord:39.88129,116.27062;title:老成都;addr:北京市丰台区岳各庄梅市口路西府景园六号楼底商|coord:39.9982,116.19015;title:北京园博园成都园;addr:北京市丰台区园博园内|coord:22.54483,114.05785;title:小家伙;addr:大家伙&referer=桌电'>打开腾讯地图连接</a>
                </div>
                    <div style={{ bordedr:'1px solid red'}}><Link to='goMap'>页面跳转到地图展示组件</Link></div>
                    <p className='text-center'>购买 | 合作事宜 | 版权投诉 </p>
                    <p className='text-center'>icp 莱克瑞斯.@2017 </p>
                </div>
            </footer>
        </div>

    }
}
export default Home;