import React, {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardItem from './CardItem';

// @DragSource(Types.CARD, cardSource, collect)
@DragDropContext(HTML5Backend)
class CardDrag extends Component {
	state = {
	    CardList: [{ //定义卡片内容
		    title:"first Card",
		    id: 1,
		    content:"this is first Card"
		  },{
		    title:"second Card",
		    id: 2,
		    content:"this is second Card"
		  },{
		    title:"Third Card",
		    id: 3,
		    content:"this is Third Card"
		  },{
		    title:"Four Card",
		    id: 4,
		    content:"this is Four Card"
		  },{
		    title:"Five Card",
		    id: 5,
		    content:"this is Five Card"
		  },
		]
	}; 

	handleDND = (dragIndex,hoverIndex) => {
        const { CardList } = this.state;
        let tmp = CardList[dragIndex] //临时储存文件
        CardList.splice(dragIndex,1) //移除拖拽项
        CardList.splice(hoverIndex,0,tmp) //插入放置项
        this.setState({
            CardList
        })
    }
	handleClose = (id) => {
        const { CardList } = this.state;
        const temp = CardList.filter(item => item.id !== id);
        this.setState({
            CardList: temp
        })
    }

  	render() {
        const { CardList } = this.state;
	    return (
	        <div style={{display: 'flex',margin: 50}}>
	            {CardList.map((item,index) => {
	                return(
	                    <CardItem //向次级界面传递参数
	                        key={item.id}
	                        id={item.id}
	                        title={item.title}
	                        content={item.content}
	                        index={index}
	                        onDND={this.handleDND}
	                        onClose={this.handleClose}
	                    />
	                )
	            })}
	        </div>
	    );
  	}
}


export default CardDrag;