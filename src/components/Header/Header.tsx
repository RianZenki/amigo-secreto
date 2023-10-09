import classes from "./Header.module.css";

export const Header = () => {
	return (
		<header className={classes.header}>
			<div
				className={classes["image-logo"]}
				role="img"
				aria-label="Logo do Sorteador"
			></div>
			<img
				className={classes.participant}
				src="/images/participante.png"
				alt="Participante com um presente na mão"
			/>
		</header>
	);
};
