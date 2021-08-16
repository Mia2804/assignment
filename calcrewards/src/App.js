
import React, { useState, useEffect } from "react";
import "./App.css";

function calc(rawData) {
  
  const pointsPerTran = rawData.map(x => {
    let points = 0
    let bonus = x.price - 100
    if (bonus > 0) points += bonus*2 
    if (x.price > 50) points += 50
    const month = new Date(x.date).getMonth()
    console.log('monthinfo',month)
    return {...x, points, month}
  })

  let customer = {}
  let pointsSum = {}
  const months = [1,2,3,4,5,6,7,8,9,10,11,12]
  pointsPerTran.forEach(y => { 
    let {name, month, points} = y
    if(!customer[name]) customer[name] = []
    if(!pointsSum[name]) pointsSum[name] = 0
    pointsSum[name] += points
    if (customer[name][month]) {
      customer[name][month].points += points;
      customer[name][month].monthNumber = month;
      customer[name][month].numTransactions++;      
    }
    else {
      
      customer[name][month] = {
        name,
        monthNumber:month,
        month: months[month],
        numTransactions: 1,        
        points
      }
    }    
  });
  let tot = [];
  for (var custKey in customer) {    
    customer[custKey].forEach(cRow=> {
      tot.push(cRow);
    });    
  }
  console.log("byCustomer", customer);
  console.log("tot", tot);
  let totByCustomer = [];
  for (custKey in pointsSum) {    
    totByCustomer.push({
      name: custKey,
      points: pointsSum[custKey]
    });    
  }
  return {
    summaryByCustomer: tot,
    pointsPerTran,
    pointsSum:totByCustomer
  };
}


function App() {
  const [trandata, setTranData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/express_backend")
      .then((res) => res.json())
      .then((data) => {
        // console.log(Array.isArray(JSON.parse(data.data)))
        const results = calc(JSON.parse(data.data))
        console.log('mia',results)
        setTranData(results)
      }
      );
  }, []);

 


  if (trandata == null) {
    return <div>Loading...</div>;   
  }
  return trandata == null ?
    <div>Loading...</div> 
      :    
    <div>      
      <h1>Summary of each customer</h1>
      <div>{trandata.summaryByCustomer.map((t)=>
      <>
      <ul> 
      <li>name:{t.name}</li>
      <li>month:{t.month}</li>
      <li>number of transactions:{t.numTransactions}</li>
      <li>points:{t.points}</li>
      </ul>
      </>
      )}</div>
      <h1>Points of each transaction</h1>
      <div>{trandata.pointsPerTran.map((t)=>
      <>
      <ul>
      <li>name:{t.name}</li>
      <li>price:{t.price}</li>
      <li>date:{t.date}</li>
      <li>points:{t.points}</li>
      <li>month:{t.month}</li>
      </ul>
      </>
      )}</div>
      <h1>Total by Customer</h1>
      <div>{trandata.pointsSum.map((t)=>
      <>
      <li>name:{t.name}------
      points:{t.points}</li>
      </>)}</div>
      
 
    </div>
  ;
}

export default App;