import React, { useEffect, useRef, useState } from "react";
import {
  Lock,
  Star,
  Zap,
  Heart,
  Gem,
  Flame,
  ArrowLeft,
  BookText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ThemedButton } from "../components/ui/ThemedButton";

export default function DashBoard() {
  const language = useGameStore((state) => state.language);

  useEffect(() => {
    console.log("Selected language from global state:", language);
  }, [language]);

  return (
    <div className="min-h-screen pl-[88px] w-full bg-background text-foreground flex lg:pl-[256px]">
      <Sidebar />
      <main className="h-full flex-1 pt-6 max-w-[1056px] w-full mx-auto">
        <div className="flex flex-row-reverse px-6 pb-6 gap-[48px] h-full">
          <RightRail />
          <CenterColumn />
        </div>
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen lg:w-[256px] flex-col border-r-2 px-4 overflow-y-auto">
      <div className="pl-4 pb-7 pt-8 text-3xl font-extrabold text-primary select-none">
        BHASA
      </div>
      <div className="w-full flex flex-col gap-2">
        <NavItem active imgSrc="home.png" label="LEARN" />
        <NavItem imgSrc="podium.png" label="LEADERBOARDS" />
        <NavItem imgSrc="treasure-chest.png" label="QUESTS" />
        <NavItem imgSrc="grocery-store.png" label="SHOP" />
        <NavItem imgSrc="housekeeper.png" label="PROFILE" />
        <NavItem imgSrc="list.png" label="MORE" />
      </div>
    </aside>
  );
}

function NavItem({
  active,
  imgSrc,
  alt = "",
  label,
}: {
  active?: boolean;
  imgSrc: string;
  alt?: string;
  label: string;
}) {
  return (
    <button
      className={`flex cursor-pointer items-center gap-3 rounded-[12px] px-4 py-[9px] text-sm font-semibold tracking-wide transition-colors ${
        active
          ? "bg-[#202f36] text-[#49c0f8] border-2 border-[#3f85a7]"
          : "hover:bg-[#202f36]"
      }`}
    >
      <span className="grid place-items-center size-8">
        <img
          src={imgSrc}
          alt={alt || label}
          className="w-[30px] h-[30px] object-contain"
          draggable={false}
        />
      </span>
      <span className="uppercase font-bold tracking-wider pl-2">{label}</span>
    </button>
  );
}

function TopStatusBar() {
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between gap-5 py-4 bg-gradient-to-b from-background to-transparent">
      <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm ring-1 ring-border">
        <span className="font-semibold">
          {useGameStore.getState().language || "Kannada"}
        </span>
      </div>
      <MiniStat
        icon={<Flame fill="yellow" className="size-6 text-secondary" />}
        value="0"
      />
      <MiniStat icon={<Gem className="size-6 text-blue-500" />} value="500" />
      <MiniStat
        icon={<Heart fill="red" className="size-6 text-destructive" />}
        value="5"
      />
    </div>
  );
}

function MiniStat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm">
      {icon}
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* ========= HEADER SWAP LOGIC IS IN CenterColumn + HeaderCard + SkillPath1(last ref) ========= */

function CenterColumn() {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastOfPath1Ref = useRef<HTMLDivElement>(null);
  const [unit, setUnit] = useState<1 | 2>(1);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;

        const headerEl = headerRef.current;
        const lastEl = lastOfPath1Ref.current;
        if (!headerEl || !lastEl) return;

        const headerBottom = headerEl.getBoundingClientRect().bottom;
        const lastBottom = lastEl.getBoundingClientRect().bottom;

        // Flip as soon as the LAST SkillPath1 node is fully under the header.
        const nextUnit: 1 | 2 = lastBottom <= headerBottom ? 2 : 1;
        if (nextUnit !== unit) setUnit(nextUnit);
      });
    };

    // Set initial state once
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [unit]);

  return (
    <section className="flex-1 z-0">
      <div className="sticky top-0 z-50">
        <div className="h-6 bg-background pointer-events-none" />
        <div ref={headerRef}>
          <HeaderCard
            unit={unit}
            bg={unit === 1 ? "var(--primary, #58cc02)" : "#ce82ff"}
          />
        </div>
      </div>

      <div className="relative flex flex-wrap md:mx-auto md:max-w-[630px]">
        <SkillPath1 lastNodeRef={lastOfPath1Ref} />
        <SkillPath2 />
      </div>
    </section>
  );
}

