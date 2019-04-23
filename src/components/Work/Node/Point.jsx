import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Circle} from 'react-konva'
export default class WorkNodePoint extends Component{
	static propTypes={
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired,
		node:PropTypes.object.isRequired,
		index:PropTypes.number.isRequired,
		onNodeChange:PropTypes.func.isRequired,
		onNodeDelete:PropTypes.func.isRequired,
		draggable:PropTypes.bool.isRequired
	}
	constructor(){
		super()
		this.state={
			isDragging:false
		}
	}
	componentWillMount(){
	}
	componentDidMount(){
		//this.setState({labelSelected:this.props.labels[0].name})
	}
	componentWillUnmount(){
	}
	_check_border(x,y){
		let nx=x<5?5:(x>this.props.width-5?this.props.width-5:x)
		let ny=y<5?5:(y>this.props.height-5?this.props.height-5:y)
		return	{x:nx,y:ny}
	}
	handleDragStart(){
		this.setState({isDragging:true})
	}
	handleDragMove(e){
		//不可进行边界超出修正
		this.props.onNodeChange(this.props.index,e.target.x(),e.target.y())
	}
	handleDragEnd(e){
		this.setState({
			isDragging:false
		})
		//边界超出修正
		let xy=this._check_border(e.target.x(),e.target.y())
		this.props.onNodeChange(this.props.index,xy.x,xy.y)
		console.log(e.target.x(),e.target.y())
	}
	handleDeleteClick(e){
		console.log('handleDeleteClick',this.props.index,e.target.className)
		this.props.onNodeDelete(this.props.index)
	}
	render(){
		const node=this.props.node//获得一个对象 const comment=this.props  comment只是一个引用
		return (
			<Circle x={node.x} y={node.y} radius={5} draggable={this.props.draggable} 
			shadowBlur={5} fill={this.state.isDragging?"red":"green"}
			onclick={this.handleDeleteClick.bind(this)}
			onDragStart={this.handleDragStart.bind(this)}
			onDragMove={this.handleDragMove.bind(this)}
			onDragEnd={this.handleDragEnd.bind(this)}
			/>
		)
	}
}

