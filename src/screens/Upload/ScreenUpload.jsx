import React, {Component} from 'react';
import './ScreenUpload.css';
import {Button} from "element-react";
import NetApi from './net';
import List from "../../components/Upload/List";

const net = new NetApi();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileToUpload: 0,
            fileList: [],
            showList: []
        }
    }

    uploadFile() {
        if (this.state.fileToUpload < 1) {
            console.log('no element in fileList');
            return;
        }
        net.applyUploadUrl(this.state.fileToUpload).then((event) => {
            this.setState({
                fileToUpload: 0
            });
            var itemCnt = 0;
            for (let i = 0; i < this.state.showList.length; i++) {
                // // 测试部分
                // if (i === 0) {
                //     const showList = this.state.showList;
                //     showList[i].reload = true;
                //     showList[i].url = event.data.content[i].url;
                //     this.setState({
                //         showList: showList
                //     });
                //     continue;
                // }
                // 已上传图像不再上传
                if (this.state.showList[i].success) {
                    continue;
                }
                console.log('upload ' + i + ' ' + this.state.showList[i].name);
                // 上传图片
                const showList = this.state.showList;
                if (!showList[i].url) {
                    showList[i].url = event.data.content[itemCnt].url;
                    itemCnt++;
                }
                net.upload(showList[i].url, this.state.fileList[i]).then((e) => {
                    showList[i].success = true;
                    showList[i].reload = false;
                    this.setState({
                        showList: showList
                    });
                    console.log(this.state.fileList[i].name + '上传成功');
                }, (err) => {
                    showList[i].reload = true;
                    this.setState({
                        showList: showList
                    })
                });
            }
        });
    }

    handleChange(e) {
        const list = [].slice.call(e.target.files);

        // 判断是否是jpeg
        let boollist = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].type !== 'image/jpeg') {
                boollist.push(true);
            } else {
                boollist.push(false);
            }
        }
        // 判断是否已经在队列中
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < this.state.showList.length; j++) {
                if (list[i].name === this.state.showList[j].name) {
                    boollist[i] = true;
                    break;
                }
            }
        }
        // 删除无用文件项
        for (let i = boollist.length - 1; i >= 0; i--) {
            if (boollist[i]) {
                list.splice(i, 1);
            }
        }
        const showList = this.state.showList.concat(list.map((item) => {
            return {
                name: item.name,
                success: false,
                reload: false
            }
        }));
        const fileList = this.state.fileList.concat(list);
        console.log('add file:');
        console.log(list);
        // let fileList = this.state.fileList;
        console.log('fileToUpload: ' + this.state.fileToUpload);
        this.setState({
            fileList: fileList,
            showList: showList,
            fileToUpload: this.state.fileToUpload + list.length
        });
    }

    onItemClick(key) {
        return () => {
            net.upload(this.state.showList[key].url, this.state.fileList[key]).then((e) => {
                this.state.showList[key].success = true;
                this.state.showList[key].reload = false;
                this.setState({
                    showList: this.state.showList
                });
                console.log(this.state.fileList[key].name + '上传成功');
            }, (err) => {
                this.state.showList[key].reload = true;
                this.setState({
                    showList: this.state.showList
                })
            });
        }
    }

    render() {
        return (
            <div className='app'>
                <div className='header'/>
                <div className='content'>
                    <input type='file' multiple onChange={this.handleChange.bind(this)}/>
                    <Button size='small' type='primary' onClick={this.uploadFile.bind(this)}>点击上传</Button>
                </div>
                <List onItemClick={this.onItemClick.bind(this)} showList={this.state.showList}/>
            </div>
        );
    }
}

export default App;
