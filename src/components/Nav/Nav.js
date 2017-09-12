import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';

class Tree extends Component {
    //适用手机端的React 适用各种屏幕（兼容）?
    constructor(props) {
        super(props)
        this.state = {}
        console.log('props', props)
    }
    render() {
        console.log('this,context',this.context)
        return <div style={{ width: '375px', height: '667px', border: '1px solid red', margin: '20px auto' }}>

            <Home/>
        </div>

    }

}
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

    render() {
        const self = this
        var ci = 0
        const onClick = function (item) {
            console.log('item', item)
            if (item == '选择充电时间01') {
                console.log('self.state.isShwo', self.state.isShow)
                self.setState({
                    isShow: !self.state.isShow
                })
            }
        }
        // const liOnClick = function(e){
        //     console.log('e.target',e.target.value,e,e.target)
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
                    return <option key={item + ci + 1} value={item[0]}>{item[1]}</option>
                })
            )
        }
        const payOnClick = function () {
            console.log('payOnClick 调用支付接口', )
            //在支付完成后将触发一个状态  做了一个延迟触发（只会执行一次我只要一次）
            //在支付完成后的第二次触发支付时，做一个时间间隔判断，充电时间结束（修改显示内容的状态）后才会再次触发支付
            //只有在选择了充电时间后才能触发支付接口的调用

            if(self.state.charging!=''){  //保证有充电时间的传入
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
                    console.log('charging',self.state.charging)

                    self.setState({
                        isShow: !self.state.isShow,
                        startTime:time,
                        // endTiem:''
                    })}, 3000)
            }else{
                alert('请选择充电时间')
            }
        }



        const EnterOnclick = function () {
            console.log('EnterOnClick 进入公众号关注界面，这个东西是不是要调用微信？ 是不是需要从微信里面调用微信公众号的界面？')
            //提交路由 来进行跳转
        }
        const buttons = function (data) {
            return (
                data.map(item => {
                    return <div key={item + ci + 1} style={{ display: '-webkit-flex', flexWrap: 'wrap' }}>
                        <div onClick={item == '点击支付' ? payOnClick : item == '进入公众号' ? EnterOnclick : ''}>
                            {item}
                        </div>
                        {item == '选择充电时间' ?
                            <select onChange={onChange}>
                                {options(self.state.listOption)}
                            </select>
                            : item == '点击支付' || item == '进入公众号' ? "" : <input value={item == '预计收费' ? '￥' + self.state.charging * 5 :item =='开始时间'?self.state.startTime:item == '结束时间'?self.state.endTiem:item} disabled style={{ width: '50px' }} placeholder='请选择充电时间' />}
                    </div>
                })
            )
        }
        console.log('self.state', self.state)
        //在使用return返回时，有三个是重复的，可否将这三个重复的用一个遍历循环来return？
        //如果把它们整合到一起，单个单个的样式不好控制。我还有用一个数组来接收这三个数据（单独的）
        return <div style={{ display: '-webkit-flex', justifyContent: 'center', flexDirection: 'column', WebkitBoxOrient: 'vertical' }}>
            <div style={{ border: '1px solid yellow', display: '-webkit-flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
                {buttons(self.state.title)}
            </div>
            <div style={{ border: '1px solid red', width: '80%', flex: '1', height: '400px', margin: '40px auto' }}>
                {self.state.isShow ? buttons(self.state.content) : buttons(self.state.endContent)}
            </div>
            <div style={{ border: '1px solid yellow', display: '-webkit-flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
                {buttons(self.state.foot)}
            </div>
        </div>
    }
}
class Public extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div> nishuo ni sh imeideda </div>
    }
}

class PublicContent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    //如果说从 支付页面跳转到微信首页需要请求微信端的接口或者需要对微信发出请求，不需要用路由进行跳转
    //我先用路由做一个跳转页面来出来   //要时刻体现出react的高效工作原理
    render() {
        return <div> wokanshi  </div>
    }
}

// registryWidget(Tree);
export default Tree;
