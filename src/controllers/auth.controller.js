// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // TODO: 1. Hashear la password antes de guardarla (hashPassword).
    const hashedPassword = await hashPassword(password);
    // TODO: 2. Crear el user y su profile asociado.
    const user = await UserModel.create(
      {
        username,
        email,
        password: hashedPassword,
        role,
        Profile: {
          first_name,
          last_name,
          phone,
        },
      },
      {
        include: [ProfileModel],
      },
    );
    // TODO: 3. Responder con código 201, un mensaje de éxito y devolver el usuario sin la password.
    return res.status(201).json({
      message: "Usuario creado correctamente",
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    const { email, password } = req.body;

    const foundUser = await UserModel.scope("withPassword").findOne({
      where: { email },
    });

    if (!foundUser) {
      return res.status(401).json({
        msg: "Credenciales inválidas",
      });
    }
    const isPasswordValid = await comparePassword(password, foundUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "Credenciales inválidas",
      });
    }
    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).
    const token = signToken({
      id: foundUser.id,
      role: foundUser.role,
    });
    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso.",
    });
    // ? Considerar qué mensaje devolver ante credenciales inválidas.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try {
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
    res.clearCookie("token");

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
