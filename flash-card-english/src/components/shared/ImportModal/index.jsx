export default function ImportModal({ isOpen, onClose, onImport }) {
  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    try {
      const data = JSON.parse(text);
      onImport(data);
    } catch {
      alert('Invalid JSON file. Please check the format.');
    }
  };

  const handleLoadSample = async () => {
    try {
      const response = await fetch('/sample-words.json');
      const data = await response.json();
      onImport(data);
    } catch {
      alert('Failed to load sample data.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary-container/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-surface-container-lowest rounded-2xl p-8 max-w-md w-full ambient-shadow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="mb-6">
          <h2 className="font-[var(--font-family-headline)] font-extrabold text-2xl text-primary-container mb-2">
            Import Vocabulary
          </h2>
          <p className="font-[var(--font-family-body)] text-on-surface-variant text-sm">
            Upload your JSON word list or load the sample data to get started.
          </p>
        </div>

        {/* Upload area */}
        <label className="block mb-4 cursor-pointer">
          <div className="bg-surface-container-low rounded-xl p-8 text-center hover:bg-surface-container transition-colors ghost-border">
            <span className="material-symbols-outlined text-4xl text-on-primary-container/40 mb-2 block">
              upload_file
            </span>
            <p className="font-[var(--font-family-headline)] font-bold text-primary-container mb-1">
              Drop JSON file here
            </p>
            <p className="text-xs text-on-surface-variant">or click to browse</p>
          </div>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-outline-variant/15" />
          <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">or</span>
          <div className="flex-1 h-px bg-outline-variant/15" />
        </div>

        {/* Sample data button */}
        <button
          onClick={handleLoadSample}
          className="w-full py-3 px-6 rounded-full bg-surface-container-low text-primary-container font-[var(--font-family-headline)] font-bold text-sm hover:bg-surface-container transition-colors ghost-border"
        >
          Load 25 Sample Words
        </button>
      </div>
    </div>
  );
}
