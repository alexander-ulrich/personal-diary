export default function DetailsModal({ entry, setShowDetails, showDetails }) {
  function onClick(e) {
    e.preventDefault();
    setShowDetails(!showDetails);
  }
  return (
    <dialog id={entry.date} className="modal">
      <div className="modal-box flex flex-col w-fit px-15 max-w-[80vw]">
        <button
          onClick={(e) => onClick(e)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h2>Diary Entry</h2>
        <div className="w-full">
          <figure>
            <img
              className="object-contain rounded shadow-sm"
              src={entry.img}
              alt="EntryImage"
            />
          </figure>
        </div>
        <h3>{entry.date}</h3>
        <h2>{entry.title}</h2>
        <div className="overflow-auto">
          <textarea
            className="w-full"
            rows={10}
            disabled={true}
            value={entry.content}
          />
        </div>
      </div>
    </dialog>
  );
}
