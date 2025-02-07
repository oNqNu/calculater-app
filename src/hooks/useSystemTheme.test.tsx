import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSystemTheme } from './useSystemTheme'

describe('useSystemTheme', () => {
  let matchMedia: typeof window.matchMedia

  beforeEach(() => {
    // 元のmatchMediaを保存
    matchMedia = window.matchMedia

    // matchMediaのモックを作成
    let darkMode = false
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: darkMode,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_type, handler) => {
        // テスト用にhandlerを保存
        (window.matchMedia as any).__handler = handler
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // テスト用にシステムテーマを切り替える関数を追加
    ;(window.matchMedia as any).__setDarkMode = (isDark: boolean) => {
      darkMode = isDark
      if ((window.matchMedia as any).__handler) {
        ;(window.matchMedia as any).__handler({ matches: isDark })
      }
    }
  })

  afterEach(() => {
    // テスト後に元のmatchMediaを復元
    window.matchMedia = matchMedia
  })

  it('初期値はシステムの設定に基づく', () => {
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current[0]).toBe('light')
  })

  it('システムのテーマ変更を検知する', () => {
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current[0]).toBe('light')

    // システムのテーマをダークモードに変更
    act(() => {
      ;(window.matchMedia as any).__setDarkMode(true)
    })
    expect(result.current[0]).toBe('dark')

    // システムのテーマをライトモードに変更
    act(() => {
      ;(window.matchMedia as any).__setDarkMode(false)
    })
    expect(result.current[0]).toBe('light')
  })

  it('手動でテーマを切り替えられる', () => {
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current[0]).toBe('light')

    // 手動でダークモードに切り替え
    act(() => {
      result.current[1]('dark')
    })
    expect(result.current[0]).toBe('dark')

    // 手動でライトモードに切り替え
    act(() => {
      result.current[1]('light')
    })
    expect(result.current[0]).toBe('light')
  })

  it('document.bodyのdata-theme属性が更新される', () => {
    const { result } = renderHook(() => useSystemTheme())
    expect(document.body.getAttribute('data-theme')).toBe('light')

    // テーマを切り替え
    act(() => {
      result.current[1]('dark')
    })
    expect(document.body.getAttribute('data-theme')).toBe('dark')
  })

  it('古いブラウザAPIをサポートする', () => {
    // addEventListenerをサポートしないブラウザをシミュレート
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: undefined,
      removeEventListener: undefined,
      dispatchEvent: vi.fn(),
    }))

    const { result } = renderHook(() => useSystemTheme())
    expect(result.current[0]).toBe('light')
  })
})