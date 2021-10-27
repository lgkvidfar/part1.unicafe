import React, { useState } from 'react'

const Header = () => (
  <h1>give feedback</h1>
)



const Buttons = (props) => {

  return (
    <div>
      <button onClick={props.handleGoodClick}>good</button>
      <button onClick={props.handleNeutralClick}>neutral</button>
      <button onClick={props.handleBadClick}>bad</button>
    </div>
  )
}

const StatLineGood = ({good,text}) => {
  return (
    <div>
      <p>{text} {good}</p>
    </div>
  )
}

const StatLineNeutral = ({neutral,text}) => {
  return (
    <div>
      <p>{text} {neutral}</p>
    </div>
  )
}

const StatLineBad = ({bad,text}) => {
  return (
    <div>
      <p>{text} {bad}</p>
    </div>
  )
}

const StatLineAll = ({all,text}) => {
  return (
    <div>
      <p>{text} {all}</p>
    </div>
  )
}

const StatLineAverage = ({average,text}) => {
  return (
    <div>
      <p>{text} {average}</p>
    </div>
  )
}

const StatLinePositive = ({positive,text}) => {
  return (
    <div>
      <p> {text} {positive}</p>
    </div>
  )
}


const Statistics = ({all,good,bad,neutral,average,positive,text,headline}) => {
  if(all < 1) {
    return (
      <div>
        <h2>
          {text}
        </h2>
      </div>
    )
  } else {
  return (
    <div>
      <h1>{headline}</h1>
      <StatLineGood good={good} text="good"/>
      <StatLineNeutral neutral={neutral} text="neutral"/>
      <StatLineBad bad={bad} text="bad"/>
      <StatLineAll all={all} text="all"/>
      <StatLineAverage average={average} text="average"  />
      <StatLinePositive positive={positive} text="positive" />
   </div>
  )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
    setAll(all+1)
    if(good === all || bad === 0) {
      setPositive(100)
      setAverage(1)
    } else if (good !== all) {
      setAverage((good-bad+1)/all)
      setPositive((good+1)/(all+1)*100)
    }
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    setAverage((good-bad)/all)
    setPositive(good/(all+1)*100)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    setAll(all+1)
    if(bad === all || good === 0) {
      setPositive(-100)
      setAverage(-1)
    } else if (bad !== all) {
      setAverage((good-bad-1)/all)
      setPositive(good/(all+1)*100)
    }
  }

    return (
    <div>
      <Header headline="give feedback"/>
      <Buttons handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} handleBadClick={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} all={all} text="no feedback given"/>
    </div>
    )
}

export default App