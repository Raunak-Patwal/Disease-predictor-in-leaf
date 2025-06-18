function History({ predictions = [], setPredictions = () => {} }) {
  const clearAll = () => setPredictions([]);
  const deleteOne = (id) => {
    setPredictions(predictions.filter((item) => item.id !== id));
  };

  return (
    <div className="p-5 border shadow-lg bg-white/5 backdrop-blur-md rounded-2xl border-white/10">
      <h2 className="mb-4 text-xl font-bold text-green-200">Prediction History</h2>

      {Array.isArray(predictions) && predictions.length === 0 ? (
        <p className="text-sm text-white/60">No predictions made yet.</p>
      ) : (
        <>
          <ul className="pr-1 space-y-3 overflow-y-auto text-sm text-white/80 max-h-96">
            {predictions.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-3 transition rounded-lg bg-white/10 hover:bg-white/15"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <span className="text-xs text-white/60">{item.date}</span>
                </div>
                <button
                  onClick={() => deleteOne(item.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={clearAll}
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500"
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
}

export default History;
