"use client"
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, DragDropContextProps, DropResult, Droppable } from 'react-beautiful-dnd'
import { Column  as ColumnComponent} from './Column'
import { Column, Todo, TypedColumn } from '@/typings'

const Board = () => {
  const { getBoard, board , setBoardState, updateTodoInDB} = useBoardStore(state => state);
  useEffect(() => {
    getBoard();
   
  }, []);

  const reorderItems = <T extends object>(items:T[],sourceIndex:number,destinationIndex:number) => {
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, removed);
    return items;
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    const sourceIndex: number = source.index;
    const destinationIndex: number = destination?.index;
    const entries = Array.from(board.columns.entries());
    if (type === "column") {
      const newItems = reorderItems(entries,sourceIndex,destinationIndex)
      const reArrangedColumns = new Map(newItems);
      setBoardState({...board,columns:reArrangedColumns});
    }
    if (type === "card") {
      if (source.droppableId === destination.droppableId) {
        const newColumns = new Map(entries);
        const columnItems = newColumns.get(source.droppableId as TypedColumn) as Column;
        const newTodos = reorderItems<Todo>(columnItems?.todos as Todo[], sourceIndex, destinationIndex);
        columnItems.todos = [...newTodos];
        newColumns.set(source.droppableId as TypedColumn, columnItems);
        setBoardState({ ...board, columns: newColumns });
      } else {
        const newColumns = new Map(entries);
        const sourceColumn = newColumns.get(source.droppableId as TypedColumn) as Column;
        const destinationColumn = newColumns.get(destination.droppableId as TypedColumn) as Column;
        const [removedItem] = (sourceColumn?.todos??[]).splice(sourceIndex, 1);
        destinationColumn.todos.splice(destinationIndex, 0, removedItem);
        newColumns.set(source.droppableId as TypedColumn, sourceColumn);
        newColumns.set(destination.droppableId as TypedColumn, destinationColumn);
        updateTodoInDB(removedItem,destination.droppableId as TypedColumn);
      }
    }
  }
  

  return (
      <DragDropContext  onDragEnd={handleDragEnd}>
          <Droppable droppableId='board' direction='horizontal' type="column" >
              {(provided) => (
                <div  className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto' {...provided.droppableProps} ref={provided.innerRef} >
                  {Array.from(board.columns.entries()).map(([id, column], index) => (
                      <ColumnComponent key={id} id={id} todos={column.todos} index={index} />
                  ))}
                </div> 
              )}
          </Droppable>
    </DragDropContext>
  )
}

export default Board