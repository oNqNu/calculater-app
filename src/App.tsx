import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentNumber, setCurrentNumber] = useState<string>('0')
  const [displayNumber, setDisplayNumber] = useState<string>('0')
  const [equation, setEquation] = useState<string>('')
  const [shouldResetCurrent, setShouldResetCurrent] = useState<boolean>(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const formatNumber = (num: string): string => {
    const number = parseFloat(num)
    if (Number.isInteger(number)) {
      return number.toString()
    }
    
    // 小数点以下の桁数を取得
    const decimalPlaces = (num.split('.')[1] || '').length
    
    // 結果が整数に近い場合(誤差が非常に小さい場合)は整数として扱う
    if (Math.abs(Math.round(number) - number) < Number.EPSILON) {
      return Math.round(number).toString()
    }
    
    // 小数点以下の桁数に基づいて丸める
    // ただし、明らかな計算誤差(.99999...や.00000...)を補正
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
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="calculator">
      <button className="theme-toggle" onClick={toggleTheme}>
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