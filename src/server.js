import app from "./app.js"

const port = process.env.PORT ?? 8080

app.listen(port, () => {
    console.log(`La aplicación está corriendo en el puerto ${port}`)
})