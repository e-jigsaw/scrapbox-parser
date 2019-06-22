/* global describe it expect */

import { LineComponentType, convertToLineComponents } from '../src/line'
import parseToLines from '../src/line/parseToLines'

describe('bullet', () => {
  it('Single-byte space indent', () => {
    const input = ' Single-byte space'
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 1,
        nodes: [
          {
            type: 'plain',
            text: 'Single-byte space'
          }
        ]
      }
    ])
  })

  it('Double-byte space indent', () => {
    const input = '　Double-byte space'
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 1,
        nodes: [
          {
            type: 'plain',
            text: 'Double-byte space'
          }
        ]
      }
    ])
  })

  it('Tab indent', () => {
    // eslint-disable-next-line no-tabs
    const input = '	Tab'
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 1,
        nodes: [
          {
            type: 'plain',
            text: 'Tab'
          }
        ]
      }
    ])
  })

  it('Multi lines bullet', () => {
    const input = `
no bullet (indent: 0)
 first bullet (indent: 1)
  second bullet (indent: 2)
   third bullet (indent: 3)
`
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input.trim())
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'plain',
            text: 'no bullet (indent: 0)'
          }
        ]
      },
      {
        indent: 1,
        nodes: [
          {
            type: 'plain',
            text: 'first bullet (indent: 1)'
          }
        ]
      },
      {
        indent: 2,
        nodes: [
          {
            type: 'plain',
            text: 'second bullet (indent: 2)'
          }
        ]
      },
      {
        indent: 3,
        nodes: [
          {
            type: 'plain',
            text: 'third bullet (indent: 3)'
          }
        ]
      }
    ])
  })
})
