import Head from "next/head";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {Dispatch, useEffect, useState} from "react";
import {Column, ColumnWithStories, createColumns} from "../components/Column";
import {Story} from "../components/StoryCard";
import styles from "./index.module.css";
import {QueryClient, useQuery, QueryClientProvider} from '@tanstack/react-query'
import axios from "axios";

const MOCK_STORIES: Story[] = [
  {
    id: "12",
    title: "Add in the ability to add Features, Debts, Defects abd Risks",
    type: "feature",
  },
  {
    id: "21",
    title: "Make Story Type Dropdown",
    type: "risk",
  },
  {
    id: "22",
    title: "Add Card Title",
    type: "debt",
  },
  {
    id: "23",
    title: "Make Cards change columns",
    type: "defect",
  },
];

const MOCK_COLUMNS = [
  {name: "To Do", id: "91", storyIds: ["12", "21"]},
  {name: "Doing", id: "92", storyIds: ["22", "23"]},
  {name: "Done", id: "93", storyIds: []},
];

export const filterStoriesForColumn = (stories: Story[], storyIds: string[]) =>
  storyIds.flatMap((id) => {
    const found = stories.find((story) => story.id === id)
    if (!found) return []

    return found
  })

const makeColumnsWithStories = (columns: Column[], stories: Story[]): ColumnWithStories[] =>
  [...columns].map((column) => {
    const filterStories = filterStoriesForColumn(stories, column.storyIds);
    return {
      ...column,
      stories: filterStories,
    };
  });

const onDragEnd =
  ({
     columns,
     setColumns,
   }: {
    columns: Column[];
    setColumns: Dispatch<Column[]>;
  }) =>
    ({destination, source, draggableId}: DropResult) => {
      if (!destination) return;

      if (positionUnchanged(destination, source)) {
        return;
      }

      const newColumns = [...columns];
      const fromColumn = newColumns.find(
        (column) => column.id === source.droppableId
      );
      const toColumn = newColumns.find(
        (column) => column.id === destination.droppableId
      );

      if (!fromColumn || !toColumn) return;

      fromColumn.storyIds.splice(source.index, 1);
      toColumn.storyIds.splice(destination.index, 0, draggableId);

      setColumns(newColumns);
    };

export const fetchBoard = async (id: string) => {
  return axios.get(`http://localhost:4000/board/${id}` )
}

type QueryKey =  ["board", { id: string }]

function App() {
  const [columns, setColumns] = useState(MOCK_COLUMNS);

  const { data } = useQuery({
    queryKey: ["board", { id: "22" }],
    queryFn: ({ queryKey }: { queryKey: QueryKey}) => {
      const [_, params] = queryKey
      return fetchBoard(params.id)
    }
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
          <DragDropContext onDragEnd={onDragEnd({columns, setColumns})}>
            <div className="flex">{createColumns({columns: makeColumnsWithStories(columns, MOCK_STORIES)})}</div>
          </DragDropContext>
  );
}

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <div className={styles.container}>
      <Head>
        <title>Flow Board</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </main>
    </div>
  )
}

function positionUnchanged(
  destination: { droppableId: string; index: number },
  source: { droppableId: string; index: number }
) {
  return (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  );
}
