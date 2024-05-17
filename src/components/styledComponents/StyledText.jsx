import { StyleSheet, Text } from "react-native";
import { colors } from "../../global/colors";

export default function StyledText({
    children, white, bold, medium, italic, black, mediumItalic, boldItalic, size14, size16, size20, size22, size28, alignCenter, alignStart, alignEnd, textAlign, style }) {
    const textStyles = [
        styles.general,
        white && styles.white,
        bold && styles.bold,
        medium && styles.medium,
        italic && styles.italic,
        black && styles.black,
        mediumItalic && styles.mediumItalic,
        boldItalic && styles.boldItalic,
        size14 && styles.size14,
        size16 && styles.size16,
        size20 && styles.size20,
        size22 && styles.size22,
        size28 && styles.size28,
        alignCenter && styles.alignCenter,
        alignStart && styles.alignStart,
        alignEnd && styles.alignEnd,
        textAlign && styles.textAlign,
    ];
    return <Text style={[textStyles, { ...style }]}>{children}</Text>
};

const styles = StyleSheet.create({
    general: {
        fontFamily: 'NunitoRegular',
        fontSize: 18,
        color: colors.black,
    },
    white: {
        color: colors.white
    },
    bold: {
        fontFamily: 'NunitoBold',
    },
    medium: {
        fontFamily: 'NunitoMedium',
    },
    italic: {
        fontFamily: 'NunitoItalic2',
    },
    black: {
        fontFamily: 'NunitoBlack',
    },
    mediumItalic: {
        fontFamily: 'NunitoMediumItalic',
    },
    boldItalic: {
        fontFamily: 'NunitoBoldItalic',
    },
    size14: {
        fontSize: 14,
    },
    size16: {
        fontSize: 16,
    },
    size20: {
        fontSize: 20,
    },
    size22: {
        fontSize: 22,
    },
    size28: {
        fontSize: 28,
    },
    alignCenter: {
        alignSelf: 'center',
    },
    alignStart: {
        alignSelf: 'flex-start',
    },
    alignEnd: {
        alignSelf: 'flex-end',
    },
    textAlign: {
        textAlign: 'center',
    }
});