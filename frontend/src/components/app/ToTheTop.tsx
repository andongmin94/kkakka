export default function ToTheTop() {
  return (
    <div className="fixed bg-zinc-100 z-100 rounded-full flex items-center justify-center bottom-5 right-10">
      <button
        className="w-10 h-10"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ↑
      </button>
    </div>
  );
}
