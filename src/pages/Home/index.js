import React from 'react'
import Menu from '../../components/menu';
import "./index.css"

const Home = () => { 
    return (
        <div>
        <Menu />
            <div className="container">
                <h1 id="BoasVindas">Olá, seja bem vindo a sua lista de vacinas.</h1>
        
                <h2 id="BoasVindas">Você pode navegar nos menus acima e aproveitar nossos serviços.</h2>

                <img id="BoasVindas" src="https://cdn.pixabay.com/photo/2019/07/05/19/39/the-syringe-4319227_1280.png" width={50} height={750}/>
            </div>
        </div>
    )
}

export default Home;
