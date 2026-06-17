from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str  | None = None

class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    
class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    
    model_config = {
        "from_attributes": True
    }   