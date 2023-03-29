import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.scss';
import { getArrayCharacters } from './redux/Characters/characterSlice';

import { removeCharacter } from './redux/Characters/characterSlice';
import { useAppDispatch } from './redux/store';
import { AiFillCloseCircle } from 'react-icons/ai';

function App() {
	interface ICharacters {
		id: number;
		name: string;
		status: string;
		species: string;
		gender: string;
		image: string;
	}
	const [arrCharacters, setArrCharacters] = useState<ICharacters[]>([]);
	const [isListGenerated, setIsListGenerated] = useState(false);
	const dispatch = useAppDispatch();

	const handleGenerateClick = async (
		e: MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		const data = await dispatch(getArrayCharacters());
		setArrCharacters(data.payload.results);
		setIsListGenerated(!isListGenerated);
	};

	const handleRemoveClick = (
		id: number,
		e: MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		dispatch(removeCharacter(id));
		setArrCharacters(arrCharacters.filter(character => character.id !== id));
	};

	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<h1>Rick and Morty</h1>
			</div>
			<div className={styles.container}>
				<div className={styles.welcome}>
					<h3>Clique no botão abaixo para gerar os personagens</h3>
					<button onClick={e => handleGenerateClick(e)}>Gerar</button>
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
