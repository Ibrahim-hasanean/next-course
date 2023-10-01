'use client';
import { useState, useEffect } from 'react';
import { useBoardStore } from '@/store';
import { Image, Todo, TypedColumn } from '@/typings';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { default as NextImage } from 'next/image';

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import getUrl from '@/lib/getUrl';

type TodoCardProps = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: TodoCardProps) => {
  const { deleteTask } = useBoardStore();
  const [imageUrl, setImageUrl] = useState<string | null>();

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image as Image);
        setImageUrl(url.toString());
      };
      fetchImage();
    }
  }, []);

  return (
    <div
      className='bg-white rounded-md space-y-2 drop-shadow-md'
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className='text-red-500 hover:text-red-600'
        >
          <XCircleIcon className='ml-5 h-8 w-8' />
        </button>
      </div>
      {imageUrl && (
        <div className='w-full rounded-b-md h-[400px] overflow-hidden'>
          <NextImage
            width={400}
            height={200}
            src={imageUrl}
            alt={todo.title}
            className='w-full object-contain rounded-b-md'
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;