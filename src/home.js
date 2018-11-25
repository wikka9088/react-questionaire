import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './home.css';
import { Button, Input, message } from 'antd';



class Home extends Component {

  constructor(){
    super();
    let data = sessionStorage.getItem('data');
    let arr = JSON.parse(data) ? JSON.parse(data) : [];
    this.state = {
      test:1,
      arr: arr
    }
  }

  render() {
    let list = this.state.arr.map((item,i) => {
      return (
            <div key={i}>
            <div className="title">
              <div>{i + 1}.</div>
              <div>Title</div>
              <div>
              <Input onChange={(e)=>{item.title =  e.target.value}} defaultValue={item.title}  placeholder="Question content" />
              </div>
              <div><Button type="danger" onClick={() => this.del(i)}>Delete</Button></div>
            </div>
            
            {
              item.item.map((item1,i1) => {

                return(
                  <div className="item" key={i1}>
                  <div>Answer {item1.index}</div>
                  <div>
                  <Input onChange={(e)=>{item1.value =  e.target.value}} defaultValue={item1.value} />
                  </div>
                </div>
                )
              })
            }
          </div>
      )
    })
    return (
      <div  className="main">
        <h1>Questionaire Editor</h1>
        {list}
        <div className='footer'>
              <Button type="primary"  onClick={() => this.add()}>Add Question</Button>
              <Button type="danger" onClick={() => this.submit()}>Preview</Button>
            </div>
      </div>
    );
  }
  add(){
    let arr = this.state.arr;
    arr.push({
      title:'',
      item:[
        {
          index:'A',
          value:''
        },
        {
          index:'B',
          value:''
        },
        {
          index:'C',
          value:''
        },
        {
          index:'D',
          value:''
        }
      ]
    })
    this.setState({
      arr
    })
    
           
        
  }

  submit(){
    if(this.state.arr.length === 0){
      message.error('You forget to add questions.');
      return
    }
    let data = true
    for(let item of this.state.arr){
      if(!item.title){
        message.error('Question content should not be empty.');
        data = false
        break 
      }else{
        for(let item1 of item.item){
          if(!item1.value){
            message.error('Answer content should not be empty.');
            data = false
            break 
          }
        }
      }
      
    }
    
    if(data){
      sessionStorage.setItem('data', JSON.stringify(this.state.arr));
      this.preview()
    }
  }
  del(i){
    let arr = this.state.arr;
    arr.splice(i,1);
    this.setState({arr})
  }


  // router direct to main
  preview(e) {
    this.props.history.push('/main')
  }
}
export default withRouter(Home)
