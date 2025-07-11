const queue = [];

const addToQueue = (notification) => {
  queue.push(notification);
};

const processQueue = async (processFunction) => {
  while (queue.length > 0) {
    const notification = queue.shift();
    try {
      await processFunction(notification);
    } catch (err) {
      console.error("Error procesando notificación:", err);
    }
  }
};

module.exports = { addToQueue, processQueue };
