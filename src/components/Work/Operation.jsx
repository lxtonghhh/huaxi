import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Radio} from 'element-react'
import store from '../../index'
import {createSet,selectSet,updateSet,deleteSet,confirmSet,commit} from '../../reducers/work'
export default class WorkOperation extends Component{
	static propTypes={
		sets:PropTypes.array,
		activeIndex:PropTypes.number,
		onCreateSet:PropTypes.func,
		onUpdateSet:PropTypes.func,
		onSelectSet:PropTypes.func,
		onDeleteSet:PropTypes.func,
		onConfirmSet:PropTypes.func,
		onCommit:PropTypes.func,
	}
	constructor(){
		super()
		this.state={mode:'ready'}
	}
	handleSelect(selectedIndex){
		//更改store中的activeIndex为selectedIndex 改变mode为'update'
		let lastActiveIndex=store.getState().activeIndex
		let activeIndex=selectedIndex
		store.dispatch(selectSet(activeIndex,lastActiveIndex))
		this.setState({mode:'update'})
		this.props.onSelectSet(selectedIndex)
	}
	handleCreate(){
		//activeIndex=-1为当前未选中任何set ready状态
		let lastActiveIndex=store.getState().lastActiveIndex
		let activeIndex=store.getState().activeIndex
		store.dispatch(createSet(activeIndex,lastActiveIndex))
		this.setState({mode:'create'})
		this.props.onCreateSet(lastActiveIndex,activeIndex)
	}
	handleUpdate(){
		//更改store中的activeIndex为selectedIndex 改变mode为'update'
		let lastActiveIndex=store.getState().lastActiveIndex
		let activeIndex=store.getState().activeIndex
		store.dispatch(updateSet(activeIndex,lastActiveIndex))
		this.setState({mode:'update'})
		this.props.onSelectSet(activeIndex)
	}
	handleDelete(){
		//更改store中的activeIndex为selectedIndex 改变mode为'delete'
		let lastActiveIndex=store.getState().lastActiveIndex
		let activeIndex=store.getState().activeIndex
		store.dispatch(deleteSet(activeIndex,lastActiveIndex))
		console.log('handleDelete',store.getState().mode)
		this.setState({mode:'delete'})
		this.props.onDeleteSet()
	}
	handleConfirm(){
		//更改store中的activeIndex为-1 改变mode为'ready'
		let lastActiveIndex=store.getState().activeIndex
		store.dispatch(confirmSet(lastActiveIndex))
		this.setState({mode:'ready'})
		this.props.onConfirmSet()
	}
	handleCommit(){
		//状态初始化
		console.log('提交本次标注结果')
		store.dispatch(commit())
		this.props.onCommit()
	}
	render(){
		return (
			<div>
				<div className='set-radio' style={{ height: 40 }}>
	        		<Radio.Group value={this.props.activeIndex} onChange={this.handleSelect.bind(this)}>
	        			{this.props.sets.map((item,index)=><Radio.Button key={index} value={index}/>)}
      				</Radio.Group>
	        	</div>
				<Button plain={this.state.mode==='create'?false:true} type="primary" icon="plus" 
				onClick={this.handleCreate.bind(this)}>新增</Button>
				<Button plain={this.state.mode==='update'?false:true} type="primary" icon="edit"
				disabled={this.state.mode==='ready'?true:false}
				onClick={this.handleUpdate.bind(this)}>修改</Button>
      			<Button plain={this.state.mode==='delete'?false:true} type="primary" icon="delete"
      			disabled={this.state.mode==='ready'?true:false}
      			onClick={this.handleDelete.bind(this)}>删除</Button>
      			<Button  type="primary" icon={this.state.mode==='ready'?"upload":"circle-check"}
      			onClick={this.state.mode==='ready'?this.handleCommit.bind(this):this.handleConfirm.bind(this)}>{this.state.mode==='ready'?"提交":"确认"}</Button>
			</div>
		)
	}
}
