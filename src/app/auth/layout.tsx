'use client'
import { ReduxProviders } from '@/context/ReduxProvider'
import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <ReduxProviders>
        {children}
    </ReduxProviders>
  )
}

export default layout