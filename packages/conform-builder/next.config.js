/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  if ("sassOptions" in defaultConfig) {
    defaultConfig["sassOptions"] = {
      includePaths: ["./components", "./layouts"],
      prependData: `@use "@/styles/imports.scss" as *;`,
    };
  }

  return {
    ...defaultConfig,
    experimental: {
      appDir: true,
    },
  };
};

module.exports = nextConfig;
