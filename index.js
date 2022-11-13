const express = require('express')
const app = express()
const Crypto = require('crypto')
const bodyParser = require('body-parser')

const ContenedorArchivos = require('./contenedores/productos')
const contenedor = new ContenedorArchivos()
const PUERTO = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

contenedor.deleteAll()
contenedor.save({
  id: Crypto.randomUUID(),
  title: 'Coca Cola 2.25L',
  price: '1000',
  thumbnail: ''
}).then(a => {
  contenedor.save({
    id: Crypto.randomUUID(),
    title: 'Sprite 2.25L',
    price: '1000',
    thumbnail: ''
  }).then(b => {
    contenedor.save({
      id: Crypto.randomUUID(),
      title: 'Fanta 2.25L',
      price: '1000',
      thumbnail: ''
    })
  })
})

app.get('/productos', async (req, res) => {
  res.json(await contenedor.getAll())
})

app.get('/productosRandom', async (req, res) => {
  try {
    const productos = (await contenedor.getAll())
    const idRandom = getRandomInt(0, productos.length)
    console.log(idRandom)
    res.json(productos[idRandom])
  } catch (error) {
    res.status(500).json({
      error: 'Fallo al encontrar productos'
    })
  }
})

app.listen(PUERTO, () => {
  console.log(`Servidor en el puerto ${PUERTO}`)
})