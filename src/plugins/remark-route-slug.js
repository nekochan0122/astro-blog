export default function () {
  return (_, { data, history }) => {
    data.astro.frontmatter.slug = history[0].match(/([^\/]+)(?=\.\w+$)/)[0]
  }
}
