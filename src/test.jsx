import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Menu,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class ScreenTest extends Component{
	static propTypes={
	}
	
	constructor(props){
		super(props)
		this.state={
			ratio:1,
			width:500,
			height:500
		}
		this.handleScroll = this.handleScroll.bind(this);
    	this.handleScroll.passive = false;
	}
	componentDidMount(){
		//垃圾react自带添加事件监听onWheel里面无法配置passive为false
		// 为元素添加事件监听   
		document.getElementById('t1').addEventListener("mousewheel", (e) => {
		  // 执行滚动回调
		  this.handleScroll(e)
		}, {
		  passive: false //  禁止 passive 效果
		})
	}
	handleScroll(e){
		e.preventDefault()
		console.log("handleScroll",e.deltaX,e.deltaY)
		if(e.deltaY>0){
			this.setState((preState,props)=>{
				let newRatio=preState.ratio<=0.51?preState.ratio:preState.ratio-=0.1
				return {ratio:newRatio}
			})
			//this.setState({ratio:this.state.ratio-=0.1})
			console.log("handleScroll 缩小",this.state.ratio)
		}else{
			this.setState((preState,props)=>{
				let newRatio=preState.ratio>=4.1?preState.ratio:preState.ratio+=0.1
				return {ratio:newRatio}
			})
			//this.setState({ratio:this.state.ratio+=0.1})
			console.log("handleScroll 放大",this.state.ratio)
		}
		
	}
	render(){
		return (
			<div className="test">
				<img id="t1" src="http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/1.jpg" 
				width={this.state.width*this.state.ratio} height={this.state.height*this.state.ratio} 
			
				/>
			</div>
		)
	}
}

