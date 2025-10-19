import { ThemedButton } from "./ThemedButton";

const FillBlankQuestionComp = () => {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-2 md:grid-cols-[180px_1fr] md:gap-4">
      <img
        src="binge-eating.png"
        alt=""
        className="mx-auto max-h-[180px] w-[180px]"
      />
      <div className="text-left">
        <div>Tesxjasdjhasj</div>
      </div>
      <div className="col-span-full">
        <div className="justify-center w-full flex flex-wrap gap-2">
          <ThemedButton className="text-sm text-foreground border-border ">
            <span className="text-[19px]">test</span>
          </ThemedButton>
          <ThemedButton className="text-foreground border-border ">
            <span className="text-[19px]">test</span>
          </ThemedButton>
        </div>
      </div>
    </div>
  );
};

export default FillBlankQuestionComp;
