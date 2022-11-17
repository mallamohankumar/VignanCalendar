import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {useState,useEffect} from 'react'
import axios from 'axios'


const EventCal = () => {
            const [data,setdata] = useState([{}]);
            useEffect(()=>{
              axios.get('https://vignancalendar.herokuapp.com/cal')
              .then((res)=>{
                //  console.log(res.data);
                 setdata(res.data);
              })
              .catch(()=>{
                  alert("error");
              });
            });
            const handleDateClick = (arg) => { // bind with an arrow function
              alert(arg.dateStr)
            }
            
  return (
    <section className="user1" id="user1">
      <h1>Vignan Calendar</h1>
      <div className="container2">
      <FullCalendar
        plugins={[ dayGridPlugin , timeGridPlugin, listPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        // weekends={false}
        // dateClick={this.handleDateClick} 
        events={data}
      />
      </div>
      
    </section>
  )
}

export default EventCal;
