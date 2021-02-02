// returns all nodes visited in order
export function dijkstra(grid, startNode, finishNode) {
    startNode.distance = 0 
    const unvisitedNodes = getNodesArray(grid)
    const visitedNodes = []
    while(unvisitedNodes.length !== 0) {
        sortByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        closestNode.isVisited = true
        visitedNodes.push(closestNode)
        if (closestNode === finishNode) {
            return visitedNodes
        }
        updateNeighbors(closestNode, grid)
    }
}

function updateNeighbors(node, grid) {
    const univisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of univisitedNeighbors) {
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighs = []
    const {col, row} = node
    if (row > 0) neighs.push(grid[row - 1][col])
    if (row < grid.length - 1) neighs.push(grid[row + 1][col])
    if (col > 0) neighs.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighs.push(grid[row][col + 1])
    return neighs.filter(neighbor => !neighbor.isVisited)
}

function sortByDistance(unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance)
}

function getNodesArray(grid) {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes
}

// returns the shortest path from startNode to finishNode
export function getNodesInShortestPathOrder(finishNode) {
    const shortestPath = []
    let currentNode = finishNode
    while(currentNode !== null) {
        shortestPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return shortestPath
}