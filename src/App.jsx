import { useState } from 'react'
import './App.css'

function App() {
  const [currentNumber, setCurrentNumber] = useState('0')
  const [previousNumber, setPreviousNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [shouldResetScreen, setShouldResetScreen] = useState(false)

  const handleNumber = (number) => {
    if (shouldResetScreen) {
      setCurrentNumber(number)
      setShouldResetScreen(false)
    } else {
      setCurrentNumber(currentNumber === '0' ? number : currentNumber + number)
    }
  }

  const handleOperator = (op) => {
    if (operator !== null && previousNumber !== null) {
      // 連続した演算の場合、前回の計算を実行
      const result = calculate()
      setPreviousNumber(result)
      setCurrentNumber(result)
      setOperator(op)
    } else {
      setPreviousNumber(currentNumber)
      setOperator(op)
    }
    setShouldResetScreen(true)
  }

  const calculate = () => {
    if (previousNumber === null || operator === null) return currentNumber
    
    const prev = parseFloat(previousNumber)
    const current = parseFloat(currentNumber)
    let result

    switch (operator) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '/':
        result = prev / current
        break
      default:
        return currentNumber
    }

    return Number.isInteger(result) ? String(result) : result.toFixed(8).replace(/\.?0+$/, '')
  }

  const handleEqual = () => {
    if (previousNumber === null || operator === null) return
    
    const result = calculate()
    setCurrentNumber(result)
    setPreviousNumber(null)
    setOperator(null)
    setShouldResetScreen(true)
  }

  const handleClear = () => {
    setCurrentNumber('0')
    setPreviousNumber(null)
    setOperator(null)
    setShouldResetScreen(false)
  }

  const getDisplayFormula = () => {
    if (previousNumber === null) return ''
    const displayOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator
    return `${previousNumber} ${displayOperator}`
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{getDisplayFormula()}</div>
        <div className="current">{currentNumber}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="clear">C</button>
        <button className="operator-top">&plusmn;</button>
        <button className="operator-top">%</button>
        <button onClick={() => handleOperator('/')} className="operator">÷</button>

        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('*')} className="operator">×</button>

        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('-')} className="operator">−</button>

        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>

        <button onClick={() => handleNumber('0')} className="zero">0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={handleEqual} className="equal">=</button>
      </div>
    </div>
  )
}

export default App
