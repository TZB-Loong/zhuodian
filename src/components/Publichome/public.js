import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';

class Public extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:['功能介绍','功能账号','账号主体','客服','相关','经营范围','']
        }
    }

    render() {
        return <div> nishuo ni sh imeideda </div>
    }
}

export default Public;