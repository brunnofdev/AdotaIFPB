import { useEffect, useState } from 'react';
import { listarAnimais } from '../services/animalService';

export function Card({ onClick }) {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimais = async () => {
            try {
                const dados = await listarAnimais();
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

    if (loading) return <div>Carregando animais...</div>;
    if (error) return <div>Erro ao carregar: {error}</div>;

    return (
        <div className="animal-card-container">
            {animais.map((animal) => (
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
    );
}

