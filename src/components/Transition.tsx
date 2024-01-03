import { useStore } from "@nanostores/react"
import { themeCtx } from "../stores/theme";
import { useEffect } from "react";

export default function Transition() {
  const theme = useStore(themeCtx);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--circle-x', `${theme.circle?.x}%`);
    root.style.setProperty('--circle-y', `${theme.circle?.y}%`);
  },[theme])

  return (
    <>
      {theme.image1 && <img src={theme.image1} alt="" className={`border-none outline-none rounded-none w-screen h-[${window.innerHeight}] absolute top-0 z-[800] pointer-events-none`} />}
      {theme.image2 && <img src={theme.image2} alt="" className={`border-none outline-none rounded-none w-screen h-[${window.innerHeight}] absolute top-0 z-[900] pointer-events-none theme-transition`} />}
    </>
  )
} 