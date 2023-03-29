import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.scss';
import api from './services/api';
import {
	removeCharacter,
	editCharacter,
	getArrayCharacters,
} from './redux/Characters/characterSlice';
import { useAppDispatch } from './redux/store';
import { AiFillCloseCircle } from 'react-icons/ai';
import { changeTitle } from './redux/Title/titleSlice';
import titleSlice from './redux/Title/titleSlice';
import { TitleState } from './redux/Title/titleSlice';

function App() {
	interface ICharacters {
		id: number;
		name: string;
		status: string;
		species: string;
		gender: string;
		image: string;
		desc: string;
	}
	const [arrCharacters, setArrCharacters] = useState<ICharacters[]>([]);
	const [isListGenerated, setIsListGenerated] = useState(false);
	const dispatch = useAppDispatch();
	const [text, setText] = useState('');

	useEffect(() => {
		const fetchCharacters = async () => {
			const response = await api.get('/character');
			console.log(response.data.results);
		};
		fetchCharacters();
	}, []);

	const handleGenerateClick = async (e: FormEvent) => {
		e.preventDefault();
		const data = await dispatch(getArrayCharacters());
		setArrCharacters(data.payload.results);
		setIsListGenerated(!isListGenerated);
	};

	const handleRemoveClick = (id: number, e: FormEvent) => {
		e.preventDefault();
		dispatch(removeCharacter(id));
		setArrCharacters(arrCharacters.filter(character => character.id !== id));
	};

	const handleEditClick = (e: FormEvent) => {
		e.preventDefault();
		console.log(e);
		console.log('entri na função de editar');
		dispatch(changeTitle(text));
	};

	const title = useSelector((state: any) => state.titleSlice.title);
	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<h1>{title}</h1>
				<form onSubmit={e => handleEditClick(e)}>
					<input
						type="text"
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					<button>Editar</button>
				</form>
			</div>
			<div className={styles.container}>
				<div className={styles.welcome}>
					<h3>Clique no botão abaixo para gerar os personagens</h3>
					<form>
						<button onClick={e => handleGenerateClick(e)}>Gerar</button>
					</form>
				</div>
				{isListGenerated ? (
					<div className={styles.cardsContainer}>
						{arrCharacters.map(character => (
							<div className={styles.card} key={character.id}>
								<div className={styles.cardImg}>
									<img src={character.image} alt={character.name} />
								</div>
								<div className={styles.cardInfo}>
									<h4>{character.name}</h4>
									<div className={styles.description}>
										<span>Status: {character.status}</span>
										<span>Gênero: {character.gender}</span>
										<span>Espécie: {character.species}</span>
										<span>Descrição: {character.desc}</span>
									</div>
								</div>

								<div className={styles.cardBtns}>
									<AiFillCloseCircle
										className={styles.icon}
										onClick={e => handleRemoveClick(character.id, e)}
									/>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default App;
