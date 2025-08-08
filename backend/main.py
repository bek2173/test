from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Create a directed graph using networkx
    G = nx.DiGraph()

    # Add nodes
    for node in pipeline.nodes:
        G.add_node(node.id)

    # Add edges
    for edge in pipeline.edges:
        # React Flow edges have source and target node IDs
        # We can optionally use sourceHandle and targetHandle for more specific graph representation
        G.add_edge(edge.source, edge.target)

    # Check if the graph is a Directed Acyclic Graph (DAG)
    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

@app.get("/")
async def read_root():
    return {"message": "VectorShift Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


