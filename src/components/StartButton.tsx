import { StyledStartButton } from './styles/startButton';

interface Props {
    // startGame: () => void
    setSelectDifficulty: React.Dispatch<React.SetStateAction<boolean>>;
}

// export const StartButton = ({ startGame }: Props) => (
    export const StartButton = ({ setSelectDifficulty }: Props) => (
    <StyledStartButton onClick={() => setSelectDifficulty(true)}>Start Game </StyledStartButton>
    // <StyledStartButton onClick={startGame}>Start Game </StyledStartButton>
)