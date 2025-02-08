interface EasterEgg {
  value: string
  display: string
}

const EASTER_EGGS: EasterEgg[] = [
  { value: '1337', display: 'L33T!' },
  { value: '42', display: '生命、宇宙、そして万物についての究極の疑問の答え' },
  { value: '777', display: '大当たり!🎰' },
  { value: '3.14', display: 'π' },
  { value: '3.141592653589793', display: 'π' },
  { value: '2.718', display: 'e' },
  { value: '2.718281828459045', display: 'e' },
  { value: '1.414', display: '√2' },
  { value: '1.4142135623730951', display: '√2' }
]

export const getEasterEgg = (number: string): string => {
  const numericValue = parseFloat(number)
  
  // 定数値との完全一致チェック
  const exactMatch = EASTER_EGGS.find(egg => egg.value === number)
  if (exactMatch) {
    return exactMatch.display
  }

  // 数値としての一致チェック
  if (numericValue === Math.PI) return 'π'
  if (numericValue === Math.E) return 'e'
  if (numericValue === Math.SQRT2) return '√2'

  return number
}

export const getNumericValue = (display: string): string => {
  // イースターエッグの表示から数値への変換
  const easterEgg = EASTER_EGGS.find(egg => egg.display === display)
  if (easterEgg) {
    return easterEgg.value
  }

  // 数学定数の変換
  switch (display) {
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