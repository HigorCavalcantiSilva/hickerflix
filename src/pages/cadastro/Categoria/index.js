import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000',
  };
  const [categorias, setCategorias] = useState([]);
  const [valores, setValores] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValores({
      ...valores,
      [chave]: valor,
    });
  }

  function handleChange(e) {
    setValue(e.target.getAttribute('name'), e.target.value);
  }

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';
    fetch(URL)
      .then(async (response) => {
        const resposta = await response.json();
        setCategorias([...resposta]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {valores.nome}
      </h1>

      <form onSubmit={function handleSubmit(e) {
        e.preventDefault();
        setCategorias([
          ...categorias,
          valores,
        ]);

        setValores(valoresIniciais);
      }}
      >

        <FormField label="Nome da Categoria" type="text" name="nome" value={valores.nome} onChange={handleChange} />
        <FormField label="Descrição" type="textarea" name="descricao" value={valores.descricao} onChange={handleChange} />
        <FormField label="Cor" type="color" name="cor" value={valores.cor} onChange={handleChange} />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => (
          <li key={`${categoria}${indice}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para Home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
