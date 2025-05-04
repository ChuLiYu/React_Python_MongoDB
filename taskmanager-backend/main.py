from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bson import ObjectId

# Pydantic 模型
class TodoModel(BaseModel):
    title: str
    status: bool

# 建立 FastAPI 應用
app = FastAPI()

# 設定 CORS（允許 React 前端連接）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB 設定
client = MongoClient("mongodb://localhost:27017/")
db = client["todo_db"]
collection = db["todos"]


def serialize_todo(todo):
    return {
        "id": str(todo["_id"]),
        "title": todo["title"],
        "status": todo["status"]
    }


# Create 新增待辦
@app.post("/todos")
async def create_todo(todo: TodoModel):
    print(todo)  # 用來檢查接收到的資料
    new_todo = todo.dict()
    result = collection.insert_one(new_todo)
    return {"id": str(result.inserted_id)}

# Read 取得所有待辦
@app.get("/todos")
async def get_todos():
    todos = list(collection.find())
    return [serialize_todo(todo) for todo in todos]

# Update 修改某筆待辦
@app.put("/todos/{todo_id}")
async def update_todo(todo_id: str, todo: TodoModel):
    result = collection.update_one(
        {"_id": ObjectId(todo_id)},
        {"$set": todo.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"msg": "Todo updated"}

# Delete 刪除某筆待辦
@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str):
    result = collection.delete_one({"_id": ObjectId(todo_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"msg": "Todo deleted"}