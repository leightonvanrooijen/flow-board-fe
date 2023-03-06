import {Draggable, Droppable} from "react-beautiful-dnd";
import {Story, StoryCard} from "./StoryCard";
import React from "react";

export type Column = { name: string; id: string, storyIds: string[] };
export type ColumnWithStories = Omit<Column, "storyIds"> & { stories: Story[] };
export type ColumnProps = {
  cards: Story[];
  name: string;
  id: string;
};

export const Column = ({name, cards, id}: ColumnProps) => {
  return (
    <div className="bg-gray-100 w-80 h-screen p-2 m-1 mt-3 rounded">
      <div className="h-10 border-gray-300 border-b-2 m-2">
        <h2 className="text-xl ml-1 font-bold text-blue-500">{name}</h2>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`h-screen rounded ${
              snapshot.isDraggingOver ? "bg-gray-50" : ""
            }`}
          >
            {cards.map((story, index) => (
              <Draggable draggableId={story.id} index={index} key={story.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${
                      snapshot.isDragging ? "shadow-xl" : "shadow-md"
                    }`}
                  >
                    <StoryCard {...story} isDragging={snapshot.isDragging}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export type CreateColumnsProps = { columns: ColumnWithStories[] };
export const createColumns = ({columns}: CreateColumnsProps) => {
  return columns.map((column, index) => {
    return (
      <Column
        name={column.name}
        id={column.id}
        key={column.id}
        cards={column.stories}
      />
    );
  });
};
