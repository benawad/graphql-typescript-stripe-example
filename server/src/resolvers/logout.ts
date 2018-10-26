export const logout = async (_: any, __: any, { req, res }: any) => {
  await new Promise(res => req.session.destroy(() => res()));
  res.clearCookie("connect.sid");
  return true;
};
