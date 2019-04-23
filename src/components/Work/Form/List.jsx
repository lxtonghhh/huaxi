import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Collapse,Button,Radio} from 'element-react'
import store from '../../../index'
import {createSet} from '../../../reducers/work'
import AreaForm from './AreaForm'
import _ from 'lodash'
export default class WorkFormList extends Component{
	static propTypes={
		activeIndex:PropTypes.number.isRequired,
		sets:PropTypes.array.isRequired,
		onInfoUpdate:PropTypes.func.isRequired
	}
	componentWillMount(){
		console.log('test componentWillMount',store)
	}
	handleSubmit(setIndex,info){
		const status=store.getState()
		console.log('FormList handleSubmit',setIndex,status)
		if(status.activeIndex===setIndex&&(status.mode==='update'||status.mode==='create')){
			this.props.onInfoUpdate(setIndex,info)
		}
		
	}
	render(){
		console.log('render FormList',store)
		const sets=this.props.sets
		//const status=store.getState()
		return (
			<div>
				<Collapse className="task-info">
					<Collapse.Item title={<span>基本信息<i className="header-icon el-icon-information"></i></span>}>
						<div>性别：男</div>
						<div>年龄：45周岁</div>
					</Collapse.Item>
				</Collapse>	
				<Collapse className="set-info" value={""+this.props.activeIndex}>
					{sets.map((item,i)=>
						<Collapse.Item key={i} title={"标注区域"+i} name={""+i}>
							<AreaForm info={item.info} index={i} changeable={item.draggable}
							onSubmit={this.handleSubmit.bind(this)}
							/>
						</Collapse.Item>
						)
					}
				</Collapse>
			</div>
		
		)
	}
}
