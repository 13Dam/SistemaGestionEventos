const checkRole = (rolesPermitidos) => {
  return (req, res, next) => {
    const rolUsuario = req.user?.rol;

    if (!rolUsuario || !rolesPermitidos.includes(rolUsuario)) {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: rol insuficiente" });
    }

    next();
  };
};

module.exports = checkRole;
