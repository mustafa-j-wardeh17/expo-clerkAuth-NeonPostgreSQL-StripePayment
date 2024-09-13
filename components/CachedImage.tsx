import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { ImageProps } from 'react-native';

interface CachedImageProps extends ImageProps {
    uri: string;
    fallbackUri?: string; // Optional fallback image URI
}

export const CachedImage: React.FC<CachedImageProps> = (props) => {
    const { uri, fallbackUri, ...rest } = props;
    const [cachedSource, setCachedSource] = useState<{ uri: string } | null>(null);

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image from ${uri}`);
                    }

                    const imageBlob = await response.blob();
                    const base64Data = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({ uri: base64Data });
                }
            } catch (error) {
                console.error('Error caching image:', error);
                // Use fallback URI if provided, otherwise revert to original URI
                if (fallbackUri) {
                    setCachedSource({ uri: fallbackUri });
                } else {
                    setCachedSource({ uri });
                }
            }
        };

        getCachedImage();
    }, [uri, fallbackUri]);

    return <Animated.Image source={cachedSource!} {...rest} />;
};
