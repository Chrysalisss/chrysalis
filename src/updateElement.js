/**
 * Comparison algorithm DOM and Virtual DOM
 * Lead time ~O(n^3)
 */

import { createVnode, ROOT_ELEMENT } from './render'
import updateAttrs from './updateAttributes'

function updateElement(newNode, oldNode, element, index, isSVG) {
  const parentNode = element || ROOT_ELEMENT

  if (!oldNode) {
    parentNode.appendChild(createVnode(newNode, isSVG));
  } 
  
  if (!newNode) {
    parentNode.removeChild(parentNode.childNodes[index || 0])
  } else if (
    typeof newNode !== typeof oldNode ||
    newNode.nodeName !== oldNode.nodeName ||
    (typeof oldNode !== 'object' && oldNode !== newNode)
  ) {
    parentNode.replaceChild(createVnode(newNode, isSVG), parentNode.childNodes[index || 0]);
  } else if (newNode.nodeName) {
    updateAttrs(parentNode.childNodes[index || 0], newNode.props, oldNode.props);

    const length = Math.max(newNode.children.length, oldNode.children.length)

    for (let i = -1; ++i < length; ) {
      updateElement(
        newNode.children[i],
        oldNode.children[i],
        parentNode.childNodes[index || 0],
        i,
        (isSVG = isSVG || newNode.nodeName == 'svg')
      )
    }
  }
}

export default updateElement
