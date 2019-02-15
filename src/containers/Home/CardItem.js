//CardItem.js

import React, { PureComponent } from 'react';
// import {findDOMNode} from 'react-dom';
import {Card} from 'antd'

import { //引入react-dnd
    DragSource,
    DropTarget,
} from 'react-dnd'


const Types = { // 设定类型，只有DragSource和DropTarget的类型相同时，才能完成拖拽和放置
    CARD: 'CARD'
};

//DragSource相关设定
const CardSource = {  //设定DragSource的拖拽事件方法
    beginDrag(props,monitor,component){ //拖拽开始时触发的事件，必须，返回props相关对象
        return {
            index:props.index
        }
    },
    // endDrag(props, monitor, component){
    //   //拖拽结束时的事件，可选
    // },
    // canDrag(props, monitor){
    //   //是否可以拖拽的事件。可选
    // },
    // isDragging(props, monitor){
    //   // 拖拽时触发的事件，可选
    // }
};

function collect(connect,monitor) { //通过这个函数可以通过this.props获取这个函数所返回的所有属性
    return{
        connectDragSource:connect.dragSource(),
        isDragging:monitor.isDragging()
    }
}

//DropTarget相关设定
const CardTarget = {
    // drop(props, monitor, component){ //组件放下时触发的事件
    //     //...
    //     console.log(props);
    // },
    // canDrop(props,monitor){ //组件可以被放置时触发的事件，可选
    //     //...
    // },
    hover(props,monitor,component){
        if(!component) return null; //异常处理判断
        const dragIndex = monitor.getItem().index;//拖拽目标的Index
        const hoverIndex = props.index; //放置目标Index
        if(dragIndex === hoverIndex) return null;// 如果拖拽目标和放置目标相同的话，停止执行
        
        //如果不做以下处理，则卡片移动到另一个卡片上就会进行交换，下方处理使得卡片能够在跨过中心线后进行交换.
        // const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取卡片的边框矩形
        // const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 4;//获取X轴中点
        // const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
        // const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
        // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) { // 从前往后放置
        //     return null
        // }
        // if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) { // 从后往前放置
        //     return null
        // }
        
        props.onDND(dragIndex,hoverIndex); //调用App.js中方法完成交换
        monitor.getItem().index = hoverIndex; //重新赋值index，否则会出现无限交换情况
    }
    
};

function collect1(connect,monitor) {//同DragSource的collect函数
    return{
        connectDropTarget:connect.dropTarget(),
        isOver:monitor.isOver(), //source是否在Target上方
        isOverCurrent: monitor.isOver({ shallow: true }), 
        canDrop: monitor.canDrop(),//能否被放置
        itemType: monitor.getItemType(),//获取拖拽组件type
    }
}

@DragSource(Types.CARD,CardSource,collect)
@DropTarget(Types.CARD,CardTarget,collect1)
class CardItem extends PureComponent {

    render(){
        const { isDragging, connectDragSource, connectDropTarget} = this.props;
        let opacity = isDragging ? 0.1 : 1; //当被拖拽时呈现透明效果

        return connectDragSource( //使用DragSource 和 DropTarget
            connectDropTarget( <div style={{marginRight: 15}}>
                <Card
                    title={this.props.title}
                    style={{ width: 200 ,opacity}}
                >
                    <span onClick={() => this.props.onClose(this.props.id)}>删除</span>
                    <p>{this.props.content}</p>
                </Card>
            </div> )
        )
    }
}

export default CardItem;