task_storage = []
next_task_id = 1


def get_tasks(task_date=None, user_id=None):
    result = task_storage
    
    if user_id is not None:      
        result = [
            task for task in result
            if task["user_id"] == user_id
        ]
    
    if task_date is not None:
        result = [
            task for task in result
            if task["date"] == task_date
        ]
        
    return result
    

def get_task_by_id(task_id: int):
    for task in task_storage:
        
        if task["id"] == task_id:
        
            return task


def create_task(task_data):
    global next_task_id
        
    task_dict = task_data.model_dump()
    task_dict["id"] = next_task_id
        
    task_storage.append(task_dict)
        
    next_task_id += 1
        
    return task_dict


def update_task(task_id, task_data):
    task = next(
        (task for task in task_storage 
        if task["id"] == task_id),
        None
    )

    if task is None:
         return None
    
            
    update_data = task_data.model_dump(exclude_unset=True)
         
    task.update(update_data)
         
    return task


def delete_task(task_id):
        for index, task in enumerate(task_storage):
            if task["id"] == task_id:
                deleted_task = task_storage.pop(index)
                return deleted_task

