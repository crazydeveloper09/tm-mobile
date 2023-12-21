import iconFont from '../../assets/fonts/FontAwesome.ttf';
import * as Font from 'expo-font';

export const useFonts = async () => {
    await Font.loadAsync({
        'FontAwesome': iconFont
    })
}

export const customFonts = {
    'FontAwesome': require('../../assets/fonts/FontAwesome.ttf')
}