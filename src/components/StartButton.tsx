import { StyledStartButton } from './styles/startButton';

interface Props {
    startGame: () => void
}

export const StartButton = ({ startGame }: Props) => (
    <StyledStartButton onClick={startGame}>Start Game </StyledStartButton>
)