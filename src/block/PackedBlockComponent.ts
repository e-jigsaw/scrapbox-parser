import type { ParserOption } from '../parse'
import type { BlockComponent } from './BlockComponent'
import type { TitleComponent } from './Title'
import type { CodeBlockComponent } from './CodeBlock'
import type { TableComponent } from './Table'
import type { LineComponent } from './Line'

export type PackedBlockComponent =
  | TitleComponent
  | CodeBlockComponent
  | TableComponent
  | LineComponent

const pack = (
  packing: PackedBlockComponent[],
  component: BlockComponent
): PackedBlockComponent[] => {
  if (packing.length > 0) {
    const lastBlock = packing[packing.length - 1]

    if (
      (lastBlock.type === 'codeBlock' || lastBlock.type === 'table') &&
      component.indent > lastBlock.components[0].indent
    ) {
      lastBlock.components.push(component)
      return packing
    }
  }

  const isCodeBlock = /^\s*code:(.+)$/.test(component.text)
  const isTable = /^\s*table:(.+)$/.test(component.text)

  packing.push(
    isCodeBlock || isTable
      ? {
          type: isCodeBlock ? 'codeBlock' : 'table',
          components: [component]
        }
      : {
          type: 'line',
          component
        }
  )

  return packing
}

export const packBlockComponents = (
  blockComponents: BlockComponent[],
  opts: ParserOption
): PackedBlockComponent[] => {
  if (opts.hasTitle ?? true) {
    const [title, ...body] = blockComponents
    return [
      {
        type: 'title',
        text: title.text
      },
      ...packBlockComponents(body, { hasTitle: false })
    ]
  }

  return blockComponents.reduce<PackedBlockComponent[]>(pack, [])
}
