import { useEffect, useState } from "react";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageData";

export default function Header() {
  const [theme, setTheme] = useState(getLocalStorageData("theme") ?? "default");
  useEffect(() => {
    setLocalStorageData("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="flex flex-wrap mx-10 my-5">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
        >
          <li>
            <input
              onClick={() => setTheme("default")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Default"
              value="default"
            />
          </li>
          <li>
            <input
              onClick={() => setTheme("light")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Light"
              value="light"
            />
          </li>
          <li>
            <input
              onClick={() => setTheme("dark")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Dark"
              value="dark"
            />
          </li>
          <li>
            <input
              onClick={() => setTheme("retro")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Retro"
              value="retro"
            />
          </li>
          <li>
            <input
              onClick={() => setTheme("cyberpunk")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Cyberpunk"
              value="cyberpunk"
            />
          </li>
          <li>
            <input
              onClick={() => setTheme("valentine")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Valentine"
              value="valentine"
            />
          </li>
          <li>
            <input
              onClick={() => setTheme("aqua")}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Aqua"
              value="aqua"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
