import {
  FaBug,
  FaFileInvoiceDollar,
  FaQuestionCircle,
  FaRocket,
  FaUserShield,
} from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { usePopOver } from "../common/popOver/usePopOver";
import { useEffect, useState } from "react";

export type StoryType = "feature" | "defect" | "risk" | "debt" | "unknown";
export type Story = {
  id: string;
  title: string;
  type: StoryType;
};

export type StoryCardProps = Omit<Story, "columnId">;

export type StoryTypeProps = {
  type: StoryType;
  className?: string;
};
export const StoryTypeIcon = ({ type, className }: StoryTypeProps) => {
  switch (type) {
    case "defect":
      return (
        <div className={`w-4 h-4 flex justify-center align-middle `}>
          <FaBug className={`fill-red-500 hover:fill-red-300 `} />
        </div>
      );
    case "feature":
      return (
        <div className={`w-4 h-4 flex justify-center align-middle `}>
          <FaRocket className={`fill-green-500 hover:fill-green-300`} />
        </div>
      );
    case "debt":
      return (
        <div className={`w-4 h-4 flex justify-center align-middle `}>
          <FaFileInvoiceDollar
            className={`fill-blue-500 hover:fill-blue-300 `}
          />
        </div>
      );
    case "risk":
      return (
        <div className={`w-4 h-4 flex justify-center align-middle `}>
          <FaUserShield className={`fill-orange-500 hover:fill-orange-300 `} />
        </div>
      );
    case "unknown":
    default:
      return (
        <div className={`w-4 h-4 flex justify-center align-middle `}>
          <FaQuestionCircle />
        </div>
      );
  }
};
const types: StoryType[] = ["feature", "defect", "risk", "debt"];

export const StoryTypeDropdown = ({
  type,
  isDragging,
}: {
  type: StoryType;
  isDragging: boolean;
}) => {
  const [storyType, setStoryType] = useState(type);
  const [nonSelectedTypes, setNonSelectedTypes] = useState<StoryType[]>([]);

  useEffect(() => {
    setNonSelectedTypes(types.filter((t) => t !== storyType));
  }, [storyType]);

  const { reference, floating } = usePopOver<HTMLButtonElement>({
    position: "right",
    matchWidths: false,
  });
  return (
    <Menu>
      {({ close, open }) => {
        if (isDragging && open) close();

        return (
          <>
            <Menu.Button className="w-4 h-4" ref={reference}>
              <StoryTypeIcon type={storyType} />
            </Menu.Button>
            <Menu.Items
              className={`absolute flex outline-0 space-x-1`}
              ref={floating}
            >
              {nonSelectedTypes.map((nonSelectedType) => {
                return (
                  <Menu.Item key={nonSelectedType}>
                    {({ active }) => {
                      return (
                        <div
                          onClick={() => {
                            setStoryType(nonSelectedType);
                          }}
                        >
                          <StoryTypeIcon type={nonSelectedType} />
                        </div>
                      );
                    }}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </>
        );
      }}
    </Menu>
  );
};

export const StoryCard = ({
  title,
  type,
  isDragging,
}: StoryCardProps & { isDragging: boolean }) => {
  return (
    <div
      className={`flex flex-col bg-white shadow-md rounded p-3 h-36 w-full mb-2`}
    >
      <h2 className="flex-1 text-lg line-clamp-2 font-medium text-gray-800">
        {title}
      </h2>
      <StoryTypeDropdown type={type} isDragging={isDragging} />
    </div>
  );
};
