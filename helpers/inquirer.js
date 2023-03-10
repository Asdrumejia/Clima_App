const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value:  1,
                name: `${ '1.'.green } Buscar ciudad`
            },
            {
                value:  2,
                name: `${ '2.'.green } Historial`
            },
            {
                value:  0,
                name: `${ '0.'.green } Salir`
            },
        ]
    }
];


const inquirerMenu = async() => {

    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opcion '.white);
    console.log('=======================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
       return opcion
};


const pausa = async() => {
    const question = [
      {
        type: 'input',
        name: 'enter',
        message: `Presione ${'Enter'.green} para continuar`
      }
    ];

    console.log('\n');
    await inquirer.prompt(question);
};


const leerInput = async(message) => {
    const question = [
      {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.lenght === 0) {
                return 'Por favor ingrese un valor';
            }  
            return true; 
        }   
      }
    ];

    const {desc}= await inquirer.prompt(question);
    return desc;
};


const listarLugares = async (lugares = []) => {
      
    const choices = lugares.map( (lugar, ind) => {

        const index = `${ind + 1}.`.green;

        return {
            value: lugar.id,
            name:  `${ index } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
};


const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
};


const mostrarListadoCheckList = async (tareas = []) => {
      
    const choices = tareas.map( (tarea, ind) => {

        const index = `${ind + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ index } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
};


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList 
}
