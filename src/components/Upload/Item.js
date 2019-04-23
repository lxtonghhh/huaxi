import React, {Component} from 'react';
import {Button} from "element-react";

class Item extends Component {

    render() {
        const {item} = this.props;
        return (
            <div className='item'>
                {item.success ? (
                    <i className='el-icon-circle-check'/>
                ):(
                    <i className='el-icon-circle-cross'/>
                )}
                <p className='item-p'>{item.name}</p>
                {item.reload && <Button onClick={this.props.onClick}>重新上传</Button>}
            </div>
        )
    }
}

export default Item;
