import { StyledStartButton } from './styles/startButton';

import { GameStates } from './Minesweeper';

interface Props {
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;
}

export const StartButton = ({ setGameState }: Props) => (
    <StyledStartButton onClick={() => setGameState(GameStates.SELECT_DIFFICULTY)}>Start Game </StyledStartButton>
)