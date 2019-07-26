/**
 * definitelytyped.org
 */

export as namespace chrysalis

export type Children = VNode | string | number | null

export interface VNode<Props = {}> {
  type: string
  props?: Props
  children: Array<VNode>
  key: string
}

export function h<Props>(
  type: string,
  props?: Props | null,
  ...children: Array<Children | Children[]>
): VNode<Props>

export function render(
  node: VNode, 
  container: Element | Document | ShadowRoot | DocumentFragment,
  callback?: () => void
): void

declare global {
  namespace JSX {
    interface Element extends VNode<any> {}
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}