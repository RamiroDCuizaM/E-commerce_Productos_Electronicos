const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./database/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'views/Product')));


// Servir archivos estáticos desde las carpetas necesarias para acceder a HTML y CSS
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/navbar')));
app.use(express.static(path.join(__dirname, 'views/icon')));
app.use('/uploads', express.static('uploads'));


// Ruta para acceder a la página de agregar producto
app.get('/addproduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Product/HTML/Addproduct.html')); 
});

//lista de productos
app.get('/listproduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Product/HTML/Listproduct.html')); 
});

app.get('/viewproduct/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Product/HTML/Viewproduct.html'));
});


// Rutas de la API
app.use('/api', userRoutes); 
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// Sincronización con la base de datos
sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Tablas sincronizadas');
    })
    .catch(err => console.error('Error al sincronizar tablas:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
