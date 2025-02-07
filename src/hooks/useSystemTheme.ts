import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Theme = 'light' | 'dark'

export const useSystemTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {
  // システムのカラーモード設定を取得する関数
  const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState<Theme>(getSystemTheme)

  useEffect(() => {
    // システムのカラーモード変更を監視
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    // 新しいAPI (addEventListener) をサポートしているブラウザ向け
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    
    // 古いAPI (addListener) のフォールバック
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  // テーマの変更をdocument.bodyに反映
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return [theme, setTheme]
}