/* global describe it expect */

describe('Code Block', () => {
  it('Simple code block', () => {
    expect(`code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`).toMatchSnapshotWhenParsing()
  })

  it('Bulleted code block', () => {
    expect(` code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }`).toMatchSnapshotWhenParsing()
  })

  it('Code block with bullet', () => {
    expect(` Bullet
 code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }
 Bullet`).toMatchSnapshotWhenParsing()
  })

  it('Consecutive code blocks', () => {
    expect(`code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }
code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`).toMatchSnapshotWhenParsing()
  })
})
