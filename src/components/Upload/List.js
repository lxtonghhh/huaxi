import React, {Component} from 'react';
import Item from "./Item";

class List extends Component {
    static defaultProps = {
        showList: []
    };

    render() {
        return (
            <div>
                {this.props.showList.map((value, i) => <Item item={value} key={i} onClick={this.props.onItemClick(i)}/>)}
            </div>
        )
    }
}

export default List;
