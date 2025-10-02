export default function DetailsModal({ entry, setShowDetails, showDetails }) {
  function onClick(e) {
    e.preventDefault();
    setShowDetails(!showDetails);
  }
  return (
    <dialog
      id={entry.date}
      className="modal transition ease-in-out duration-400"
    >
      <div className="modal-box flex flex-col w-fit px-5 max-w-[80vw]">
        <button
          onClick={(e) => onClick(e)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h2>Diary Entry</h2>
        <div>
          <figure>
            <img
              className="object-contain rounded shadow-sm"
              src={entry.img}
              alt="EntryImage"
            />
          </figure>
        </div>
        <h3 className="text-sm pt-2">
          {new Date(entry.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <h2 className="pt-2">{entry.title}</h2>
        <div className="overflow-auto">
          <textarea
            className="w-full resize-none"
            rows={10}
            disabled={true}
            value={entry.content}
          />
        </div>
      </div>
    </dialog>
  );
}
