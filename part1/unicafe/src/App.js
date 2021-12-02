import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => (
  <tr><td>{props.text}</td> <td>{props.value}</td></tr>
)

const Statistics = (props) => {
  return(
    <div><table>
      <StatisticLine text="good" value = {props.value.goodValue} />
      <StatisticLine text="neutral" value = {props.value.neutralValue} />
      <StatisticLine text="bad" value = {props.value.badValue} />
      <StatisticLine text="all" value = {props.value.lengthValue} />
      <StatisticLine text="average" value = {props.value.averageValue} />
      <StatisticLine text="positive" value = {props.value.positiveValue} />
    </table></div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  const average = () => {
    if(allClicks.length === 0) return 0
    else{ 
      let counter = 0
      for (let i = 0; i <= allClicks.length; i++) {
        if (allClicks[i] === 'G')
          counter = counter + 1
        else if (allClicks[i] === 'B')
          counter = counter - 1
        else
          counter = counter + 0
      }
      return (counter/allClicks.length)
    }
  }

  const positive = () => {
    if(allClicks.length === 0) return 0
    else{ 
      let counterP = 0
      for (let i = 0; i <= allClicks.length; i++) {
        if (allClicks[i] === 'G')
          counterP = counterP + 1
      }
      return (counterP/allClicks.length)*100 + ' %'
    }
  }

  let output = {
    goodValue: good,
    neutralValue: neutral,
    badValue: bad,
    lengthValue: allClicks.length,
    averageValue: average(),
    positiveValue: positive()
  }

  return (
    <div>
      <div><b><h1 size="+2">give feedback</h1></b></div>
     
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <div><b><h1 size="+2">statistics</h1></b></div>
      {allClicks.length === 0 ? 'No feedback given': <Statistics value = {output}/>}
    </div>
  )
}

export default App