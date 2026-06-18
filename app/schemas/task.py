from pydantic import BaseModel
from datetime import datetime

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
    created_at: datetime
    updated_at: datetime
    
    
    model_config = {
        "from_attributes": True
    }   