import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Calculator App', () => {
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
})