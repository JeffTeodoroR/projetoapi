const connection = require('./connection')
//faz solicitação para o banco de dados!!
const getAll = async () => {

    const tasks = await connection.execute('SELECT * FROM tasks');
    //retorna a primeira posição do array!!!
    return tasks[0];
};

const getOne = async (id) => {

    const query = 'SELECT * FROM tasks WHERE id = ? ';
    
    const [task] = await connection.execute(query, [id]);
    //retorna a primeira posição do array!!!
    return task;
};

const createTask = async (task) => {

    const {title} = task;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title,status,created_at) VALUES (?,?,?)';

    const [createdTask] = await connection.execute(query,[title,'pendente',dateUTC]);
    //retorna a primeira posição do array!!!
    return {insertId: createdTask.insertId};
};

const deleteTask = async (id) =>{

    const query = 'DELETE FROM tasks WHERE id = ?';

    const [removedTask] = await connection.execute(query, [id]);

    return removedTask;
}

const updateTask = async (id, task) =>{

    const{title, status} = task

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';;

    const [updatedTask] = await connection.execute(query, [title, status, id]);

    return updatedTask;
}

module.exports = {
    getAll,
    getOne,
    createTask,
    deleteTask,
    updateTask,
}