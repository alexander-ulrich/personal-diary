import { useEffect, useState } from "react";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "./utils/localStorageData";
import Header from "./components/Header";
import AddEntryModal from "./components/AddEntryModal";
import EntryCard from "./components/entryCard";

const App = () => {
  const modalEl = document.getElementById("addEntryModal");
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [entries, setEntries] = useState([]);
  const [theme, setTheme] = useState(getLocalStorageData("theme") ?? "default");
  useEffect(() => {
    console.log("Show EntryModal? " + showEntryModal);
    if (!showEntryModal) {
      modalEl?.close();

      async function fetchEntries() {
        let diary = await getLocalStorageData("diary");
        setEntries(diary);
        console.log("diary: " + diary);
      }
      fetchEntries();
    }
  }, [showEntryModal]);
  useEffect(() => {
    setLocalStorageData("theme", theme);
    // setTheme(document.querySelector('html').getAttribute('data-theme'));
  }, [theme]);

  useEffect(() => {
    setEntries(getLocalStorageData("diary") ?? []);

    document.querySelector("html").setAttribute("data-theme", theme);
  }, []);

  return (
    <body>
      <Header setTheme={setTheme} />
      <div className="flex flex-col items-center max-w-[1400px]">
        <h1 className="text-3xl font-bold underline">Personal Diary</h1>
        <button className="btn my-15" onClick={() => setShowEntryModal(true)}>
          Add Diary Entry
        </button>
        <AddEntryModal
          showEntryModal={showEntryModal}
          setShowEntryModal={setShowEntryModal}
        />
        {showEntryModal ? modalEl.showModal() : null}
        <div id="content">
          {entries &&
            entries?.map((entry) => (
              <EntryCard key={entry.date} entry={entry} />
            ))}
        </div>
      </div>
    </body>
  );
};

export default App;
