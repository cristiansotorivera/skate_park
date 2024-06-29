import jwt from 'jsonwebtoken' // Importamos la librería jsonwebtoken

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    // Obtenemos el token del encabezado de autorización
    let token = req.headers.authorization

    // Si no hay token, respondemos con un error 401 (No autorizado)
    if (!token) {
        return res.status(401).json({ error: "Token no generado" });
    }

    // Eliminamos la palabra "Bearer" del token
    token = token.split(" ")[1]

    try {
        // Verificamos el token utilizando la clave secreta
        const { email, role_id, nombre, password, anos_experiencia, especialidad } = jwt.verify(token, process.env.SECRET_KEY)
        
        // Asignamos los valores decodificados al objeto req
        req.email = email
        req.nombre = nombre
        req.password = password
        req.anos_experiencia = anos_experiencia
        req.especialidad = especialidad
        req.role_id = role_id
        
        // Pasamos al siguiente middleware
        next()
    } catch (error) {
        // Si hay un error, lo registramos y respondemos con un error 400 (Solicitud incorrecta)
        console.log(error)
        return res.status(400).json({ error: "Token invalido" });
    }
}

// Middleware para verificar si el usuario es administrador
export const verifyAdmin = (req, res, next) => {
    // Verificamos si el role_id es 1 (administrador)
    if (req.role_id === 1) {
        return next()
    }

    // Si no es administrador, respondemos con un error 403 (Prohibido)
    return res.status(403).json({ error: "Acceso Solo para administrador" })
}

// Middleware para verificar si el usuario es un usuario autorizado
export const verifyUser = (req, res, next) => {
    // Verificamos si el role_id es 1 (administrador) o 2 (usuario autorizado)
    if (req.role_id === 2 || req.role_id === 1) {
        return next()
    }
    
    // Si no es un usuario autorizado, respondemos con un error 403 (Prohibido)
    return res.status(403).json({ error: "Usuario no autorizado" })
}
