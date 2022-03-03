// Yeet it 
const DNATranscriber = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
} as const;

type DNACodon = keyof typeof DNATranscriber;
type RNACodon = typeof DNATranscriber[DNACodon];

export default function toRna(dna: string): RNACodon[] {
    const codons = [...dna];
    validateSequence(codons);
    const transcribedRNA = codons.map(codon => DNATranscriber[codon]);
    return transcribedRNA;
}

function validateSequence(values: string[]): asserts values is DNACodon[] {
    if (!values.every(isValidCodon)) {
        throw Error('invalid sequence');    
    }
}
function isValidCodon(value: string): value is DNACodon {
    return value in DNATranscriber;
}