import { useState } from 'react'
import { useSystemTheme } from './hooks/useSystemTheme'
import './App.css'

type Theme = 'light' | 'dark'

function App() {
  const [currentNumber, setCurrentNumber] = useState<string>('0')
  const [displayNumber, setDisplayNumber] = useState<string>('0')
  const [equation, setEquation] = useState<string>('')
  const [shouldResetCurrent, setShouldResetCurrent] = useState<boolean>(false)
  const [theme, setTheme] = useSystemTheme()

  const formatNumber = (num: string): string => {
    const number = parseFloat(num)
    if (Number.isInteger(number)) {
      return number.toString()
    }
    
    const decimalPlaces = (num.split('.')[1] || '').length
    
    if (Math.abs(Math.round(number) - number) < Number.EPSILON) {
      return Math.round(number).toString()
    }
    
    const rounded = parseFloat(number.toFixed(Math.min(decimalPlaces, 10)))
    return rounded.toString()
  }

  const getEasterEgg = (number: string): string => {
    const numericValue = parseFloat(number)
    switch (number) {
      case '1337':
        return 'L33T!'
      case '42':
        return '生命、宇宙、そして万物についての究極の疑問の答え'
      case '777':
        return '大当たり!🎰'
      case '3.14':
      case '3.141592653589793':
        return 'π'
      case '2.718':
      case '2.718281828459045':
        return 'e'
      case '1.414':
      case '1.4142135623730951':
        return '√2'
      default:
        if (numericValue === Math.PI) return 'π'
        if (numericValue === Math.E) return 'e'
        if (numericValue === Math.SQRT2) return '√2'
        return formatNumber(number)
    }
  }

  const getNumericValue = (display: string): string => {
    switch (display) {
      case 'L33T!':
        return '1337'
      case '生命、宇宙、そして万物についての究極の疑問の答え':
        return '42'
      case '大当たり!🎰':
        return '777'
      case 'π':
        return Math.PI.toString()
      case 'e':
        return Math.E.toString()
      case '√2':
        return Math.SQRT2.toString()
      default:
        return display
    }
  }

  const handleNumber = (number: string) => {
    if (shouldResetCurrent) {
      setCurrentNumber(number)
      setDisplayNumber(number)
      setShouldResetCurrent(false)
    } else {
      if (number === '.' && currentNumber.includes('.')) {
        return
      }
      if (number === '.' && currentNumber === '0') {
        setCurrentNumber('0.')
        setDisplayNumber('0.')
      } else {
        const newNumber = currentNumber === '0' && number !== '.' ? number : currentNumber + number
        setCurrentNumber(newNumber)
        setDisplayNumber(getEasterEgg(newNumber))
      }
    }
  }

  const handleOperator = (operator: string) => {
    if (equation && !shouldResetCurrent) {
      calculate()
    } else {
      setEquation(getNumericValue(displayNumber) + ' ' + operator)
      setShouldResetCurrent(true)
    }
  }

  const calculate = () => {
    const parts = equation.split(' ')
    const num1 = parseFloat(parts[0])
    const operator = parts[1]
    const num2 = parseFloat(getNumericValue(displayNumber))
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

    const resultStr = result.toString()
    setCurrentNumber(resultStr)
    setDisplayNumber(getEasterEgg(resultStr))
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
    setDisplayNumber('0')
    setEquation('')
    setShouldResetCurrent(false)
  }

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="calculator">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        title={`現在の設定: ${theme === 'light' ? 'ライト' : 'ダーク'}モード (システム設定に追従)`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="display">
        <div className="equation">{equation}</div>
        <div className="current" data-testid="current-value">{displayNumber}</div>
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