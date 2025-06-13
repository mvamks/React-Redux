import { useDispatch } from "react-redux";
//import { deleteItem } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { deleteItem } from '../heroesList/heroesSlice';


const HeroesListItem = ({ id, name, description, element }) => {
	const dispatch = useDispatch();
	const { request } = useHttp();
	const [deleteForever, setDeleteForever] = useState(false); // ✅ состояние чекбокса

	 
	let elementClassName;

	switch (element) {
		case "fire":
			elementClassName = "bg-danger bg-gradient";
			break;
		case "water":
			elementClassName = "bg-primary bg-gradient";
			break;
		case "wind":
			elementClassName = "bg-success bg-gradient";
			break;
		case "earth":
			elementClassName = "bg-secondary bg-gradient";
			break;
		default:
			elementClassName = "bg-warning bg-gradient";
	}

	const onDelete = () => {
		if(deleteForever) {
			//Удаление из сервера
			request(`http://localhost:3001/heroes/${id}`, 'DELETE')
				.then(() => {
					//Удаление из Redux
					dispatch(deleteItem(id));
				})
				.catch((err) => console.error('Delete error:', err));
		} else {
			//Удаление из Redux
			dispatch(deleteItem(id));
		}		
	}

	return (
		<li
			className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
		>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
				className="img-fluid w-25 d-inline"
				alt="unknown hero"
				style={{ objectFit: "cover" }}
			/>
			<div className="card-body"
				 style={{position: 'relative', paddingBottom: '5px'}}>
				<h3 className="card-title">{name}</h3>
				<p className="card-text">{description}</p>
				<div className="form-check mt-2"
					 style={{ position: 'absolute', bottom: '5px', right: '20px' }}>
					<input
						type="checkbox"
						className="form-check-input"
						id={`delete-${id}`}
						checked={deleteForever}
						onChange={() => setDeleteForever(prev => !prev)} //обработка клика
					/>
					<label className="form-check-label" htmlFor={`delete-${id}`}>
						Удалить навсегда с сервера
					</label>
				</div>
			</div>
			<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
				<button
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
					onClick={onDelete}
				></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
