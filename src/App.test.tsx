import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Calculator App', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('数値ボタンをクリックすると表示が更新される', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: '1' })
    fireEvent.click(button)
    expect(screen.getByTestId('current-value')).toHaveTextContent('1')
  })

  it('基本的な足し算が正しく計算される', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '3' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))
    expect(screen.getByTestId('current-value')).toHaveTextContent('5')
  })

  it('クリアボタンで表示がリセットされる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: 'C' }))
    expect(screen.getByTestId('current-value')).toHaveTextContent('0')
  })

  it('テーマを切り替えることができる', () => {
    render(<App />)
    const themeButton = screen.getByText('🌙')
    fireEvent.click(themeButton)
    expect(document.body.getAttribute('data-theme')).toBe('dark')
    fireEvent.click(themeButton)
    expect(document.body.getAttribute('data-theme')).toBe('light')
  })

  it('連続した計算が正しく実行される', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '3' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '4' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))
    expect(screen.getByTestId('current-value')).toHaveTextContent('9')
  })

  it('小数点を含む計算が正しく実行される', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    fireEvent.click(screen.getByRole('button', { name: '5' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    fireEvent.click(screen.getByRole('button', { name: '5' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))
    expect(screen.getByTestId('current-value')).toHaveTextContent('4')
  })

  it('小数点は1つの数値に1回しか入力できない', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    fireEvent.click(screen.getByRole('button', { name: '5' }))
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    expect(screen.getByTestId('current-value')).toHaveTextContent('1.5')
  })

  it('0から始まる場合は小数点入力で0.となる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    expect(screen.getByTestId('current-value')).toHaveTextContent('0.')
  })

  describe('イースターエッグ', () => {
    it('1337を入力するとL33T!と表示される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      fireEvent.click(screen.getByRole('button', { name: '7' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('L33T!')
    })

    it('42を入力すると生命、宇宙、そして万物についての究極の疑問の答えと表示される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '4' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('生命、宇宙、そして万物についての究極の疑問の答え')
    })

    it('777を入力すると大当たり!🎰と表示される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '7' }))
      fireEvent.click(screen.getByRole('button', { name: '7' }))
      fireEvent.click(screen.getByRole('button', { name: '7' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('大当たり!🎰')
    })

    it('3.14を入力するとπと表示される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '4' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('π')
    })
  })

  describe('小数点以下の0の表示', () => {
    it('小数点以下に0が連続する数値が正しく表示される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('0.0')
      
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('0.00')
      
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('0.000')
      
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('0.0003')
    })

    it('計算結果の末尾の0は表示されない', () => {
      render(<App />)
      // 6 * 0.4 = 2.4 のテスト
      fireEvent.click(screen.getByRole('button', { name: '6' }))
      fireEvent.click(screen.getByRole('button', { name: '×' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '4' }))
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('2.4')
    })

    it('入力中の小数点以下の0は表示される', () => {
      render(<App />)
      // 0.40 を入力するテスト
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '4' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('0.40')
    })

    it('小数点以下に0が連続する数値の計算が正しく実行される', () => {
      render(<App />)
      // 0.00003を入力
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      
      // もう一度0.00003を入力
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('0.00006')
    })
  })

  describe('複雑な計算パターン', () => {
    it('連続した加算が正しく実行される(= なしでも計算される)', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('3')
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('6')
    })

    it('乗算と加算の組み合わせが正しく実行される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '×' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      fireEvent.click(screen.getByRole('button', { name: '4' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('4')
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('10')
    })

    it('負の数を含む複雑な計算が正しく実行される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '5' }))
      fireEvent.click(screen.getByRole('button', { name: '±' }))
      fireEvent.click(screen.getByRole('button', { name: '×' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      fireEvent.click(screen.getByRole('button', { name: '7' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('7')
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('-3')
    })

    it('小数点を含む複雑な計算が正しく実行される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '5' }))
      fireEvent.click(screen.getByRole('button', { name: '×' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '.' }))
      fireEvent.click(screen.getByRole('button', { name: '5' }))
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('3')
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('6.75')
    })

    it('除算を含む複雑な計算が正しく実行される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '0' }))
      fireEvent.click(screen.getByRole('button', { name: '÷' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '×' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('3')
      fireEvent.click(screen.getByRole('button', { name: '=' }))
      expect(screen.getByTestId('current-value')).toHaveTextContent('15')
    })
  })

  describe('状態の永続化', () => {
    it('入力値がlocalStorageに保存される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '3' }))

      expect(JSON.parse(localStorage.getItem('calc_current') || '')).toBe('123')
      expect(JSON.parse(localStorage.getItem('calc_display') || '')).toBe('123')
    })

    it('計算式がlocalStorageに保存される', () => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      fireEvent.click(screen.getByRole('button', { name: '+' }))

      expect(JSON.parse(localStorage.getItem('calc_equation') || '')).toBe('2 +')
    })

    it('ページをリロードしても状態が復元される', () => {
      localStorage.setItem('calc_current', JSON.stringify('42'))
      localStorage.setItem('calc_display', JSON.stringify('生命、宇宙、そして万物についての究極の疑問の答え'))
      localStorage.setItem('calc_equation', JSON.stringify('40 +'))
      
      render(<App />)
      
      expect(screen.getByTestId('current-value')).toHaveTextContent('生命、宇宙、そして万物についての究極の疑問の答え')
      expect(screen.getByText('40 +')).toBeInTheDocument()
    })
  })
})