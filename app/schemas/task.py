from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str  | None = None

class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    status: str
    
class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    status: str
    
    model_config = {
        "from_attributes": True
    }   