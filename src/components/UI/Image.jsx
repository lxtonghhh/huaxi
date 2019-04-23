import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import PropTypes from 'prop-types'

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
export default class UIImage extends Component{
  static propTypes={
    src:PropTypes.string.isRequired,
    width:PropTypes.number,
    height:PropTypes.number,
    x:PropTypes.number,
    y:PropTypes.number
  }
  constructor(){
    super()
    this.state={
      image:null
    }
  }
  componentDidMount() {
    this._loadImage()
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this._loadImage()
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad.bind(this))
  }
  _loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image()
    this.image.src = this.props.src
    this.image.addEventListener('load', this.handleLoad.bind(this))
  }
  handleLoad(){
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({image: this.image})
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  }
  render() {
    return (
      <Image
        x={this.props.x} y={this.props.y}
        width={this.props.width} height={this.props.height}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    )
  }
}
