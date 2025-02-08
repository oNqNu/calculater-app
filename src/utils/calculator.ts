type Operator = '+' | '-' | '×' | '÷'

interface CalculationResult {
  value: number
  maxDecimalPlaces: number
}

export const getMaxDecimalPlaces = (nums: string[]): number => {
  const maxPlaces = Math.max(...nums.map(num => {
    const parts = num.toString().split('.')
    if (parts.length < 2) return 0
    
    const fractionalPart = parts[1]
    let length = fractionalPart.length
    
    while (length > 0 && fractionalPart[length - 1] === '0') {
      length++
    }
    
    return length
  }))
  
  return Math.max(maxPlaces, 2)
}

export const calculate = (num1: number, num2: number, operator: Operator): CalculationResult => {
  const nums = [num1.toString(), num2.toString()]
  const maxDecimalPlaces = getMaxDecimalPlaces(nums)
  const precision = Math.pow(10, maxDecimalPlaces)

  let result: number
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

  return {
    value: result,
    maxDecimalPlaces
  }
}

export const formatNumber = (num: string, maxDecimalPlaces?: number): string => {
  if (!num || isNaN(parseFloat(num))) {
    return '0'
  }

  const number = parseFloat(num)
  
  if (Number.isInteger(number)) {
    return number.toString()
  }

  const numberStr = number.toString()
  const [integerPart, fractionalPart] = numberStr.split('.')
  
  if (!fractionalPart) {
    return integerPart
  }

  const targetDecimalPlaces = maxDecimalPlaces !== undefined ?
    maxDecimalPlaces :
    fractionalPart.length

  let roundedDecimal = fractionalPart.padEnd(targetDecimalPlaces, '0').slice(0, targetDecimalPlaces)
  
  if (maxDecimalPlaces !== undefined) {
    roundedDecimal = roundedDecimal.replace(/0+$/, '')
    if (!roundedDecimal) {
      return integerPart
    }
  }
  
  return `${integerPart}.${roundedDecimal}`
}