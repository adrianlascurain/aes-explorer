import type { CarouselItem } from '../types/CarouselItem';
import encryptedIcon from '../assets/encrypted.svg';

export class CardCarouselLanguage {
    static readonly ES: CarouselItem[] = [
        {
            title: 'SubBytes',
            image: encryptedIcon,
            alt: 'Operación SubBytes',
            description: 'La operación SubBytes sustituye cada byte del estado usando la tabla de sustitución (S-box) del AES. Cada byte se divide en dos nibbles (4 bits) que actúan como coordenadas en la tabla.',
        },
        {
            title: 'ShiftRows',
            image: encryptedIcon,
            alt: 'Operación ShiftRows',
            description: 'ShiftRows realiza un desplazamiento cíclico de los bytes en cada fila de la matriz de estado. La fila 0 no se desplaza, la fila 1 se desplaza 1 posición, la fila 2 dos posiciones, y la fila 3 tres posiciones.',
        },
        {
            title: 'MixColumns',
            image: encryptedIcon,
            alt: 'Operación MixColumns',
            description: 'MixColumns mezcla los bytes de cada columna usando aritmética en GF(2^8). Cada columna se multiplica por una matriz de mezcla fija, proporcionando difusión en el algoritmo.',
        },
        {
            title: 'AddRoundKey',
            image: encryptedIcon,
            alt: 'Operación AddRoundKey',
            description: 'AddRoundKey aplica la clave de ronda al estado usando operaciones XOR. Cada byte del estado se combina con el byte correspondiente de la clave de ronda derivada.',
        },
        {
            title: 'Rondas de AES',
            image: encryptedIcon,
            alt: 'Rondas de AES',
            description: 'AES ejecuta múltiples rondas (10, 12 o 14 según el tamaño de clave). Cada ronda aplica SubBytes, ShiftRows, MixColumns y AddRoundKey para transformar los datos.',
        },
        {
            title: 'Cifrado Completo',
            image: encryptedIcon,
            alt: 'Cifrado AES',
            description: 'El cifrado AES combina todas las operaciones criptográficas en una serie de rondas que transforman el texto plano en texto cifrado, garantizando seguridad mediante múltiples capas de transformación.',
        }
    ];

    static readonly EN: CarouselItem[] = [
        {
            title: 'SubBytes',
            image: encryptedIcon,
            alt: 'SubBytes Operation',
            description: 'The SubBytes operation substitutes each byte of the state using the AES substitution table (S-box). Each byte is divided into two nibbles (4 bits) that act as coordinates in the table.',
        },
        {
            title: 'ShiftRows',
            image: encryptedIcon,
            alt: 'ShiftRows Operation',
            description: 'ShiftRows performs a cyclic shift of the bytes in each row of the state matrix. Row 0 is not shifted, row 1 shifts 1 position, row 2 shifts 2 positions, and row 3 shifts 3 positions.',
        },
        {
            title: 'MixColumns',
            image: encryptedIcon,
            alt: 'MixColumns Operation',
            description: 'MixColumns mixes the bytes of each column using arithmetic in GF(2^8). Each column is multiplied by a fixed mixing matrix, providing diffusion in the algorithm.',
        },
        {
            title: 'AddRoundKey',
            image: encryptedIcon,
            alt: 'AddRoundKey Operation',
            description: 'AddRoundKey applies the round key to the state using XOR operations. Each byte of the state is combined with the corresponding byte of the derived round key.',
        },
        {
            title: 'AES Rounds',
            image: encryptedIcon,
            alt: 'AES Rounds',
            description: 'AES executes multiple rounds (10, 12, or 14 depending on key size). Each round applies SubBytes, ShiftRows, MixColumns, and AddRoundKey to transform the data.',
        },
        {
            title: 'Complete Encryption',
            image: encryptedIcon,
            alt: 'AES Encryption',
            description: 'AES encryption combines all cryptographic operations in a series of rounds that transform plaintext into ciphertext, ensuring security through multiple layers of transformation.',
        }
    ];

    /**
     * Obtiene los items del carrusel según el idioma
     * @param language - 'ES' para español, 'EN' para inglés
     * @returns Array de CarouselItem
     */
    static getCarouselItems(language: 'ES' | 'EN' = 'ES'): CarouselItem[] {
        return language === 'ES' ? this.ES : this.EN;
    }
}
