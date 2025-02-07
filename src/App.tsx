import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentNumber, setCurrentNumber] = useState<string>('0')
  const [equation, setEquation] = useState<string>('')
  const [shouldResetCurrent, setShouldResetCurrent] = useState<boolean>(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const handleNumber = (number: string) => {
    if (shouldResetCurrent) {
      setCurrentNumber(number)
      setShouldResetCurrent(false)
    } else {
      setCurrentNumber(currentNumber === '0' ? number : currentNumber + number)
    }
  }

  const handleOperator = (operator: string) => {
    if (equation && !shouldResetCurrent) {
      calculate()
    } else {
      setEquation(currentNumber + ' ' + operator)
      setShouldResetCurrent(true)
    }
  }

  const calculate = () => {
    const parts = equation.split(' ')
    const num1 = parseFloat(parts[0])
    const operator = parts[1]
    const num2 = parseFloat(currentNumber)
    let result = 0

    switch (operator) {
      case '+':
        result = num1 + num2
        break
      case '-':
        result = num1 - num2
        break
      case '×':
        result = num1 * num2
        break
      case '÷':
        result = num1 / num2
        break
    }

    setCurrentNumber(result.toString())
    setEquation('')
    setShouldResetCurrent(true)
  }

  const handleEqual = () => {
    if (equation) {
      calculate()
    }
  }

  const handleClear = () => {
    setCurrentNumber('0')
    setEquation('')
    setShouldResetCurrent(false)
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="calculator">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="display">
        <div className="equation">{equation}</div>
        <div className="current">{currentNumber}</div>
      </div>
      <div className="buttons">
        <button className="clear" onClick={handleClear}>C</button>
        <button className="operator-top" onClick={() => handleOperator('÷')}>÷</button>
        <button className="operator-top" onClick={() => handleOperator('×')}>×</button>
        <button className="operator-top" onClick={() => handleOperator('-')}>-</button>
        
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>
        
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleNumber('.')}>.</button>
        
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button className="zero" onClick={() => handleNumber('0')}>0</button>
        <button className="equal" onClick={handleEqual}>=</button>
      </div>
    </div>
  )
}

export default App