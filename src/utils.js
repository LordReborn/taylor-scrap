export const log = (msg, test) => {
  console.log(`${new Date().toISOString()}: ${msg} ${test ? "(Prueba)" : ""}`);
};
