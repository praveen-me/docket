module.exports = db => {
  const signUp = async userCreds => {
    const { username, password, email } = userCreds;

    const result = await db.tx(async t => {
      await t.none(
        `
        INSERT INTO users( username, password, email) 
        VALUES ($1, $2, $3)
      `,
        [username, password, email]
      );

      return await t.one(
        `
        SELECT username, email FROM users WHERE username=$1;
      `,
        [username]
      );
    });
    return result;
  };

  const verifyUser = async (username, cb) => {
    const result = await db.oneOrNone(
      `
      SELECT * FROM users WHERE username=$1 OR email=$1;
    `,
      [username]
    );

    cb(result);
  };

  return {
    signUp,
    verifyUser
  };
};
