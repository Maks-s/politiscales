export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
      strong_agree: 'emerald',
      agree: 'lime',
      unsure: 'gray',
      disagree: 'orange',
      strong_disagree: 'red'
    },
    icons: {
      // @ts-expect-error
      light: 'i-line-md-sunny-loop',
      dark: 'i-line-md-moon-loop'
    }
  }
})
