
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './InitPage.css';

export default function mainPage() {
  return (
    <div className="main">
        <div>
            <div className="title">¿Como quieres Entrar?</div>
            <div className="margin-top-20">
                <Link to={`/joinNoRegisterUser`}>
                    <button type="button" class="btn btn-primary">Usuario No registrado</button>
                </Link>
            </div>
            <div className="margin-top-20">
                <Link to={`/joinRegisterUser`}>
                    <button type="button" class="btn btn-primary">Usuario registrado</button>
                </Link>
            </div>
        </div>
    </div>
  );
}