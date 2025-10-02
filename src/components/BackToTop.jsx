export default function BackToTop() {
  function backToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <button
      onClick={() => backToTop()}
      className="btn bt w-[2vw] h-[7vh] m-0 p-0 text-xl hoverShine fixed! rounded-full bottom-5! right-5! max-lg:hidden"
    >
      ↑
    </button>
  );
}
