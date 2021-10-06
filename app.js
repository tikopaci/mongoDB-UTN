const express = require('express');
const app = express();
const conectarDB = require('./config/db');

conectarDB();

//Habilitamos express.json
app.use(express.json({ extended: true }));

//PORT
const PORT = process.env.PORT || 4500;

//ROUTES
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tareas', require('./routes/tareas'));
app.use('/api/proyectos', require('./routes/proyectos'));


app.listen(PORT, () => {
    console.log(`Sv escuchando en PORT: ${PORT}`);
});

