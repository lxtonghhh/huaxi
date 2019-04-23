import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Button,Radio,Layout,Input} from 'element-react'
import {createSet} from '../../../reducers/work'
import store from '../../../index'
import _ from 'lodash'
export default class WorkAreaForm extends Component{
	static propTypes={
		info:PropTypes.object,
		index:PropTypes.number,
		onSubmit:PropTypes.func,
		changeable:PropTypes.bool
	}
	constructor(){
		super()
		
		this.state={
			form: {
		      region: '',
		      size:'',
		      paris1: null,
		      paris2: null,
		      jiaohua: -1,
		      BC: -1,
		      desc: ''
		    }
		}
	}
	componentWillMount(){
		console.log('AreaForm info',this.props.info)
		let newForm=this.props.info
		let defaultForm=this.state.form
		_.assign(defaultForm, newForm)
		console.log('AreaForm info after',this.props.info)
	}
	handleSubmit(e) {
		console.log('表单提交',this.state.form)
		this.props.onSubmit(this.props.index,this.state.form)
  		e.preventDefault();
	}

	onChange(key, value) {
	  this.state.form[key] = value;
	  this.forceUpdate();
	}
	render(){
		const form=this.state.form
		console.log('render AreaForm',this.props.index,this.props.changeable)
		return (
			<Form model={form} labelWidth="80" onSubmit={this.handleSubmit.bind(this)}>
		    	<Form.Item label="病变区域">
			        <Select value={form.region} placeholder="请选择病变区域" disabled={!this.props.changeable}
			        onChange={this.onChange.bind(this, 'region')}
			        >
						<Select.Option label="食管上段" value="食管上段"></Select.Option>
						<Select.Option label="食管中段" value="食管中段"></Select.Option>
						<Select.Option label="食管下段" value="食管下段"></Select.Option>
			        </Select>
		    	</Form.Item>
		      	<Form.Item label="病变大小">
		        	<Input value={form.size} onChange={this.onChange.bind(this, 'size')} disabled={!this.props.changeable}></Input>
		      	</Form.Item>
		      	<Form.Item label="角化">
			        <Radio.Group value={form.jiaohua} onChange={this.onChange.bind(this, 'jiaohua')}>
			          	<Radio value={1}  disabled={!this.props.changeable}>有</Radio>
			          	<Radio value={0}  disabled={!this.props.changeable}>无</Radio>
			        </Radio.Group>
		      	</Form.Item>
		      	<Form.Item label="BC">
			        <Radio.Group value={form.BC} onChange={this.onChange.bind(this, 'BC')}>
				        <Radio value={1}  disabled={!this.props.changeable}>有</Radio>
			          	<Radio value={0}  disabled={!this.props.changeable}>无</Radio>
			        </Radio.Group>
		      	</Form.Item>
		      	<Form.Item label="巴黎分型">
			      	<Layout.Col span="11">
			        	<Form.Item prop="paris1" labelWidth="0px">
				            <Select value={form.paris1} placeholder="请选择巴黎分型" disabled={!this.props.changeable}
				            onChange={this.onChange.bind(this, 'paris1')}
				            >
								<Select.Option label="0-Ip" value="0-Ip"></Select.Option>
								<Select.Option label="0-Is" value="0-Is"></Select.Option>
								<Select.Option label="0-IIa" value="0-IIa"></Select.Option>
								<Select.Option label="0-IIb" value="0-IIb"></Select.Option>
								<Select.Option label="0-IIc" value="0-IIc"></Select.Option>
								<Select.Option label="0-III" value="0-III"></Select.Option>
				        	</Select>
			      		</Form.Item>
			        </Layout.Col>
		        	<Layout.Col className="line" span="2">{form.paris1?'+':''}</Layout.Col>
			        <Layout.Col span="11">
			        	<Form.Item prop="paris2" labelWidth="0px" >
				            <Select value={form.paris2} placeholder="请选择巴黎分型" disabled={(this.props.changeable&&form.paris1)?false:true}
				            onChange={this.onChange.bind(this, 'paris2')}
				            >
								<Select.Option label="0-Ip" value="0-Ip"></Select.Option>
								<Select.Option label="0-Is" value="0-Is"></Select.Option>
								<Select.Option label="0-IIa" value="0-IIa"></Select.Option>
								<Select.Option label="0-IIb" value="0-IIb"></Select.Option>
								<Select.Option label="0-IIc" value="0-IIc"></Select.Option>
								<Select.Option label="0-III" value="0-III"></Select.Option>
				        	</Select>
			      		</Form.Item>
			        </Layout.Col>
		      	</Form.Item>
		      	<Form.Item label="诊断信息">
        			<Input type="textarea" value={form.desc} onChange={this.onChange.bind(this, 'desc')} disabled={!this.props.changeable}></Input>
      			</Form.Item>
				<Form.Item>
					<Button type="primary" nativeType="submit" disabled={!this.props.changeable}>确认</Button>
					<Button disabled={!this.props.changeable}>取消</Button>
				</Form.Item>
    		</Form>
		)
	}
}
