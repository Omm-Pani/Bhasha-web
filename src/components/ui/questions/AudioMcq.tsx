import { Volume2 } from "lucide-react";
import { ThemedButton } from "../ThemedButton";

const AudioMcq = () => {
  return (
    <div className=" grid gap-4 [@media_(max-width:500px)]:gap-2 [@media_(min-width:700px)]:grid-cols-[min-content_1fr] [@media_(min-width:700px)]:grid-rows-none [@media_(min-width:700px)]:items-center [@media_(min-width:700px)]:gap-6 ">
      <div className="m-auto grid h-full w-full text-[19px] justify-center items-center grid-cols-[1fr]">
        <span className="items-center inline-flex">
          <button className="w-[100px] h-[100px] rounded-[25%] border-[#1899d6] border-b-[4px] bg-[rgb(73,192,248)] flex justify-center items-center [@media_(min-width:700px)]:w-[140px] [@media_(min-width:700px)]:h-[140px]">
            <Volume2 size={70} color="black" />
          </button>
        </span>
      </div>

      <div className="grid gap-2 grid-cols-2 text-[19px] [@media_(min-width:700px)]:self-center">
        <ThemedButton className="w-full text-sm text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          <span className="text-[19px]">test</span>
        </ThemedButton>
        <ThemedButton className="w-full  text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          <span className="text-[19px]">test</span>
        </ThemedButton>
        <ThemedButton className="w-full  text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          <span className="text-[19px]">test</span>
        </ThemedButton>
        <ThemedButton className="w-full  text-foreground border-border [@media_(min-width:700px)]:min-w-[150px]">
          <span className="text-[19px]">test</span>
        </ThemedButton>
      </div>
    </div>
  );
};

export default AudioMcq;
