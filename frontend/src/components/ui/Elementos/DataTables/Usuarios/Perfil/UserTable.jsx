export const UserTable = ({
  users,
  followedUsers,
  handleFollow,
  handleUnfollow,
  user,
}) => {
  return (
    <div>
      <table
        id="DataTableUsuarios"
        className="table table-striped"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Fecha de registro</th>
            <th>Seguimiento</th>
          </tr>
        </thead>
        <tbody>
          {users.map((otheruser, index) => (
            <tr key={index}>
              <td>{otheruser.id}</td>
              <td>{otheruser.usuario}</td>
              <td>{otheruser.email}</td>
              <td>{otheruser.fecha_registro}</td>
              <td>
                <button
                  className={`btn ${
                    followedUsers[otheruser.id] ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() =>
                    followedUsers[otheruser.id]
                      ? handleUnfollow(user.id, otheruser.id)
                      : handleFollow(user.id, otheruser.id)
                  }
                >
                  {followedUsers[otheruser.id] ? "Dejar de seguir" : "Seguir"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Fecha de registro</th>
            <th>Seguimiento</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};