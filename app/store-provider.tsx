'use client'
import { AppStore, makeStore } from '@/lib/redux'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children,
  preloadedState
}: {
  children: React.ReactNode
  preloadedState?: any
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}