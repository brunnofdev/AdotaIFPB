import { useEffect, useState } from 'react';
import { listarAnimaisDisponiveis } from '../services/animalService';

export function Card({ onClick }) {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const ITENS_POR_PAGINA = 6;

    useEffect(() => {
        const fetchAnimais = async () => {
            try {
                const dados = await listarAnimaisDisponiveis();
                setAnimais(dados);
            } catch (err) {
                setError(err.message);
                console.error("Erro ao carregar animais:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimais();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPaginaAtual(1);
    }, [termoPesquisa]);

    if (loading) return <div>Carregando animais...</div>;
    if (error) return <div>Erro ao carregar: {error}</div>;

    const animaisFiltrados = animais.filter((animal) => {
        const termo = termoPesquisa.toLowerCase();
        return (
            animal.nome.toLowerCase().includes(termo) ||
            animal.especie.toLowerCase().includes(termo)
        );
    });

    const totalPaginas = Math.ceil(animaisFiltrados.length / ITENS_POR_PAGINA);
    const indiceInicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const indiceFim = indiceInicio + ITENS_POR_PAGINA;
    const animaisPaginados = animaisFiltrados.slice(indiceInicio, indiceFim);

    const irProximaPagina = () => {
        if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
    };

    const irPaginaAnterior = () => {
        if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
    };

    return (
        <div className="card-section-wrapper">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Pesquisar por nome ou espécie..." 
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    className="search-input"
                />
            </div>
            
            {animaisFiltrados.length === 0 ? (
                <p className="empty-text">Nenhum animal encontrado para esta pesquisa.</p>
            ) : (
                <>
                    <div className="animal-card-container">
                        {animaisPaginados.map((animal) => (
                            <div key={animal.id} className="animal-card" onClick={() => onClick && onClick(animal.id)}>
                                {animal.urlFoto ? (
                                    <img 
                                        src={animal.urlFoto} 
                                        alt={`Foto de ${animal.nome}`} 
                                        className="card-image"
                                    />
                                ) : (
                                    <div className="card-no-photo">
                                        <span>Sem foto</span>
                                    </div>
                                )}

                                <div className="card-content">
                                    <div>
                                        <h3 className="card-title">{animal.nome}</h3>
                                        <p className="card-description">
                                            <strong>Espécie:</strong> {animal.especie}<br />
                                            <strong>Sexo:</strong> {animal.sexoAnimal}
                                        </p>
                                    </div>

                                    <div className="card-actions">
                                        <button className="card-button">Quero adotar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {totalPaginas > 1 && (
                        <div className="pagination-controls">
                            <button 
                                className="card-button pagination-btn"
                                onClick={irPaginaAnterior}
                                disabled={paginaAtual === 1}
                            >
                                &larr; Anterior
                            </button>
                            <span className="pagination-info">
                                Página {paginaAtual} de {totalPaginas}
                            </span>
                            <button 
                                className="card-button pagination-btn"
                                onClick={irProximaPagina}
                                disabled={paginaAtual === totalPaginas}
                            >
                                Próxima &rarr;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}