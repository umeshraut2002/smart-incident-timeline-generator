import { useMemo, useState } from "react";

export function FileDropzone({ onFileSelect, selectedFile, isLoading }) {
  const [isDragging, setIsDragging] = useState(false);

  const containerClass = useMemo(() => {
    const base = "rounded-[32px] border border-dashed p-8 text-center transition";
    if (isDragging) {
      return `${base} border-sky-300 bg-sky-400/10`;
    }
    return `${base} border-white/15 bg-white/5 hover:border-sky-300/50 hover:bg-white/10`;
  }, [isDragging]);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={containerClass}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="mx-auto max-w-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/75">Upload Logs</p>
        <h3 className="mt-4 text-2xl font-semibold text-white">Drag and drop a `.log` or `.txt` file</h3>
        <p className="mt-3 text-sm text-slate-400">
          The backend will parse timestamps, bucket events into a timeline, detect spikes and duplicates, and generate a Markdown report.
        </p>
        <label className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
          <input
            type="file"
            accept=".log,.txt"
            className="hidden"
            disabled={isLoading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onFileSelect(file);
            }}
          />
          {isLoading ? "Uploading..." : "Choose File"}
        </label>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Selected</p>
          <p className="mt-2 truncate text-sm text-slate-200">{selectedFile?.name || "No file selected yet"}</p>
        </div>
      </div>
    </div>
  );
}
