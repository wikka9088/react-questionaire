import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Checkbox,Row, Col, Button} from 'antd'
import './main.css'




class Main extends Component {
    constructor() {
        super();
        let data = sessionStorage.getItem('data');
        let arr = JSON.parse(data);
        this.state = {
            arr,
        }
    }



    render() {
        // const radioStyle = {
        //     display: 'block',
        //     height: '30px',
        //     lineHeight: '30px',
        //   };
       
        
        let list =this.state.arr.map((item,i) =>{
            return (
                <div key={i} >
                    <h2>Question {i +1}:{item.title}</h2>

                    {/* <RadioGroup onChange={() => {}} className="item">
                        {
                        item.item.map((item1, i1) => {
                            return(
                                <Radio style={radioStyle} key={i1} value={i1}>{item1.value}</Radio>
                            )
                        })
                        }
                    </RadioGroup> */}
                    <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>{
                        item.item.forEach((e_item) => {
                            e_item.checkbox = false
                            
                        })
                        e.forEach((e2_item) => {
                            item.item[e2_item].checkbox = true
                        })
                    }}>
                        <Row>
                        {
                        item.item.map((item1, i1) => {
                            return(
                                <Col span={24} key={i1}><Checkbox value={i1}>{item1.value}</Checkbox></Col>
                            )
                        })
                        }
                        </Row>
                    </Checkbox.Group>
                </div>
                
            )
        })
        return (
            <div className="main-content">
            {list}
            <Button type="primary" onClick={()=>this.submit()}>Submit</Button>
            <Button type="danger" onClick={()=>this.back()}>Back</Button>
            </div>
        );
    }
    change(e) {
        this.props.history.push('/')
    }

    back() {
        sessionStorage.setItem('data', JSON.stringify(this.state.arr));
        this.props.history.push('/')
    }

    submit() {
        let arr = []
        this.state.arr.forEach((item,i) => {
            let arr2 = []
            item.item.forEach(item2 => {
                if(item2.checkbox){
                    arr2.push(item2.value)
                }
            })
            arr.push(`Question ${i + 1}:${item.title} ${arr2.join(',')}`)
        })
        alert(arr.join('----'))
    }
}
export default withRouter(Main)
