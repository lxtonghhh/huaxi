import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-konva'
export default class WorkNodeLine extends Component{
	static propTypes={
		line:PropTypes.object.isRequired,
		index:PropTypes.number.isRequired,
		visible:PropTypes.bool.isRequired,
		onNodeAdd:PropTypes.func.isRequired,
		color:PropTypes.string

	}
	constructor(){
		super()
		this.state={}
	}
	handleNodeAdd(e){
		//offsetX:鼠标相对于“触发事件的元素”的位置
		console.log(e,e.evt.offsetX,e.evt.offsetY)
		this.props.onNodeAdd(this.props.index,e.evt.offsetX,e.evt.offsetY)
	}
	render(){
		const line=this.props.line
		const points=[line.x1,line.y1,line.x2,line.y2]//获得一个对象 const comment=this.props  comment只是一个引用
		return (
			<Line stroke={this.props.color} strokeWidth={3} points={points} onClick={this.handleNodeAdd.bind(this)} visible={this.props.visible}
			/>
		)
	}
}	

