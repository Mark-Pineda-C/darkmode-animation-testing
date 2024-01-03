import { useEffect, useState } from "react";
import { MaterialSymbolsDarkModeRounded, MaterialSymbolsLightModeSharp } from "./svg";
import { themeCtx } from "../stores/theme";
import { domToPng } from 'modern-screenshot'

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  const [active, setActive] = useState(false);

  const handleClick = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    setActive(true);
    const x = parseFloat((evt.clientX/window.innerWidth * 100).toFixed(2));
    const y = parseFloat((evt.clientY/window.innerHeight * 100).toFixed(2));
    themeCtx.setKey("circle", {x,y});
    const result = await domToPng(document.getElementById('body') as HTMLElement);
    const img1 = result;
    console.log('img1: ', result)
    themeCtx.setKey("image1", img1);
    setTheme(theme === "light" ? "dark" : "light");
    await wait(50)
    const result2 = await domToPng(document.getElementById('body') as HTMLElement);
    themeCtx.setKey("image2", result2);
    console.log('img2: ', result)
    await wait(800);
    themeCtx.set({
      image1: undefined,
      image2: undefined,
      active: false
    })
    setActive(false);
  }
  
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={(e) =>handleClick(e)} disabled={active}>
      {theme === 'light' ? (
        <MaterialSymbolsLightModeSharp />
      ) : (
        <MaterialSymbolsDarkModeRounded />
      )}
    </button>
  )
}