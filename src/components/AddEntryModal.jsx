import { useActionState, useEffect } from "react";
import { sleep, validate } from "../utils/validate";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageData";

async function action(_prevState, formData) {
  const data = Object.fromEntries(formData);
  const validationErrors = validate(data);

  if (Object.keys(validationErrors).length === 0) {
    await sleep(2000);
    console.log("Submitted:", data);
    // setShowEntryModal(false);

    return data;
  }
  return { errors: validationErrors, input: data };
}

export default function AddEntryModal({ showEntryModal, setShowEntryModal }) {
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    const diary = getLocalStorageData("diary") ?? [];
    if (state) {
      setLocalStorageData("diary", [state, ...diary]);
      setShowEntryModal(false);
    }
  }, [state]);
  function onX(e) {
    e.preventDefault();
    console.log(showEntryModal);
    setShowEntryModal(false);
  }

  return (
    <dialog id="addEntryModal" className="modal">
      <div className="modal-box w-fit px-15">
        <h3 className="font-bold text-lg">Enter a new Diary Entry</h3>
        <div className="modal-action justify-start">
          <form action={formAction}>
            <button
              onClick={(e) => onX(e)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <label htmlFor="title">
              <h2>Title</h2>
              <input
                disabled={isPending}
                className="input input-primary"
                type="text"
                name="title"
                id="title"
              />
            </label>
            <label htmlFor="date">
              <h2>Date</h2>
              <input
                disabled={isPending}
                className="input input-primary"
                type="date"
                name="date"
                id="date"
              />
            </label>
            <label htmlFor="img">
              <h2>Image URL</h2>
              <input
                type="text"
                disabled={isPending}
                className="input input-primary"
                name="img"
                id="img"
              />
            </label>
            <label htmlFor="content">
              <h2>Entry</h2>
              <textarea
                className="block mb-20 textarea textarea-primary"
                disabled={isPending}
                name="content"
                id="content"
                rows="5"
                placeholder="What did you do today?"
              ></textarea>
            </label>
            {/* if there is a button in form, it will close the modal */}
            <button
              disabled={isPending}
              type="submit"
              className="btn absolute right-5 bottom-5"
            >
              {isPending ? "Adding Entry..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
