import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Stage,Layer,Rect,Text} from 'react-konva'
import Konva from 'konva'
import UILogo from '../../components/UI/Logo'
import UIImage from '../../components/UI/Image'
import NodeList from '../../components/Work/Node/List'
import Operation from '../../components/Work/Operation'
import FormList from '../../components/Work/Form/List'
import store from '../../index'
import {createSet,confirmSet} from '../../reducers/work'
import _ from 'lodash'
class ScreenWork extends Component{
	constructor(){
		super()
		this.state={
			sets:[
				//{nodes:[],lines:[],draggable:false}
			],
			//只有三种情况可以更改activeIndex 1.新增set 改为最新的index 2.handleSelectSet 改为选择的index 1.handleConfirmSet 改为-1 
			activeIndex:-1
		}
		
	}
	_next_target(){
		let target=_.sample([
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/1.jpg',width:720,height:540},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/2.jpg',width:720,height:540},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/3.jpg',width:720,height:540}
		])
		console.log('_next_target',target)
		this.setState({target})
	}
	_updateNodeandLine(setIndex,nodeIndex,x,y){
		console.log('_updateNodeandLine setIndex and nodeIndex:',setIndex,nodeIndex)
		console.log(this.state.sets[setIndex])
		const nodes=this.state.sets[setIndex].nodes
		const lines=this.state.sets[setIndex].lines
		const draggable=this.state.sets[setIndex].draggable
		
		//更新nodes
		nodes[nodeIndex]={x,y}
		//更新lines
		if(nodes.length===0){
			alert('节点数不可能为0')
		}
		else if(nodes.length===1){
			//节点数为1 lines为空
			//lines=[]错误写法 const不可改变引用
			//do nothing
		}
		else{
			let lastIndex=nodeIndex-1
			if(lastIndex===-1){
				lastIndex=nodes.length-1
			}
			lines[nodeIndex].x1=x
			lines[nodeIndex].y1=y
			lines[lastIndex].x2=x
			lines[lastIndex].y2=y
		}
		//todo 使用let newSet={...oldSet,nodes:nodes}
		let newSet={nodes:nodes,lines:lines,draggable:draggable}
		console.log('_updateNodeandLine after nodes and lines:',nodes,lines)
		const sets=this.state.sets
		sets[setIndex]=newSet
		this.setState({sets:sets})
	}
	_addNodeAndLine(setIndex,nodeIndex,x,y){
		//指定位置添加节点后更新nodes和lines
		//nodeIndex上一节点的index跟在其后 -1为第一个节点
		const nodes=this.state.sets[setIndex].nodes
		const lines=this.state.sets[setIndex].lines
		const draggable=this.state.sets[setIndex].draggable
		let newNodes,newLines,line1,line2
		if(nodeIndex===-1){
			//添加在第一个节点
			newNodes=_.concat({x,y},nodes)
		}
		else if(nodeIndex===nodes.length-1){
			//添加指定节点后 是末尾
			newNodes=_.concat(nodes,{x,y})
		}else{
			//添加指定节点后 不是末尾
			newNodes=_.concat(_.slice(nodes,0,nodeIndex+1),{x,y},_.slice(nodes,nodeIndex+1,nodes.length))
		}
		if(nodes.length===0){
			newLines=[]
		}
		//n个节点 n条边 特殊地 1个节点0条边
		else if(nodeIndex===-1){
			//添加在第一个节点 且不是唯一的节点
			line1={x1:x, y1:y, x2:nodes[0].x, y2:nodes[0].y}
			line2={x1:nodes[nodes.length-1].x, y1:nodes[nodes.length-1].y, x2:x, y2:y}
			newLines=_.concat(line1,_.slice(lines,0,nodes.length-1),line2)
		}
		else if(nodeIndex===nodes.length-1){
			//添加指定节点后 是末尾
			line1={x1:nodes[nodeIndex].x, y1:nodes[nodeIndex].y, x2:x, y2:y}
			line2={x1:x, y1:y,x2:nodes[0].x, y2:nodes[0].y}
			newLines=_.concat(_.slice(lines,0,nodes.length-1),line1,line2)
		}else{
			//添加指定节点后 不是末尾
			line1={x1:nodes[nodeIndex].x, y1:nodes[nodeIndex].y, x2:x, y2:y}
			line2={x1:x, y1:y,x2:nodes[nodeIndex+1].x, y2:nodes[nodeIndex+1].y}
			newLines=_.concat(_.slice(lines,0,nodeIndex),line1,line2,_.slice(lines,nodeIndex+1,nodes.length))
		}
		let newSet={nodes:newNodes,lines:newLines,draggable:draggable}
		console.log('nodes:',newNodes)
		console.log('lines:',newLines)
		const sets=this.state.sets
		sets[setIndex]=newSet
		this.setState({sets:sets})
	}
	_DeleteNodeAndLine(setIndex,nodeIndex){
		//指定位置nodeIndex节点删除后更新nodes和lines
		const nodes=this.state.sets[setIndex].nodes
		const lines=this.state.sets[setIndex].lines
		const draggable=this.state.sets[setIndex].draggable
		let newNodes,newLines,line
		if(nodes.length===0){
			return
		}
		else if(nodes.length===1){
			//成为空set
			newNodes=[]
			newLines=[]
		}
		else if(nodes.length===2){
			//n个节点 n条边 特殊地 1个节点0条边
			newNodes=_.concat(_.slice(nodes,0,nodeIndex),_.slice(nodes,nodeIndex+1,nodes.length))
			newLines=[]
		}
		else{
			newNodes=_.concat(_.slice(nodes,0,nodeIndex),_.slice(nodes,nodeIndex+1,nodes.length))
			let lastNodeIndex=nodeIndex-1
			let nextNodeIndex=nodeIndex+1
			if(lastNodeIndex===-1){
				//删除节点是第一个节点
				lastNodeIndex=nodes.length-1
				line={x1:nodes[lastNodeIndex].x, y1:nodes[lastNodeIndex].y, x2:nodes[nextNodeIndex].x, y2:nodes[nextNodeIndex].y}
				newLines=_.concat(_.slice(lines,nextNodeIndex,nodes.length-1),line)
			}
			else if(nextNodeIndex===nodes.length){
				//删除节点是末尾
				nextNodeIndex=0
				line={x1:nodes[lastNodeIndex].x, y1:nodes[lastNodeIndex].y, x2:nodes[nextNodeIndex].x, y2:nodes[nextNodeIndex].y}
				newLines=_.concat(_.slice(lines,0,lastNodeIndex),line)
			}
			else{
				line={x1:nodes[lastNodeIndex].x, y1:nodes[lastNodeIndex].y, x2:nodes[nextNodeIndex].x, y2:nodes[nextNodeIndex].y}
				newLines=_.concat(_.slice(lines,0,lastNodeIndex),line,_.slice(lines,nextNodeIndex,nodes.length))
			}
		}
		let newSet={nodes:newNodes,lines:newLines,draggable:draggable}
		console.log('nodes:',newNodes)
		console.log('lines:',newLines)
		const sets=this.state.sets
		sets[setIndex]=newSet
		this.setState({sets:sets})
	}
	componentWillMount(){
		this._next_target()
	}

	handleNodeChange(setIndex,nodeIndex,x,y){
		console.log('Node Changed',setIndex,nodeIndex,x,y)
		this._updateNodeandLine(setIndex,nodeIndex,x,y)
		console.log('After Node Changed',this.state.sets[setIndex].nodes[nodeIndex].x,this.state.sets[setIndex].nodes[nodeIndex].y)
	}
	handleNodeAdd(setIndex,nodeIndex,x,y){
		console.log('Node Add',setIndex,nodeIndex,x,y)
		this._addNodeAndLine(setIndex,nodeIndex,x,y)
		console.log('After Node Add',this.state.sets[setIndex].nodes[nodeIndex+1].x,this.state.sets[setIndex].nodes[nodeIndex+1].y)
	}
	handleNodeDelete(setIndex,nodeIndex){
		console.log('Node Delete',setIndex,nodeIndex)
		this._DeleteNodeAndLine(setIndex,nodeIndex)
		console.log('After Node Delete',this.state.sets[setIndex])
	}
	handleSetAdd(e){
		let status=store.getState()
		if(status.mode==='create'&&e.target.className==='Image'){
			//e.target.className==='Image'用于阻止点击NodePoint的事件触发
			let setIndex,nodeIndex
			if(status.activeIndex===-1){
				//新增set
				let newSet={nodes:[],lines:[],draggable:true}
				setIndex=this.state.sets.length
				nodeIndex=-1
				console.log('add new set:',newSet)
				store.dispatch(createSet(setIndex,status.lastActiveIndex))
				this.setState({
					activeIndex:setIndex,
					sets:_.concat(this.state.sets,newSet),	
				})
				console.log('now sets is:',_.concat(this.state.sets,newSet),this.state.activeIndex)
			}else{
				//已有的set中新增node
				setIndex=status.activeIndex
				nodeIndex=this.state.sets[setIndex].nodes.length-1
			}
			console.log('Set Add',setIndex,nodeIndex,e.evt.offsetX,e.evt.offsetY)
			this._addNodeAndLine(setIndex,nodeIndex,e.evt.offsetX,e.evt.offsetY)
			status=store.getState()
			console.log('Node Add After',status)
		}else{
			return 
		}
	}
	handleCreateSet(lastActiveIndex,activeIndex){
		//create模式中只有当前set可以被拖动 -1表示没选中
		const sets=this.state.sets
		if(lastActiveIndex===activeIndex){
			return 
		}
		if (lastActiveIndex!==-1){
			//lastActiveIndex===-1 表示之前的状态是未选中
			const lastSet=this.state.sets[lastActiveIndex]
			lastSet.draggable=false
			sets[lastActiveIndex]=lastSet
		}
		if (activeIndex!==-1){
			//新增的set是不会受到控制的 在新生成时设置
			const curSet=this.state.sets[activeIndex]
			curSet.draggable=true
			sets[activeIndex]=curSet
		}
		console.log('handleCreateSet','lastActiveIndex:',lastActiveIndex,'activeIndex:',activeIndex)
		this.setState({sets:sets})

	}
	handleConfirmSet(){
		//ready模式中没有set可以被拖动 -1表示没选中
		const sets=this.state.sets
		let activeIndex=this.state.activeIndex
		if (activeIndex!==-1){
			const curSet=this.state.sets[activeIndex]
			curSet.draggable=false
			sets[activeIndex]=curSet
			console.log('handleConfirmSet,curSet.draggable:',curSet.draggable)
		}else{
			console.log('handleConfirmSet,curSet.draggable:',-1)
		}
		//好像不用setState也能更改sets状态
		this.setState({activeIndex:-1,sets:sets})
	}
	handleUpdateSet(lastActiveIndex,activeIndex){

	}
	handleDeleteSet(){
		//delete模式中没有set可以被拖动 -1表示没选中
		const sets=this.state.sets
		let activeIndex=this.state.activeIndex
		if (activeIndex!==-1){
			const curSet=this.state.sets[activeIndex]
			curSet.draggable=false
			sets[activeIndex]=curSet
			console.log('handleDeleteSet,curSet.draggable:',curSet.draggable)
		}else{
			console.log('handleDeleteSet,curSet.draggable:',-1)
		}
		this.setState({sets:sets})
	}
	handleSelectSet(selectedIndex){
		//将selectedIndex设为state中activeIndex
		//被选中的set默认为update模式 可以被拖动
		console.log('handleSelectSet',selectedIndex,store.getState().mode)
		const sets=this.state.sets
		let lastActiveIndex=store.getState().lastActiveIndex
		let activeIndex=selectedIndex
		if(lastActiveIndex===activeIndex){
			return 
		}
		if (lastActiveIndex!==-1){
			//lastActiveIndex===-1 表示之前的状态是未选中
			const lastSet=this.state.sets[lastActiveIndex]
			lastSet.draggable=false
			sets[lastActiveIndex]=lastSet
		}
		if (activeIndex!==-1){
			//新增的set是不会受到控制的 在新生成时设置
			const curSet=this.state.sets[activeIndex]
			curSet.draggable=true
			sets[activeIndex]=curSet
		}
		this.setState({activeIndex:selectedIndex,sets:sets})
	}
	handleInfoUpdate(setIndex,info){
		const sets=this.state.sets
		sets[setIndex].info=info
		console.log('handleInfoUpdate',setIndex,sets[setIndex])
		this.setState({sets:sets})
	}
	handleCommit(){
		this.setState({
			box1:{x:10,y:10,width:100,height:100},
			sets:[],
			activeIndex:-1
		})
		console.log('SAVE:',this.state.sets)
		this._next_target()
	}
	render(){
		const sets=this.state.sets
		const width=this.state.target.width
		const height=this.state.target.height
		console.log('render sets:',sets)
		return (
			<div>
				<Guide />
				<Operation sets={sets} activeIndex={this.state.activeIndex} 
				onSelectSet={this.handleSelectSet.bind(this)} 
				onCreateSet={this.handleCreateSet.bind(this)} 
				onUpdateSet={this.handleUpdateSet.bind(this)}
				onDeleteSet={this.handleDeleteSet.bind(this)}
				onConfirmSet={this.handleConfirmSet.bind(this)}
				onCommit={this.handleCommit.bind(this)}
				/>
				<div style={{flexDirection:'row',display: 'flex'}}>
					<Stage width={width} height={height}>
						<Layer onClick={this.handleSetAdd.bind(this)}>
							<UIImage src={this.state.target.url}
							width={width} height={height}
							/>
							{sets.map((item,i)=>
								<NodeList key={i} index={i} 
								width={width} height={height} 
								nodes={sets[i].nodes} lines={sets[i].lines} draggable={sets[i].draggable}
								onNodeChange={this.handleNodeChange.bind(this)} 
								onNodeAdd={this.handleNodeAdd.bind(this)}
								onNodeDelete={this.handleNodeDelete.bind(this)}
								/>
							)}
						</Layer>
					</Stage>
					<FormList sets={sets} onInfoUpdate={this.handleInfoUpdate.bind(this)} activeIndex={this.state.activeIndex}/>   
				</div>
			</div>
		)
	}
}
function Guide(props){
	return(
		<div className="work-guide">
			<p>Tip1: click Button-'新增' to create a new nodeset,you can drag the point freely in this mode.</p>
			<p>Tip2: click Button-'修改' to modify the chosen nodeset,you can drag the point or add a new point on a certain line freely in this mode.</p>
			<p>Tip3: click Button-'删除' to delete a certain point in the chosen nodeset.</p>
			<p>Tip4: click Button-'确认' to confirm the chosen nodeset,then you can create or modify another nodeset you want.</p>
			<p>Tip5: click Radio-'numberX' to convert to the chosen nodeset,then you can operate on it.</p>
		</div>
	)
}
export default ScreenWork