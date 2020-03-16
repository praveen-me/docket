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

  const deleteTodo = async (todoId, userId) => {
    const result = await db.tx(async t => {
      await t.none(
        `
        DELETE FROM todos where id = $1;
      `,
        [todoId]
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
    inserTodo,
    deleteTodo
  };
};
