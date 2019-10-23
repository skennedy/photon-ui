const chunked = (chunkSize: number) => <A>(arr: A[]): A[][] => {
  const chunkCount = 1 + Math.floor(arr.length / chunkSize);
  return Array.from(Array(chunkCount), (v, idx) => {
    const chunkStart = idx * chunkSize;
    return arr.slice(chunkStart, Math.min(arr.length, chunkStart + chunkSize));
  });
};

export default chunked;
