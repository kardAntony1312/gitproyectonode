const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
  ];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);c
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoActualizado = req.body;
    const index = productos.findIndex(producto => producto.id === id);
    if (index !== -1) {
        productos[index] = { ...productos[index], ...productoActualizado };
        res.json(productos[index]);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(producto => producto.id === id);
    if (index !== -1) {
        productos.splice(index, 1);
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
