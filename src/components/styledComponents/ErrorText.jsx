import StyledText from "./StyledText";
import { colors } from "../../global/colors";

export default function ErrorText({children}) {
    return (
        <StyledText italic size14 alignCenter textAlign style={{color: colors.red}}>{children}</StyledText>
    )
};