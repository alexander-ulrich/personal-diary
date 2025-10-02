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
        className="card bg-base-300 shadow-md hover:scale-105 transition duration-400 ease-in-out mb-10 mx-10 hoverShine"
      >
        <div className="hover:cursor-pointer">
          <figure>
            <img
              className="object-contain w-full aspect-video rounded"
              src={entry.img}
              alt="EntryImage"
            />
          </figure>
        </div>
        <div className="card-body">
          <h3>
            {new Date(entry.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <h2 className="card-title">{entry.title}</h2>
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
