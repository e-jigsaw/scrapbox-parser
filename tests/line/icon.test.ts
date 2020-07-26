describe('icon', () => {
  it('Simple root icon', () => {
    expect('[/icons/+1.icon]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple relative icon', () => {
    expect('[me.icon]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Multiple icons', () => {
    expect('[me.icon*3]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Icon and internal link on same line', () => {
    expect('[Internal link][me.icon]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
