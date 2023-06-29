function rgba(variableName) {
  return `rgb(var(${variableName}))`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    // Uncomment the following extend
    // if existing Tailwind color palette will be used

    // extend: {
    textColor: {
      skin: {
        base: rgba("--color-text-base"),
        primary: rgba("--color-text-primary"),  // 新增，对应主标题
        secondary: rgba("--color-text-secondary"),  // 新增，对应副标题
        body: rgba("--color-text-body"),  // 新增，对应正文
        muted: rgba("--color-text-muted"),  // 新增，对应辅助文字
        accent: rgba("--color-accent"),
        inverted: rgba("--color-fill"),
      },
    },
    backgroundColor: {
      skin: {
        fill: rgba("--color-fill"),
        accent: rgba("--color-accent"),
        inverted: rgba("--color-text-base"),
        card: rgba("--color-card"),
        "card-muted": rgba("--color-card-muted"),
        "card-hover": rgba("--color-card-hover"),
      },
    },
    outlineColor: {
      skin: {
        fill: rgba("--color-accent"),
      },
    },
    borderColor: {
      skin: {
        line: rgba("--color-border"),
        fill: rgba("--color-text-base"),
        accent: rgba("--color-accent"),
      },
    },
    fill: {
      skin: {
        base: rgba("--color-text-base"),
        accent: rgba("--color-accent"),
      },
      transparent: "transparent",
    },
    fontFamily: {
      round: ['Raleway', 'sans-serif']
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
