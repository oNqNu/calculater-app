import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'
import { beforeEach } from 'vitest'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('初期値が正しく設定される', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('localStorage から既存の値を読み込む', () => {
    localStorage.setItem('testKey', JSON.stringify('stored value'))
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))
    expect(result.current[0]).toBe('stored value')
  })

  it('値を更新すると localStorage も更新される', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))
    
    act(() => {
      result.current[1]('new value')
    })

    expect(result.current[0]).toBe('new value')
    expect(JSON.parse(localStorage.getItem('testKey') || '')).toBe('new value')
  })

  it('関数を使用して値を更新できる', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 0))
    
    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(1)
    expect(JSON.parse(localStorage.getItem('testKey') || '')).toBe(1)
  })

  it('JSON.parse できない値がある場合は初期値を使用する', () => {
    localStorage.setItem('testKey', 'invalid json')
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))
    expect(result.current[0]).toBe('initial')
  })
})