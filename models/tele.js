// Importa el módulo mongoose para la interacción con MongoDB
const  mongoose = require ('mongoose');

// Define el esquema para los documentos en la colección 'tele'
const teleSchema = mongoose.Schema ({

    id: {
        type: Number,
        required: true,
        default: 0
    },
    nombre: {
        type: String,
        required: [true, "Introduce el nombre"]
    },
    Marca: {
        type: String,
        required: [true, "Introduce la marca"]
    },
    Precio: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: true
}
)

// Crea un modelo llamado 'Prodcut'
const Prodcut = mongoose.model ('Prodcut',teleSchema);

module.exports = Prodcut;