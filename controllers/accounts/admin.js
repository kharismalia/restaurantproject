import { client } from "../../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export async function loginAdmin (req, res){
    const accounts = await client.query(
      `SELECT * FROM admins WHERE username = '${req.body.username}'`
    );

    if (accounts.rows.length > 0) {
      if (await bcrypt.compare(req.body.password, accounts.rows[0].password)) {
        const token = jwt.sign({ sub: accounts.rows[0].id }, process.env.SECRET_KEY,{ expiresIn: '1h' });
        res.status(200).json({message:"login berhasil",data:accounts.rows[0],token:token});
      } else {
        res.status(401).json({ message: "Kata sandi salah."});
      }
    } else {
      res.status(401).json({ message: "Nama pengguna tidak ditemukan."});
    }
}



