import { useSystemTheme } from './hooks/useSystemTheme'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

type Theme = 'light' | 'dark'

function App() {
  const [currentNumber, setCurrentNumber] = useLocalStorage<string>('calc_current', '0')
  const [displayNumber, setDisplayNumber] = useLocalStorage<string>('calc_display', '0')
  const [equation, setEquation] = useLocalStorage<string>('calc_equation', '')
  const [shouldResetCurrent, setShouldResetCurrent] = useLocalStorage<boolean>('calc_should_reset', false)
  const [theme, setTheme] = useSystemTheme()

  const getMaxDecimalPlaces = (nums: string[]): number => {
    // 各数値の小数点以下の桁数を取得し、その最大値を返す
    const maxPlaces = Math.max(...nums.map(num => {
      const parts = num.toString().split('.')
      if (parts.length < 2) return 0
      
      // 末尾の0も含めて桁数をカウント
      const fractionalPart = parts[1]
      let length = fractionalPart.length
      
      // 末尾の0を含む実際の精度を計算
      while (length > 0 && fractionalPart[length - 1] === '0') {
        length++
      }
      
      return length
    }))
    
    // 最小でも2桁は保持する(1.5 × 2.5 = 3.75のような計算のため)
    return Math.max(maxPlaces, 2)
  }

  const formatNumber = (num: string, maxDecimalPlaces?: number): string => {
    // 入力が空文字列や無効な数値の場合は'0'を返す
    if (!num || isNaN(parseFloat(num))) {
      return '0'
    }

    const number = parseFloat(num)
    
    // 整数の場合はそのまま文字列として返す
    if (Number.isInteger(number)) {
      return number.toString()
    }

    // 文字列として処理して精度を保持
    const numberStr = number.toString()
    const [integerPart, fractionalPart] = numberStr.split('.')
    
    if (!fractionalPart) {
      return integerPart
    }

    // 小数点以下の桁数を決定
    const targetDecimalPlaces = maxDecimalPlaces !== undefined ?
      maxDecimalPlaces :
      fractionalPart.length

    // 小数点以下の桁数を調整
    let roundedDecimal = fractionalPart.padEnd(targetDecimalPlaces, '0').slice(0, targetDecimalPlaces)
    
    // 計算結果の場合は末尾の0を除去
    if (maxDecimalPlaces !== undefined) {
      roundedDecimal = roundedDecimal.replace(/0+$/, '')
      // 小数点以下がすべて0の場合は整数として表示
      if (!roundedDecimal) {
        return integerPart
      }
    }
    
    return `${integerPart}.${roundedDecimal}`
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
        // イースターエッグ対象の数値かチェック
        const easterEgg = getEasterEgg(newNumber)
        // イースターエッグ対象の場合はイースターエッグを表示、それ以外は数値をそのまま表示
        setDisplayNumber(easterEgg !== formatNumber(newNumber) ? easterEgg : newNumber)
      }
    }
  }

  const handleOperator = (operator: string) => {
    const currentValue = getNumericValue(displayNumber)
    if (equation) {
      const parts = equation.split(' ')
      const num1 = parseFloat(parts[0])
      const prevOperator = parts[1]
      const num2 = parseFloat(currentValue)
      let result = 0

      // 計算に使用される数値の最大小数点以下桁数を取得
      const maxDecimalPlaces = getMaxDecimalPlaces([parts[0], currentValue])
      const precision = Math.pow(10, maxDecimalPlaces)

      switch (prevOperator) {
        case '+':
          result = Math.round((num1 + num2) * precision) / precision
          break
        case '-':
          result = Math.round((num1 - num2) * precision) / precision
          break
        case '×':
          result = Math.round((num1 * num2) * precision) / precision
          break
        case '÷':
          result = Math.round((num1 / num2) * precision) / precision
          break
      }

      // 計算結果を文字列に変換
      const resultStr = formatNumber(result.toString(), maxDecimalPlaces)
      setCurrentNumber(resultStr)
      setDisplayNumber(resultStr)
      setEquation(resultStr + ' ' + operator)
    } else {
      setEquation(currentValue + ' ' + operator)
    }
    setShouldResetCurrent(true)
  }

  const calculate = () => {
    const parts = equation.split(' ')
    const num1 = parseFloat(parts[0])
    const operator = parts[1]
    const num2 = parseFloat(getNumericValue(displayNumber))
    let result = 0

    // 計算に使用される数値の最大小数点以下桁数を取得
    const maxDecimalPlaces = getMaxDecimalPlaces([parts[0], getNumericValue(displayNumber)])
    const precision = Math.pow(10, maxDecimalPlaces)

    switch (operator) {
      case '+':
        result = Math.round((num1 + num2) * precision) / precision
        break
      case '-':
        result = Math.round((num1 - num2) * precision) / precision
        break
      case '×':
        result = Math.round((num1 * num2) * precision) / precision
        break
      case '÷':
        result = Math.round((num1 / num2) * precision) / precision
        break
    }

    // 計算結果を文字列に変換
    const resultStr = formatNumber(result.toString(), maxDecimalPlaces)
    setCurrentNumber(resultStr)
    setDisplayNumber(resultStr)
    setEquation('')
    setShouldResetCurrent(true)
  }

  const handleEqual = () => {
    if (equation) {
      calculate()
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