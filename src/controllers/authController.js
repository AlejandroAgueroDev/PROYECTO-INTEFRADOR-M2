import { login as loginService } from '../services/authServices.js';
import { loginSchema, parseWithSchema } from '../utils/validation.js';

const login = async (req, res, next) => {
  try {
    const parsed = parseWithSchema(loginSchema, req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const { email, password } = parsed.data;

    const token = await loginService(email, password);

    if (!token) return res.status(401).json({ error: 'Credenciales inválidas' });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export { login };

//? ESTE CONTROLADOR SE ENCARGA DE RECIBIR LAS SOLICITUDES DE INICIO DE SESIÓN, VALIDAR LOS DATOS Y LLAMAR AL SERVICIO DE AUTENTICACIÓN PARA OBTENER UN TOKEN. SI LOS DATOS SON INVÁLIDOS O EL SERVICIO NO DEVUELVE UN TOKEN, RESPONDE CON LOS CÓDIGOS DE ERROR CORRESPONDIENTES.