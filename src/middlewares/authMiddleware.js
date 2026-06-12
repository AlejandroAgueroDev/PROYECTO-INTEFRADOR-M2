import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

export default authMiddleware;

//? ESTE MIDDLEWARE SE ENCARGA DE PROTEGER LAS RUTAS QUE REQUIEREN AUTENTICACIÓN. VERIFICA LA PRESENCIA DE UN TOKEN JWT EN EL ENCABEZADO DE AUTORIZACIÓN, LO VALIDA Y DECODIFICA. SI EL TOKEN ES VÁLIDO, AGREGA LA INFORMACIÓN DEL USUARIO DECODIFICADA AL OBJETO DE LA SOLICITUD Y PERMITE QUE LA SOLICITUD CONTINÚE. SI EL TOKEN ES INVÁLIDO O FALTA, RESPONDE CON LOS CÓDIGOS DE ERROR CORRESPONDIENTES.