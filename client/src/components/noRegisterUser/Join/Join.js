
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="heading">Entra</div>
        <div>
          <input type="text" class="form-control" placeholder="Nombre" onChange={(event) => setName(event.target.value)}></input>
        </div>
        <div>
          <input type="text" class="form-control" placeholder="Sala" onChange={(event) => setRoom(event.target.value)}></input>
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chatNoRegisterUser?name=${name}&room=${room}`}>
          <button type="submit" class="btn btn-primary">Entrar</button>
        </Link>
      </div>
    </div>
  );
}