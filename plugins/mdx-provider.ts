import path from 'path'
import glob from 'fast-glob'

export default (): any => {
  let components: string[] = []
  return {
    name: 'mdInjectComponentsPlugin',
    enforce: 'post',
    options: async () => {
      components = await glob('src/components/MDX/*.astro', { absolute: true })
    },
    transform: (code: string, id: string) => {
      if (!id.match(/\.mdx$/)) {
        return false
      }
      let prepend = ''
      const names = []
      for (const component of components) {
        const name = path.basename(component, path.extname(component))
        prepend += 'import ' + name + " from '" + component.replace('./', '/') + "';\n"
        names.push(name)
      }
      code =
        prepend +
        code.replace(
          'export default MDXContent;',
          `export default function (props) {
          let newComponents = {
            ${names.join(',\n')}
          };
          props.components = {
            ...newComponents,
            ...props.components
          };
          return MDXContent(props);
        };`
        )
      return code
    },
  }
}
