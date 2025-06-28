const QRCode = require("qrcode");

//Genera un código QR en formato base64 (DataURL) a partir de los datos de inscripción
// @param {Object} data - Objeto con la información a codificar (userId, eventId, etc.)
// @returns {Promise<string>} - Imagen del código QR en base64 (DataURL)
const generateQR = async (data) => {
  try {
    const stringData = JSON.stringify(data);
    const qrCode = await QRCode.toDataURL(stringData); // Formato base64
    return qrCode;
  } catch (error) {
    console.error("Error generando el código QR:", error);
    throw new Error("No se pudo generar el código QR");
  }
};

module.exports = generateQR;
