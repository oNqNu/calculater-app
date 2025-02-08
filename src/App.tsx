import { useSystemTheme } from './hooks/useSystemTheme'
import { useLocalStorage } from './hooks/useLocalStorage'
import { calculate, formatNumber } from './utils/calculator'
import { getEasterEgg, getNumericValue } from './utils/easterEggs'
import './App.css'

type Theme = 'light' | 'dark'

function App() {
  const [currentNumber, setCurrentNumber] = useLocalStorage<string>('calc_current', '0')
  const [displayNumber, setDisplayNumber] = useLocalStorage<string>('calc_display', '0')
  const [equation, setEquation] = useLocalStorage<string>('calc_equation', '')
  const [shouldResetCurrent, setShouldResetCurrent] = useLocalStorage<boolean>('calc_should_reset', false)
  const [theme, setTheme] = useSystemTheme()

  const handleNumber = (number: string) => {
    if (shouldResetCurrent) {
      setCurrentNumber(number)
      setDisplayNumber(number)
      setShouldResetCurrent(false)
      return
    }

    if (number === '.' && currentNumber.includes('.')) {
      return
    }

    if (number === '.' && currentNumber === '0') {
      setCurrentNumber('0.')
      setDisplayNumber('0.')
      return
    }

    const newNumber = currentNumber === '0' && number !== '.' ? number : currentNumber + number
    setCurrentNumber(newNumber)
    const easterEgg = getEasterEgg(newNumber)
    setDisplayNumber(easterEgg)
  }

  const performCalculation = (num1: string, operator: string, num2: string) => {
    const result = calculate(
      parseFloat(num1),
      parseFloat(num2),
      operator as '+' | '-' | '×' | '÷'
    )
    const resultStr = formatNumber(result.value.toString(), result.maxDecimalPlaces)
    return resultStr
  }

  const handleOperator = (operator: string) => {
    const currentValue = getNumericValue(displayNumber)
    if (equation) {
      const [prevNum, prevOperator] = equation.split(' ')
      const resultStr = performCalculation(prevNum, prevOperator, currentValue)
      setCurrentNumber(resultStr)
      setDisplayNumber(resultStr)
      setEquation(resultStr + ' ' + operator)
    } else {
      setEquation(currentValue + ' ' + operator)
    }
    setShouldResetCurrent(true)
  }

  const handleEqual = () => {
    if (equation) {
      const [num1, operator] = equation.split(' ')
      const num2 = getNumericValue(displayNumber)
      const resultStr = performCalculation(num1, operator, num2)
      setCurrentNumber(resultStr)
      setDisplayNumber(resultStr)
      setEquation('')
      setShouldResetCurrent(true)
    }
  }

  const handleToggleSign = () => {
    const numericValue = parseFloat(currentNumber)
    const newNumber = (-numericValue).toString()
    setCurrentNumber(newNumber)
    setDisplayNumber(getEasterEgg(newNumber))
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
    <>
      <div className="geometric-grid" />
      <div className="geometric-lines" />
      <div className="diagonal-grid" />
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
          <button onClick={handleToggleSign}>±</button>
          <button className="operator" onClick={() => handleOperator('÷')}>÷</button>
          
          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button className="operator" onClick={() => handleOperator('×')}>×</button>
          
          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button className="operator" onClick={() => handleOperator('-')}>-</button>
          
          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button className="operator" onClick={() => handleOperator('+')}>+</button>
          
          <button className="zero" onClick={() => handleNumber('0')}>0</button>
          <button onClick={() => handleNumber('.')}>.</button>
          <button className="equal" onClick={handleEqual}>=</button>
        </div>
      </div>
    </>
  )
}

export default App