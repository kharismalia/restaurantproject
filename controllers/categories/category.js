import { client } from "../../config/database.js";

export async function getCategoris(_req, res) {
    const query = `SELECT * FROM categories`;
    const data = await client.query(query);
    if (data.rows.length > 0) {
        return res.status(200).json({message:"berhasil menampilkan data", data:data.rows});
    }else{
        return res.status(200).json({message:"data kosong", data:data.rows});
    }
}
