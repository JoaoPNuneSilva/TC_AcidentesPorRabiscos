import { Draggable } from '@hello-pangea/dnd'

interface TaskProps {
    task: {
        id: string;
        name: string;
    };
    index: number;
}

export function Task ({ task, index }: TaskProps) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-full bg-red-500 mb-2 last:mb-0 px-2 py-3 rounded border-[2px]">
                    <p className="font-medium">{task.name}</p>
                </div>
            )}
        </Draggable>
    )
}