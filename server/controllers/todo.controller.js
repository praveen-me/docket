// const Todo = require('./../models/Todo');

// module.exports = {
//   insertTodo: (req, res) => {
//     const todoData = req.body;

//     const newTodo = new Todo({
//       user: todoData.userId,
//       todo: todoData.todo,
//     });

//     newTodo.save(() => {
//       Todo.find({ user: todoData.userId }, (err, data) => {
//         res.json({
//           data,
//         });
//       });
//     });
//   },
//   deleteTodo: (req, res) => {
//     console.log('delete');
//     const { id } = req.params;
//     Todo.remove({ _id: id }, () => {
//       Todo.find({ user: req.user.data._id }, (err, data) => {
//         res.json({
//           data,
//         });
//       });
//     });
//   },
//   getAllTodos: (req, res) => {
//     const {username, _id} = req.user;
//     Todo.find({ user:  username ? req.user._id : req.user.data._id }, (err, data) => {
//       res.json({
//         data,
//       });
//     });
//   },
// };

module.exports = db => {
  const getAllTodos = async userId => {
    const result = await db.any(
      `
      SELECT * FROM todos WHERE user_id = $1
    `,
      [userId]
    );

    return result;
  };

  const inserTodo = async (userId, todoData) => {
    const result = await db.tx(async t => {
      await t.none(
        `
        INSERT INTO todos (todo, user_id) VALUES ($1, $2);
      `,
        [todoData.todo, userId]
      );

      return t.any(
        `
         SELECT * FROM todos WHERE user_id = $1
      `,
        [userId]
      );
    });

    return result;
  };

  return {
    getAllTodos,
    inserTodo
  };
};
