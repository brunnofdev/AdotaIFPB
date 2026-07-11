export function Card({ title, description, onClick }) {
    return (
        <div className="grid-item">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <button className="card-button" onClick={onClick}>Quero adotar</button>
        </div>
    );
}

