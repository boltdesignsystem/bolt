/* eslint-disable no-cond-assign */
function buildSlotMap(vnode, map) {
  let child
  if (vnode.children) {
    for (let i = 0; i < vnode.children.length; i++) {
      child = vnode.children[i]
      if (child.sel === 'slot') {
        map[getSlotName(child)] = {
          node: child,
          parent: vnode,
          index: i
        }
      }
      if (!child.data.slotRoot) buildSlotMap(child, map)
    }
  }
}

function getSlotName(vnode) {
  return (vnode.data.props && vnode.data.props.name) || ''
}

function redistributeNodes(children, map) {
  const withoutSlot = []
  const dupes = {}
  let slotData
  children.forEach((child) => {
    const slot = child.data.props && child.data.props.slot
    if (slot) {
      if (slotData = map[slot]) {
        if (!dupes[slot]) {
          slotData.node.children = [child]
          slotData.node.text = undefined
          dupes[slot] = true
        } else {
          slotData.node.children.push(child)
        }
      }
    } else {
      withoutSlot.push(child)
    }
  })
  if ((slotData = map['']) && withoutSlot.length) {
    slotData.node.children = withoutSlot
    slotData.node.text = undefined
  }
}

export const withSlot = (renderFn) => {
  return function (props, children) {
    const containerTree = renderFn(props, children)
    const slotMap = Object.create(null)
    containerTree.data.slotRoot = true
    if (containerTree.sel === 'slot') {
      slotMap[getSlotName(containerTree)] = {
        node: containerTree,
      }
    }
    if (!Array.isArray(children)) children = [children]
    buildSlotMap(containerTree, slotMap)
    redistributeNodes(children, slotMap)
    return containerTree
  }
}