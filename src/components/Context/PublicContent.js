
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
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

export default PublicContent;