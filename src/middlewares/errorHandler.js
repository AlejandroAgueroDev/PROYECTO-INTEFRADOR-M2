// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  // PostgreSQL specific error codes
  if (err.code === '22P02') {
    return res.status(400).json({ error: 'Formato de ID invalido' });
  }

  const status = err.status || 500;
  const message = status === 500 ? 'Error interno del servidor' : err.message;

  res.status(status).json({ error: message });
};

export default errorHandler;

//? ESTE MIDDLEWARE SE ENCARGA DE MANEJAR LOS ERRORES QUE OCURREN EN LAS RUTAS DE LA APLICACIÓN. REGISTRA EL ERROR EN LA CONSOLA Y RESPONDE CON UN CÓDIGOS DE ESTADO Y MENSAJE DE ERROR ADECUADOS. TAMBIÉN MANEJA ERRORES ESPECÍFICOS DE POSTGRESQL, COMO EL CÓDIGOS DE ERROR '22P02' PARA ID INVALIDOS, RESPONDIENDO CON UN MENSAJE CLARO AL CLIENTE. SI EL ERROR NO TIENE UN CÓDIGOS DE ESTADO, SE ASUME QUE ES UN ERROR INTERNO DEL SERVIDOR (500).