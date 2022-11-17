import * as React from 'react';
    import { enableRipple } from '@syncfusion/ej2-base';

import axios from 'axios';
enableRipple(true);
// import { useState,useEffect} from "react";

    export class cal extends React.PureComponent {
        state = {
                posts:[]
        };

        getpost = () => {
                 axios.get('/cal')
                 .then((res)=>{
                     const data = res.data;
                     this.setState({posts:data});
                     console.log('Data has been received');
                 })
                 .catch(()=>{
                     alert("error");
                 });
        }
        
        rendereComplete() {
            /**custom render complete function */
            // const [data,setdata] = useState([{
            //     id:'',
            //     Subject:'',
            //     StartTime:'',
            //     EndTime:''
            // }]);
            // useEffect(()=>{
            //     fetch("/cal").then(res=>{
            //       if(res.ok){
            //         return res.json()
            //       }
            //     }).then(jsonRes=>setdata(jsonRes));
                
            //     console.log(data);
            // });
            
        }
        
        componentDidMount() {
            setTimeout(() => {
                this.getpost();
            this.rendereComplete();
        });
          }
        }