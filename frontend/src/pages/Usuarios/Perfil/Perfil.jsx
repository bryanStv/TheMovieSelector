import "./Perfil.css"
import { useAuth } from "../../../context/AuthContext";
import { useEffect,useState } from "react";
import { useFetchListUsers } from "../../../apis/useFetchListUsers";
import { useFetchAddFollow } from "../../../apis/follows/useFetchAddFollow";
import { useFetchIsFollowed } from "../../../apis/follows/useFetchIsFollowed";
import { useFetchRemoveFollow } from "../../../apis/follows/useFetchRemoveFollow";

export const Perfil = () => {
    const { user, logout } = useAuth();
    const { users } = useFetchListUsers();
    const { addFollow } = useFetchAddFollow();
    const { removeFollow } = useFetchRemoveFollow();
    const { checkIfFollowed } = useFetchIsFollowed();
    const [followedUsers, setFollowedUsers] = useState({});

    const checkIfUserIsFollowed = (idUser, idSeguido) => {
        if (!followedUsers[idSeguido]) {
            checkIfFollowed(idUser, idSeguido).then((isFollowed) => {
            setFollowedUsers((prevState) => ({
                ...prevState,
                [idSeguido]: isFollowed,
            }));
            });
        }
    };

    const handleFollow = (idUser, idSeguido) => {
        addFollow(idUser, idSeguido)
        setFollowedUsers((prevState) => ({
        ...prevState,
        [idSeguido]: true,
        }));
    };

    const handleUnfollow = (idUser, idSeguido) => {
        removeFollow(idUser,idSeguido)
        setFollowedUsers((prevState) => ({
        ...prevState,
        [idSeguido]: false,
        }));
    };

    useEffect(() => {
        // Comprobamos si cada usuario ya está siendo seguido al cargar
        users.forEach((otheruser) => {
            checkIfUserIsFollowed(user.id, otheruser.id);
        });
    }, [user, users]);

    if (!user) {
        return <div>No has iniciado sesión</div>;
    }

    return (
      <div className="container-perfil container-fluid row">
        <div className="perfil col">
          <h1>Perfil</h1>
          <div className="perfil-info">
            <div className="perfil-info-left">Usuario: {user.usuario}</div>
            <div className="perfil-info-right">
              <p>Correo: {user.email}</p>
            </div>
          </div>
          <div>
            {/*<button className="btn-cambiarContraseña" onClick={changePassword}>
                Cerrar sesión
                </button>*/}
            <button className="btn-logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>
        <div
          className="perfil-otros-usuario col"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <h1>Usuarios</h1>
          <ul>
            {users.map((otheruser, index) => (
              <li key={index}>
                <p>ID: {otheruser.id}</p>
                <p>Usuario: {otheruser.usuario}</p>
                <p>Email: {otheruser.email}</p>
                <p>Fecha de registro: {otheruser.fecha_registro}</p>

                <button
                  className="btn-seguir"
                  onClick={() =>
                    followedUsers[otheruser.id]
                      ? handleUnfollow(user.id, otheruser.id)
                      : handleFollow(user.id, otheruser.id)
                  }
                >
                  {followedUsers[otheruser.id] ? "Dejar de seguir" : "Seguir"}
                </button>

                {/*<button
                    className="btn-seguir"
                    onClick={() => handleFollow(user.id, otheruser.id)}
                    >
                    Seguir
                    </button>*/}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};