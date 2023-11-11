"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#09ea4c",
          },
          components: {
            // Button: {
            //   colorPrimary: "#09ea4c",
            //   algorithm: true,
            // },
            // Input: {
            //   colorPrimary: "#09ea4c",
            //   algorithm: true,
            // },
            // FloatButton: {
            //   colorPrimary: "#09ea4c",
            //   algorithm: true,
            // },
            // Pagination: {
            //   itemBg: "#09ea4c",
            // },
            Menu: {
              itemHoverBg: "#c1ffd2",
              itemActiveBg: "#09ea4c",
              itemSelectedBg: "#09ea4c",
              itemSelectedColor: "#FFF",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
