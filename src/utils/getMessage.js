
export function getMessageWithDelay(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Error loading data! Please try again."));
      } else {
        resolve("✓ Message loaded successfully!");
      }
    }, 2000);
  });
}


export function getMessageWithError() {
  return getMessageWithDelay(true);
}