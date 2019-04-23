import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {Button,Input,Collapse,Carousel} from 'element-react'
import _ from 'lodash'
const statusToColorType={"doing":"info","finish":"success","3":"warning","4":"danger"}
const statusToText={"doing":"进行中","finish":"已完成","3":"warning","4":"danger"}
const show={display:'flex'}
const hidden={display:'none'}
function TaskItem(props){
	return (
			<div className="task-item">
				<table>
					<tbody>
						<tr>
							<td><span className="task-content-text">文件夹/任务： {props.content}</span></td>
							<td>
								<span style={{padding:"0px 20px"}}>
									<Button className="button-status" type={statusToColorType[props.status]} icon="star-off" size="mini">{statusToText[props.status]}</Button>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

	)
}
function TaskInfo(props){
	return (
			<div className="task-info">
				<Collapse value={"0"}>
			      <Collapse.Item title="基本信息" name="1">
			        <div>性别： {props.info.gender?props.info.gender:"男"}</div>
			        <div>年龄 {props.info.age?props.info.age:45}岁</div>
			        <div>病史： {props.info.history?props.info.history:"资料缺失"}</div>
			      </Collapse.Item>
			    </Collapse>
			</div>
	)
}
const testImg=[
			//{url:'https://mmbiz.qpic.cn/mmbiz_jpg/gFxQW0ZLIfMsibjKx4ibk7ktpMxYaOoomia3SbsibkWKZicc3Efb6eiaQ2iaCg9OTD90bQZbTnWGum8lC7XlJc2LWnCgQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
			//width:540,height:720},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/1.jpg',width:720,height:540},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/2.jpg',width:720,height:540},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/3.jpg',width:720,height:540}
]
function TaskImage(props){
	console.log(props.questions)
	return (
			<div className="task-img">
				<Collapse value={"0"}>
			      <Collapse.Item title="图片" name="1">
			        <Carousel trigger="click" height="250px" autoplay={false}>
			          {
			            props.questions.map((item, index) => {
			              return (
			                <Carousel.Item key={index}>
		                  		<h3>{index}</h3>
								<img src={item.url} alt={index} width="150px" height="150px" />
								<img src={item.url} alt={index} width="150px" height="150px" />
								<img src={item.url} alt={index} width="150px" height="150px" />
			                </Carousel.Item>
			              )
			            })
			          }
			        </Carousel>
			      </Collapse.Item>
			    </Collapse>
			</div>

	)
}
class Task extends Component{
	static propTypes={
		index:PropTypes.number,
		content:PropTypes.string,
		uid:PropTypes.string,
		pid:PropTypes.string,
		tid:PropTypes.string,
		status:PropTypes.string,
		task:PropTypes.object
	}
	constructor(){
		super()
		this.state={
			isShowInfo:false,
			isShowImg:false
		}
	}
	onChange(key, value) {
		console.log('Task onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}
	render(){
		return (
			<div className="task">
				<TaskItem content={this.props.content} status={this.props.status} />
				<TaskInfo info={this.props.task.info}/>
				<TaskImage questions={this.props.task.questions}/>
			</div>
		)
	}
}
export default Task
//<div class="ist_menu" style="z-index: 505; top: 189px; left: 729px;">

const exampleTaskObj={
	"uid": "admin",
	"status": "doing",
	"level": "2",
	"tid": "1",
	"pid": "0",
	"content": "快速开始11",
	"ddl": "2019-04-15T00:00:00",
	"info": {},
	"questions": [
	    {
	        "qid": "11",
	        "url": "http://oss-cn-shenzhen.aliyuncs.com/sm-breeze-01/source/admin/0/1/11.jpg"
	    },
	    {
	        "qid": "13",
	        "url": "http://oss-cn-shenzhen.aliyuncs.com/sm-breeze-01/source/admin/0/1/13.jpg"
	    }
	]
}