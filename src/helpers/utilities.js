import { isEdge, isNode } from 'react-flow-renderer'

export const getElementById = (id, elements) =>
  elements.find((el) => `${el.id}` === `${id}`)

export const addValues = (a, b) => Number(a) + Number(b)

export const getNodes = (elements) =>
  elements.filter((element) => isNode(element))

export const getNodeById = (elements, id) =>
  getNodes(elements).find((node) => `${node.id}` === `${id}`)

export const getEdges = (elements) =>
  elements.filter((element) => isEdge(element))

export const getLastNode = (elements) => {
  const el = getNodes(elements)

  return el[el.length - 1]
}

/**
 *
 * @param {*} elements
 * @param {*} {sourceId, targetId}
 */
export const getEdge = (elements, { sourcedId, targetId }) =>
  getEdges(elements)
    .filter((e) => (sourcedId ? e.source === sourcedId : true))
    .filter((e) => (targetId ? e.target === targetId : true))
export const getEdgesBySource = (elements, node) =>
  getEdges(elements).filter((e) => e.source === node.id)

export const getEdgesByTarget = (elements, node) =>
  getEdges(elements).filter((e) => e.target === node.id)

export const getNodeIndexes = (elements) =>
  elements
    .map((e, index) => (isNode(e) ? { id: e.id, index } : undefined))
    .filter((e) => e !== undefined)

export const getLastEdge = (elements) => {
  const el = getEdges(elements)
  return el[el.length - 1]
}

export const findEdgesTo = (node, elements) =>
  elements
    .filter((element) => isEdge(element))
    .filter((edge) => edge.target === node.id)

export const edgeExists = (elements, newEdge) =>
  !!getEdges(elements).find(
    (el) => el.source === newEdge.source && el.target === newEdge.target,
  )

export const roundTo2 = (number) => Math.round(number * 100) / 100

const calcPropertyAvg = (nodes, property) => {
  const posFilter = (val) => val > 0
  const values = nodes
    .filter((node) => isNode(node))
    .filter((node) => posFilter(node.data[property]))
    .map((node) => node.data[property])

  return values.reduce((acc, pca) => acc + pca, 0) / values.length
}

export const convertToNumeric = (data) => {
  const outData = Object.keys(data).reduce(
    (map, key) => ({
      ...map,
      [key]:
        (typeof data[key] === 'string' && Number.isNaN(Number(data[key]))) ||
        data[key].length === 0
          ? data[key]
          : Number(data[key]),
    }),
    {},
  )

  return outData
}

const calcPropertySum = (nodes, property) =>
  nodes
    .map((node) => Number(node.data[property]))
    .reduce((acc, val) => acc + val, 0)

const totalPeopleTime = (nodes) =>
  nodes
    .map((node) => convertToNumeric(node.data))
    .reduce((acc, val) => acc + val.people * val.processTime, 0)

export const calcFlowEfficiency = (processTime, totalTime) => {
  if (
    totalTime === 0 ||
    Number.isNaN(totalTime) ||
    processTime === 0 ||
    Number.isNaN(processTime)
  ) {
    return 0
  }

  return roundTo2((processTime / totalTime) * 100)
}

export const getNodeSums = (elements) => {
  const nodes = getNodes(elements).map((el) => ({
    ...el,
    data: convertToNumeric(el.data),
  }))

  const totals = {
    peopleTime: totalPeopleTime(nodes),
    averageActors:
      nodes.reduce((acc, node) => acc + node.data.people, 0) / nodes.length,
    processTime: calcPropertySum(nodes, 'processTime'),
    waitTime: calcPropertySum(nodes, 'waitTime'),
    avgPCA: roundTo2(calcPropertyAvg(nodes, 'pctCompleteAccurate')),
  }
  totals.totalTime = totals.waitTime + totals.processTime
  totals.flowEfficiency = calcFlowEfficiency(
    totals.processTime,
    totals.totalTime,
  )

  return totals
}

export const toJson = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

export const removeElements = (elementsToRemove, elements) => {
  const nodeIdsToRemove = elementsToRemove.map((n) => n.id)

  return elements.filter((element) => {
    const edgeElement = element
    return !(
      nodeIdsToRemove.includes(element.id) ||
      nodeIdsToRemove.includes(edgeElement.target) ||
      nodeIdsToRemove.includes(edgeElement.source)
    )
  })
}

export const spliceArray = (array, index, element) => {
  const newArray = array.map((a) => a)
  newArray.splice(index, 0, element)
  return newArray
}
