const numbers = [23, 35, 16, 28, 8];

numbers.forEach((n, i) => {
  const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
    type: "module",
    name: `worker-${i + 1}`,
  });

  worker.postMessage({ n });

  worker.onmessage = (event) => {
    console.log(`Main Thread Received from thread ${i}:`, event.data);
  };
});
