import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Group,Circle,Line} from 'react-konva'
import NodePoint from './Point'
import NodeLine from './Line'
import store from '../../../index'
import {createSet,selectSet,deleteSet} from '../../../reducers/work'
export default class WorkNodeList extends Component{
	static propTypes={
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired,
		draggable:PropTypes.bool.isRequired,
		nodes:PropTypes.array.isRequired,
		lines:PropTypes.array.isRequired,
		index:PropTypes.number.isRequired,
		onNodeChange:PropTypes.func.isRequired,
		onNodeAdd:PropTypes.func.isRequired,
		onNodeDelete:PropTypes.func.isRequired
	}
	constructor(){
		super()
		this.state={}
	}
	handleNodeChange(nodeIndex,x,y){
		//只有activeIndex对应当前set才可以
		let setIndex=this.props.index
		this.props.onNodeChange(setIndex,nodeIndex,x,y)
	}
	handleNodeAdd(nodeIndex,x,y){
		let status=store.getState()
		let setIndex=this.props.index
		console.log('handleNodeAdd,status.mode:',status.mode,' status.activeIndex:',status.activeIndex)
		if (status.mode==='update'&&setIndex===status.activeIndex){
			//只有mode为update且activeIndex对应当前set才可以
			this.props.onNodeAdd(setIndex,nodeIndex,x,y)
		}else{
			return
		}
	}
	handleNodeDelete(nodeIndex){
		let status=store.getState()
		let setIndex=this.props.index
		console.log('handleNodeDelete,status.mode:',status.mode,' status.activeIndex:',status.activeIndex)
		if (status.mode==='delete'&&setIndex===status.activeIndex){
			//只有mode为delete且activeIndex对应当前set才可以
			this.props.onNodeDelete(setIndex,nodeIndex)
		}else{
			return
		}
		
	}
	render(){
		const nodes=this.props.nodes//获得一个对象 const comment=this.props  comment只是一个引用
		const lines=this.props.lines
		const status=store.getState()
		return (
			<Group index={this.props.index} className='node-set'> 
				{lines.map((item,i)=>
					<NodeLine key={i} index={i} line={item}
					color={this.props.draggable?"red":"blue"}
					visible={status.mode==='create'?(status.activeIndex===this.props.index?(lines.length-1===i?false:true):true):true}
					onNodeAdd={this.handleNodeAdd.bind(this)}
					/>)
				}
				{nodes.map((item,i)=>
					<NodePoint key={i} index={i} node={item} draggable={this.props.draggable}

					width={this.props.width} height={this.props.height} 
					onNodeDelete={this.handleNodeDelete.bind(this)}
					onNodeChange={this.handleNodeChange.bind(this)}
					/>)
				}
				
			</Group>
		)
	}
}


