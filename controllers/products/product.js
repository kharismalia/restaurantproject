import { client } from "../../config/database.js"
import { v4 as uuidv4 } from 'uuid'


export async function getProducts(_req, res) {
    try {
        const query = `SELECT * FROM products a JOIN categories b ON a.categoris=b.id`;
        const data = await client.query(query);
        if (data.rows.length > 0) {
            return res.status(200).json({ message: "berhasil menampilkan data", data: data.rows });
        } else {
            return res.status(200).json({ message: "data kosong", data: data.rows });
        }
    } catch (err) {
        return err
    }
}

export async function getProductById(req, res) {
    try {
        const query = `SELECT * FROM products a INNER JOIN categories b ON a.categoris=b.id  WHERE a.name='${req.params.id}'`;
        const data = await client.query(query);
        if (data.rows.length > 0) {
            return res.status(200).json({ message: "berhasil menampilkan data", data: data.rows });
        } else {
            return res.status(200).json({ message: "data kosong", data: data.rows });
        }
    } catch (err) {
        return err
    }
}

export async function postProducts(req, res) {
    try {
        const request = req.body
        const check = await client.query(`SELECT * FROM products WHERE name='${request.name}'`);
        if (check.rows.length > 0) {
            return res.status(400).json({ message: "makanan sudah ada" });
        } else {
            if (request.stok < 1 || request.stok > 100) {
                return res.status(400).json({ message: "stok tidak valid" });
            }
            
            if (!req.file) {
                return res.status(400).json({
                    message: "image must be filled",
                });
            }
            await client.query(
                `INSERT INTO products VALUES('${uuidv4()}', '${request.name}', '${request.price}','${request.stock}','${req.file.filename}', '${request.categoris}')`
            );

           return res.status(201).json({ message: "berhasil manambahkan data", data: req.body })
        }
    } catch (err) {
        return err
    }
}



export async function editProdcutById(req, res) {
    try {
        const request = req.body
        if (request.stok < 1 || request.stok > 100) {
            return res.status(400).json({ message: "stok tidak valid" });
        }
        await client.query(
            `UPDATE products SET name = '${request.nama}', price = '${request.harga}', stock = '${request.stok}', photo = '${req.file.filename}', categoris = '${request.kategori}' WHERE id = '${req.params.id}'`
        );
        return res.status(200).json({ message: `berhasil update makanan`, data: request })
    }catch(err){
        return err
    }

}

export async function deleteProductById(req, res) {
    try{
        await client.query(`DELETE FROM products WHERE name='${req.params.id}'`);
        return res.status(200).json({ message: "berhasil menghapus product" });
    }catch(err){
        return err
    }
}