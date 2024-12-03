const express = require('express');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products.router');
const cartRoutes = require('./routes/carts.router');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
