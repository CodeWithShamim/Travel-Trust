'use client'

import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'
import { ConfigProvider, theme } from 'antd'

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  // ✅ Create Ant Design cache
  const cache = React.useMemo<Entity>(() => createCache(), [])

  // ✅ Inject Ant Design CSS during SSR
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ))

  return (
    <StyleProvider cache={cache} hashPriority="high">
      <ConfigProvider
        theme={{
          hashed: false, // ✅ Important: disables hashed classNames (enables Tailwind to override)
          token: {
            colorPrimary: '#FFD20A',
            borderRadius: 6,
          },
          algorithm: theme.defaultAlgorithm,
          components: {
            Menu: {
              itemHoverBg: '#c1ffd2',
              itemActiveBg: '#FFD20A',
              itemSelectedBg: '#FFD20A',
              itemSelectedColor: '#fff',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  )
}

export default StyledComponentsRegistry
