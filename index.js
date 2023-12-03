const express = require ('express')
const mongoose = require ('mongoose')
const Prodcut = require ('./models/tele')
const app = express ()

app.use (express.urlencoded({extended:false}))

app.use(express.json())



// Mensaje de bienvenida
app.get('/', (req,res) =>{
    res.send ('Bienvenido')
}
)

// Iniciando el servidor y en el puerto 3000
app.listen(3000,() =>{
    console.log('Node api run port 3000')
}
)

// Obtener todos los productos
app.get('/telefono', async(req,res) =>{
    try {
        
        const prodcuts = await Prodcut.find ({});
        res.status(200).json(prodcuts);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// obtener un producto específico por ID
app.get('/telefono/:id', async(req,res) => {
    try {
        const {id}= req.params
        const prodcut = await Prodcut.findById (id);
        res.status(200).json(prodcut);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// Crear un nuevo producto
app.post('/telefono', async (req,res)=> {
   try {
    const prodcut = await Prodcut.create (req.body)
    res.status(200).json(prodcut);
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
   }
})

// Actualiza un producto por ID
app.put('/telefono/:id', async (req,res)=>{
    try {
        const {id}= req.params
        const prodcut = await Prodcut.findByIdAndUpdate (id, req.body);
        if (!prodcut){
            return res.status (404).json({message: 'no se puede encontrar el id ${id}'})
        }
        const actualizar = await Prodcut.findById(id);

        res.status(200).json(actualizar);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}
)

// Elimina un producto por ID
app.delete('/telefono/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const prodcut = await Prodcut.findByIdAndDelete(id);

        if(!prodcut){
            return res.status(400).json({message: 'no se puede encontrar el id ${id}'})
        }

        res.status(200).json(prodcut);


    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// Conecta a la base de datos MongoDB
mongoose.connect('mongodb+srv://andres:2511@examen.pzhsyua.mongodb.net/tele?retryWrites=true&w=majority')
.then (()=>
{
    console.log('Conectado a la base de datos')
}).catch(()=>
{
    console.log(error) // Registrar cualquier error que ocurra durante la conexión a la base de datos

})