function HeaderCard({ unit, bg }: { unit: 1 | 2; bg: string }) {
  return (
    <div
      className="min-h-[82px] gap-y-[6px] w-full flex items-center rounded-[13px] px-5 py-4 text-foreground shadow-lg"
      style={{ backgroundColor: bg }}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col gap-[6px]">
          <a className="flex items-center justify-items-center gap-[4px] tracking-wide opacity-[0.7] text-foreground">
            <ArrowLeft />
            <h1 className="text-[14px] font-black tracking-normal uppercase leading-[24px]">
              Section 1, Unit {unit}
            </h1>
          </a>
          <span className="flex text-[22px] pl-1 leading-[28px] font-bold wrap-break-word tracking-normal">
            {unit === 1 ? "Order in a cafe" : "Order in a cafe — II"}
          </span>
        </div>
        <div>
          <ThemedButton
            icon={<BookText strokeWidth={2.5} size={24} />}
            onClick={() => {}}
          >
            GUIDEBOOK
          </ThemedButton>
        </div>
      </div>
    </div>
  );
}

function ActiveButton() {
  const navigate = useNavigate();

  return (
    <div className="mt-[67px] mb-0 left-0 relative flex">
      <div className="relative h-[98px] w-[98px] place-items-center">
        {/* ALWAYS-VISIBLE TOOLTIP with pure vertical bounce */}
        <style>{`
             @keyframes tooltip-bob-y {
             0%, 100% { transform: translate3d(0, 0, 0); }
             50%      { transform: translate3d(0, -8px, 0); } /* up-only */
            }
      `}</style>

        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 select-none"
          aria-hidden="true"
        >
          {/* IMPORTANT: this wrapper must have NO translate-x/rotate/etc classes */}
          <div
            className="inline-block will-change-transform transform-gpu"
            style={{ animation: "tooltip-bob-y 1.6s ease-in-out infinite" }}
          >
            <div className="relative rounded-[10px] bg-background border-2 border-border min-w-[80px] text-center shadow-sm">
              <div className="text-[16px] p-[8.5px] font-bold uppercase tracking-wider text-primary">
                START
              </div>

              {/* Downward diamond caret with lower-side border only */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-[9px] w-[16px] h-[16px]">
                {/* mask top half so only lower sides show */}
                <div className="absolute top-0 left-0 w-full h-[8px] bg-background"></div>
                {/* inner filled diamond with bottom+right borders */}
                <div className="absolute inset-[2px] border-b-2 border-r-2 border-border rotate-45 bg-background"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Outer ring */}
        <svg
          className="-p-30 h-[98px] w-[98px] scale-y-[.946]"
          viewBox="0 0 100 100"
        >
          <defs>
            <clipPath id="clip-session/ProgressRing35">
              <path d="M3.061616997868383e-15,-50L2.5717582782094417e-15,-42Z"></path>
            </clipPath>
          </defs>
          <g transform="translate(50, 50)">
            <path
              d="M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M-7.715274834628325e-15,-42A42,42,0,1,0,7.715274834628325e-15,42A42,42,0,1,0,-7.715274834628325e-15,-42Z"
              fill="rgb(55,70,79)"
            />
            <circle
              clipPath="url(#clip-session/ProgressRing35)"
              cx="-3.9949609477190866"
              cy="-45.82619651494328"
              fill="rgb(19,31,36)"
              r="4"
            />
            <path
              d="M3.061616997868383e-15,-50L2.5717582782094417e-15,-42Z"
              fill="#58cc02"
            />
          </g>
        </svg>

        {/* Inner button */}
        <div className="absolute inset-[10px] rounded-full overflow-hidden grid place-items-center">
          <button
            onClick={() => navigate("/lesson")}
            className="cursor-pointer bg-[#58cc02] h-[60px] w-[68px] relative z-0 rounded-full -top-1 shadow-[0_7px_0_rgb(0,0,0,0.2),0_7px_0_#58cc02] transition-all duration-50 ease-in-out active:translate-y-1.5 active:transform-gpu active:shadow-none"
          >
            <Star
              fill="white"
              className="absolute top-[11.5px] left-[14px] h-[34px] w-[42px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

const InactiveButton = React.forwardRef<HTMLDivElement, {}>(
  function InactiveButton(_, ref) {
    return (
      <div ref={ref} className="relative flex mt-[-10px] ">
        <div className="relative h-[98px] w-[98px] place-items-center">
          <div className="absolute inset-[10px] rounded-full overflow-hidden grid place-items-center">
            <button className="cursor-pointer bg-[#37464f]  h-[60px] w-[68px] relative z-0 rounded-full -top-1 shadow-[0_7px_0_rgb(0,0,0,0.2),0_7px_0_#37464f] transition-transform active:translate-y-[5px] active:shadow-none">
              <Star
                fill="#52656d"
                color="#52656d"
                className="absolute top-[11.5px] left-[14px] h-[34px] w-[42px]"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

function SkillPath1({
  lastNodeRef,
}: {
  lastNodeRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <section className="relative w-full pb-24">
      <div
        className="flex flex-col items-center
        [&>*]:transform-gpu [&>*]:will-change-transform
        [&>*:nth-child(1)]:translate-x-0
        [&>*:nth-child(2)]:translate-x-[-44.884px]
        [&>*:nth-child(3)]:translate-x-[-70px]
        [&>*:nth-child(4)]:translate-x-[-44.884px]
        [&>*:nth-child(5)]:translate-x-0"
      >
        <ActiveButton />
        <InactiveButton />
        <InactiveButton />
        <InactiveButton />
        {/* Track THIS last one */}
        <InactiveButton ref={lastNodeRef} />
      </div>
    </section>
  );
}

function SkillPath2() {
  return (
    <section className="relative w-full pb-24">
      <div
        className="
          flex flex-col items-center
          [&>*]:transform-gpu
          [&>*]:will-change-transform
          [&>*:nth-child(1)]:translate-x-0
          [&>*:nth-child(2)]:translate-x-[44.884px]
          [&>*:nth-child(3)]:translate-x-[70px]
          [&>*:nth-child(4)]:translate-x-[44.884px]
          [&>*:nth-child(5)]:translate-x-0
        "
      >
        <ActiveButton />
        <InactiveButton />
        <InactiveButton />
        <InactiveButton />
        <InactiveButton />
      </div>
    </section>
  );
}

function RightRail() {
  return (
    <aside
      className=" hidden md:flex
        sticky top-6 self-start
        w-[360px] shrink-0
        h-[calc(100vh-24px)]
        flex-col gap-4"
    >
      <TopStatusBar />
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-extrabold">
            Unlock Leaderboards!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="grid place-items-center size-12 rounded-full bg-white/10 ring-1 ring-white/15">
              <Lock className="size-5" />
            </div>
            <p className="text-md text-muted-foreground leading-5">
              Complete 10 more lessons to
              <br /> start competing
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-extrabold">Daily Quests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center size-10 rounded-lg bg-white/10 ring-1 ring-white/15">
                <Zap className="size-5" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Earn 10 XP</div>
                <Progress value={0} total={10} />
              </div>
            </div>
            <button className="text-xs font-extrabold uppercase text-white/60 hover:text-white">
              VIEW
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-extrabold">
            Create a profile to save your progress!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <button className="rounded-xl bg-[#58cc02] px-4 py-3 text-[#0e151a] font-extrabold ring-1 ring-black/10">
              CREATE A PROFILE
            </button>
            <button className="rounded-xl bg-[#41b5ff] px-4 py-3 text-[#0e151a] font-extrabold ring-1 ring-black/10">
              SIGN IN
            </button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function Progress({ value, total }: { value: number; total: number }) {
  const pct = Math.max(0, Math.min(100, (value / total) * 100));
  return (
    <div className="mt-2 h-3 w-56 rounded-full bg-white/10">
      <div
        className="h-3 rounded-full bg-white/30"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
