import { timeAgo } from "@/utils/common";
import { BiDotsVertical } from "react-icons/bi";

interface IChatMessageProps {
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const ChatMessage = ({
  content,
  timestamp,
  isCurrentUser,
}: IChatMessageProps) => {
  return (
    <div className="flex items-center">
      <div
        className={`flex flex-col lg:max-w-[90%] my-2 p-2 rounded ${
          isCurrentUser ? "ml-auto bg-gray-200" : "mr-auto bg-green-300"
        }`}
      >
        <span className="flex items-center">
          <p className="whitespace-pre-line tracking-wide text-gray-800">
            {content}
          </p>
          <span className="cursor-pointer pt-2 pl-2">
            <BiDotsVertical />
          </span>
        </span>
        <h4 className="text-xs text-gray-500 text-left">
          {timeAgo(timestamp)}
        </h4>
      </div>
    </div>
  );
};

export default ChatMessage;
