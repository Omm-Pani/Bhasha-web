import ChatBubbleTail from "../ChatBubbleTail";
import { Volume2 } from "lucide-react";
import { ThemedButton } from "../ThemedButton";

const SelectMeaningMcqComp = () => {
  return (
    <div className="grid content-start [@media_(min-width:700px)]:grid-rows-[min-content_1fr]">
      {/* character and chat bubble */}
      <div className="leading-[39px] pl-[10px] [@media_(min-width:700px)]: mt-[-48px]">
        <div className="flex items-center ">
          <div className="self-end flex scale-150 aspect-[118/175] shrink-0 leading-none max-w-[118px] w-[177px]">
            <video autoPlay loop src="woman.webm"></video>
          </div>
          <div className="items-end inline-flex my-3 ml-4 relative">
            <div className="flex items-center border-2 border-border rounded-[12px] py-[10px] px-[14px]">
              <button className="me-2 cursor-pointer">
                <Volume2 size={32} color="#49c0f8" fill="#49c0f8" />
              </button>
              <span className="text-[19px]">une orange</span>
            </div>
            <ChatBubbleTail className="text-border" alignmentY={40} />
          </div>
        </div>
      </div>

      <div className=" gap-2 flex flex-col self-start min-h-[87px] [@media_(min-width:700px)]:min-h-[170px]">
        <ThemedButton className="w-full font-extralight text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          Test
        </ThemedButton>
        <ThemedButton className="w-full font-extralight text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          Test
        </ThemedButton>
        <ThemedButton className="w-full font-extralight text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          Test
        </ThemedButton>
      </div>
    </div>
  );
};

export default SelectMeaningMcqComp;
