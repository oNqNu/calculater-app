import { useState } from 'react'
import './App.css'

type Operator = '+' | '-' | '*' | '/' | null

function App() {
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [previousNumber, setPreviousNumber] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator>(null)
  const [inputBuffer, setInputBuffer] = useState<string>('0')
  const [shouldResetScreen, setShouldResetScreen] = useState<boolean>(false)

  const formatNumber = (num: number): string => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(8).replace(/\.?0+$/, '')
  }

  const handleNumber = (digit: string): void => {
    if (shouldResetScreen) {
      setInputBuffer(digit)
      setCurrentNumber(parseFloat(digit))
      setShouldResetScreen(false)
    } else {
      const newBuffer = inputBuffer === '0' ? digit : inputBuffer + digit
      setInputBuffer(newBuffer)
      setCurrentNumber(parseFloat(newBuffer))
    }
  }

  const handleOperator = (op: Exclude<Operator, null>): void => {
    if (operator !== null && previousNumber !== null) {
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

  const calculate = (): number => {
    if (previousNumber === null || operator === null) return currentNumber
    
    switch (operator) {
      case '+':
        return previousNumber + currentNumber
      case '-':
        return previousNumber - currentNumber
      case '*':
        return previousNumber * currentNumber
      case '/':
        return previousNumber / currentNumber
      default:
        return currentNumber
    }
  }

  const handleEqual = (): void => {
    if (previousNumber === null || operator === null) return
    
    const result = calculate()
    setCurrentNumber(result)
    setInputBuffer(formatNumber(result))
    setPreviousNumber(null)
    setOperator(null)
    setShouldResetScreen(true)
  }

  const handleClear = (): void => {
    setCurrentNumber(0)
    setInputBuffer('0')
    setPreviousNumber(null)
    setOperator(null)
    setShouldResetScreen(false)
  }

  const getDisplayFormula = (): string => {
    if (previousNumber === null) return ''
    const displayOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator
    return `${formatNumber(previousNumber)} ${displayOperator}`
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{getDisplayFormula()}</div>
        <div className="current">{inputBuffer}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="clear">C</button>
        <button onClick={() => {
          setCurrentNumber(current => -current)
          setInputBuffer(current =>
            current.startsWith('-') ? current.slice(1) : '-' + current
          )
        }} className="operator-top">&plusmn;</button>
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