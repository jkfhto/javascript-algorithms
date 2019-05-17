import {
    QueueBasedArray
} from "../queue/queue";
class Graph{
    constructor(isDirected = false) {
        // 属性
        this.vertices = []; // 存储顶点
        this.edges = {}; // 使用邻接表存储边 
        this.isDirected = isDirected; //默认是无向图
        this.marked = {}; //记录顶点遍历
    }

    //添加顶点
    addVertex(v) {
        this.vertices.push(v)
        this.edges[v] = [];
    }

    //添加边
    addEdge(v, w) {
        if (this.vertices.includes(v) && this.vertices.includes(w)) { //判断顶点是否存在
            this.edges[v].push(w);
            if (!this.isDirected) { //无向图
                this.edges[w].push(v);
            }
        } 
    }

    //判断v, w两顶点之间是否有边
    hasEdge(v, w) {
        if (this.vertices.includes(v) && this.vertices.includes(w)) { //判断顶点是否存在
            let edge = this.edges[v]; //获取顶点对应的边
            for (let i = 0, j = edge.length; i < j; i++) {
                if (edge[i] === w){
                    return true;
                }
            }
            return false;
        }
        return false;

    }

    //打印图
    showGraph() {
        let resultStr = ""
        for (let i = 0; i < this.vertices.length; i++) {
            resultStr += this.vertices[i] + "->"
            let edge = this.edges[this.vertices[i]];
            for (let j = 0; j < edge.length; j++) {
                resultStr += edge[j] + " "
            }
            resultStr += "\n"
        }
        return resultStr
    }

    //获取所有的边
    getAllEdges() {
        return Object.values(this.edges);
    }

    //获取所有的顶点
    getAllVertices() {
        return Object.values(this.vertices);
    }

    //初始化顶点遍历状态false：未遍历，true：已遍历过
    initializeMarked() {
        for (let i = 0; i < this.vertices.length; i++) {
            this.marked[this.vertices[i]] = false;
        }
    }

    //深度优先搜索
    dfs(v) {
        this.initializeMarked();
        this.dfsRecursive(v);
    }

    //递归实现深度优先搜索
    dfsRecursive(v) {
        this.marked[v] = true; //标记顶点遍历状态 防止重复打印
        // if (this.adj[v] != undefined) {
        console.log("Visited vertex: " + v);
        // }
        let edge = this.edges[v]; //获取顶点对应的边
        for (let i = 0, j = edge.length; i < j; i++) {
            if (!this.marked[edge[i]]) {
                this.dfsRecursive(edge[i]);
            }
        }
    }

    //广度优先搜索
    bfs(v) {
        this.initializeMarked();
        let queue = new QueueBasedArray();
        queue.enqueue(v);
        this.marked[v] = true; //标记顶点遍历状态
        while (!queue.isEmpty()){
            let w = queue.dequeue();
            console.log("Visited vertex: " + w);
            let edge = this.edges[w]; //获取顶点对应的边
            for (let i = 0, j = edge.length; i < j; i++) {
                if (!this.marked[edge[i]]) { //顶点没有遍历过 入队 
                    queue.enqueue(edge[i]);
                    this.marked[edge[i]] = true; //入队时 标记顶点遍历状态 防止重复打印
                }
            }
        }
    }

}

// 测试代码
let graph = new Graph()

// 添加顶点
let myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
for (let i = 0; i < myVertexes.length; i++) {
    graph.addVertex(myVertexes[i])
}

// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.showGraph());
console.log(graph.getAllEdges())
console.log(graph.getAllVertices())
console.log("判断两顶点之间是否有边：" + graph.hasEdge('A', 'D'));
console.log("深度优先搜索" + graph.dfs('A'));
console.log("广度优先搜索" + graph.bfs('A'));