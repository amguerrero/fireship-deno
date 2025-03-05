// @ts-nocheck no types available
import { threadId } from "node:worker_threads";

function fibonacci(num: number): number {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

self.onmessage = (event) => {
  console.log(`Worker ${threadId} received:`, event.data);
  const { n } = event.data;
  const result = fibonacci(n);

  self.postMessage(result);
  self.close();
};
