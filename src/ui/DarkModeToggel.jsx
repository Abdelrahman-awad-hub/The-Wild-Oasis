import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from '../context/DarkModeContext'

function DarkModeToggel() {
    const { isDarkMode, toggelDarkMode } = useDarkMode()
    return (
        <ButtonIcon onClick={() => toggelDarkMode()}>
            {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    )
}

export default DarkModeToggel