import React, { useEffect, useState } from 'react'
import axios from 'axios'

const allMonths=['AllMonths','Jan','Feb',"Mar","Apr","May","Jun",'July',"Aug","Sept","Oct","Nov","Dec"]

function TranscictionStats({month}) {
    const [selectedMonthStats,setSelectedMonthStats]=useState({
        "sale":0,
        "sold":0,
        "notSold":0
    })
    console.log(month)
    useEffect(()=>{
        async function f(){
            const res=await axios.get('http://localhost:5000/slectedmonth',{'headers':{'month':month}})
            setSelectedMonthStats(res.data)
            console.log(res.data)

        }
        f()
    },[])
    
  return (<>
  <div className="con">
  <h1>{allMonths[month]}</h1>
  <h1>Total Sale{selectedMonthStats.sale}</h1>
  <h1>Sold:{selectedMonthStats.sold}</h1>
  <h1>Non SOld:{selectedMonthStats.notSold}</h1>
  </div>
  </>
  )
}

export default TranscictionStats
