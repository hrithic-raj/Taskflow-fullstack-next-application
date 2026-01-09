// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateTaskInput() {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   async function saveTask() {
//     if (!title.trim() && !description.trim()) {
//       setOpen(false);
//       return;
//     }

//     await fetch("/api/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, description }),
//     });

//     setTitle("");
//     setDescription("");
//     setOpen(false);
//     router.refresh();
//   }

//   // 👇 Detect click outside
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         open &&
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         saveTask();
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open, title, description]);

//   return (
//     <div className="mx-auto max-w-xl mb-8">
//       <div
//         ref={containerRef}
//         className="rounded-xl border border-neutral-700 bg-neutral-900 p-4 shadow-sm cursor-text transition"
//         onClick={() => setOpen(true)}
//       >
//         {!open ? (
//           <p className="text-gray-400">Take a note...</p>
//         ) : (
//           <>
//             <input
//               placeholder="Title"
//               className="w-full bg-transparent text-white text-lg outline-none mb-2"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               autoFocus
//             />
//             <textarea
//               placeholder="Take a note..."
//               className="w-full bg-transparent text-gray-300 outline-none resize-none"
//               rows={3}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />

//             <div className="flex justify-end mt-2">
//               <button
//                 onClick={saveTask}
//                 className="text-sm text-blue-400 hover:underline"
//               >
//                 Save
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function CreateTaskInput() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  async function saveTask() {
    if (!title.trim() && !description.trim()) {
      setOpen(false);
      return;
    }

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    setOpen(false);
    router.refresh();
  }

  // Click outside → collapse
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        saveTask();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, title, description]);

  return (
    <div className="mx-auto max-w-xl mb-8">
      <div
        ref={containerRef}
        onClick={() => setOpen(true)}
        className={clsx(
          "cursor-text rounded-xl border bg-neutral-900 p-4",
          "transition-all duration-300 ease-out",
          open
            ? "border-neutral-600 shadow-lg scale-[1.01]"
            : "border-neutral-700 shadow-sm"
        )}
      >
        {/* Collapsed */}
        {!open && (
          <p className="text-gray-400 transition-opacity duration-800">
            Take a note...
          </p>
        )}

        {/* Expanded */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-800 ease-out",
            open ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <input
            placeholder="Title"
            className="mt-1 w-full bg-transparent text-white text-lg outline-none mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={open}
          />

          <textarea
            placeholder="Take a note..."
            className="w-full bg-transparent text-gray-300 outline-none resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end mt-3">
            <button
              onClick={saveTask}
              className="text-sm text-blue-400 hover:underline"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
