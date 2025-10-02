import { useEffect, useState } from "react";
import DetailsModal from "./DetailsModal";

export function EntryCard({ entry }) {
  const [showDetails, setShowDetails] = useState(false);
  let detailsEl = document?.getElementById(entry.date);
  useEffect(() => {
    console.log("showDetails: " + showDetails);

    if (!showDetails) {
      detailsEl?.close();
    }
  }, [showDetails]);
  return (
    <article>
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="card bg-base-100 shadow-md transition duration-400 ease-in-out min-w-[60vw] mb-10 mx-10 hoverShine hover:scale-105 hover:cursor-pointer"
      >
        <div className="card-body">
          <h2 className="card-title">{entry.title}</h2>
          <h3>
            {new Date(entry.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>
        <div className="">
          <figure>
            <img
              className="object-contain w-full rounded"
              src={entry.img}
              alt="EntryImage"
            />
          </figure>
        </div>

        <DetailsModal
          entry={entry}
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
        {showDetails ? detailsEl?.showModal() : null}
      </div>
    </article>
  );
}
