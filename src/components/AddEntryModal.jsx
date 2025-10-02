import { useActionState, useEffect } from "react";
import { sleep, validate } from "../utils/validate";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageData";

async function action(_prevState, formData) {
  const data = Object.fromEntries(formData);
  const validationErrors = await validate(data);
  await sleep(1000);
  if (Object.keys(validationErrors).length === 0) {
    console.log("Submitted:", data);
    const diary = (await getLocalStorageData("diary")) ?? [];

    setLocalStorageData("diary", [data, ...diary]);
    alert("Diary Entry added successfully!");
    return { errors: null, input: null, reset: true };
  }
  return { errors: validationErrors, input: data, reset: false };
}

export default function AddEntryModal({ showEntryModal, setShowEntryModal }) {
  const [state, formAction, isPending] = useActionState(action, {
    errors: null,
    input: null,
    reset: true,
  });

  useEffect(() => {
    async function saveData() {
      // if (state.errors === null && state.input !== null) {
      if (state.reset) {
        setShowEntryModal(false);
      }
    }
    saveData();
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
                defaultValue={state.input?.title}
                disabled={isPending}
                className="input input-primary"
                type="text"
                name="title"
                id="title"
              />
            </label>
            {state.errors?.title && (
              <p className="text-red-600 mt-1 font-semibold">
                {state.errors.title}
              </p>
            )}
            <label htmlFor="date">
              <h2>Date</h2>
              <input
                defaultValue={state.input?.date}
                disabled={isPending}
                className="input input-primary"
                type="date"
                name="date"
                id="date"
              />
            </label>
            {state.errors?.date && (
              <p className="text-red-600 font-semibold">{state.errors.date}</p>
            )}
            {state.errors?.duplicate && (
              <p className="text-green-600 font-semibold">
                {state.errors.duplicate}
              </p>
            )}
            <label htmlFor="img">
              <h2>Image URL</h2>
              <input
                defaultValue={
                  state.input?.img || "https://picsum.photos/600/200"
                }
                type="text"
                disabled={isPending}
                className="input input-primary"
                name="img"
                id="img"
              />
            </label>
            {state.errors?.img && (
              <p className="text-red-600 font-semibold">{state.errors.img}</p>
            )}
            <label htmlFor="content">
              <h2>Entry</h2>
              <textarea
                defaultValue={state.input?.content}
                className={
                  !state.errors?.content
                    ? "block textarea textarea-primary mb-15"
                    : "block textarea textarea-primary"
                }
                disabled={isPending}
                name="content"
                id="content"
                rows="5"
                placeholder="What did you do today?"
              ></textarea>
            </label>
            {state.errors?.content && (
              <p className="text-red-600 font-semibold mb-10">
                {state.errors.content}
              </p>
            )}

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
