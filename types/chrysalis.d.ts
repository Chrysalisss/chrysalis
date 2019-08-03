import "./jsx";

/**
 * definitelytyped.org
 */

export as namespace chrysalis

export type Children = VNode | string | number | null

export type Key = string | number | any;

export type RefObject<T> = { current?: T | null }

export interface VNode<Props = {}> {
  type: string;
  props?: JSX.HTMLAttributes & JSX.SVGAttributes & Attributes | null;
  children: Array<VNode>;
  key: Key | null;
}

export interface Attributes {
  key?: Key;
  jsx?: boolean;
  ref?: RefObject<T>;
}

export function h<Props>(
  type: string,
  props?: JSX.HTMLAttributes & JSX.SVGAttributes & Attributes | null,
  ...children: Array<Children | Children[]>
): VNode<Props>

export function render(
  node: VNode, 
  container: Element | Document | ShadowRoot | DocumentFragment,
  callback?: () => void
): void

export function createRef<T = any>(): RefObject<T>