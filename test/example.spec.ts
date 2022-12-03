import { Component } from 'decentraland-ecs'

describe('Example spec', () => {
  (globalThis as any).Component = Component

  it('Should return constant', () => {
    expect("x").toBe('x')
  })
})