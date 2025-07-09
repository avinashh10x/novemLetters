import { Document, Page, Text, View, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';
import signature from '../assets/signature.jpg';
import logoImg from '../assets/novem_controls-removebg-preview.jpg';


const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#FFFFFF',
        fontSize: 12,
        lineHeight: 1.5,
    },
    fontbold: {
        fontWeight: 'bold',
    },
    fontLight: {
        fontWeight: 'light',
        fontSize: 20
    }
})

// function LetterPDF({ selectedLetter }) {
function LetterPDF() {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.fontbold}>hii</Text>
                <Text style={styles.fontLight} >hii</Text>
            </Page>
        </Document>
    );
}

export default LetterPDF;

