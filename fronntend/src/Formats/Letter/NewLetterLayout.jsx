import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Link,
    Font,
} from '@react-pdf/renderer';
import headerImg from '../../assets/WhatsApp Image 2025-06-19 at 14.23.34_8f32a1b7.jpg';
import footerImg from '../../assets/WhatsApp Image 2025-06-19 at 14.23.44_3ce9dcc7.jpg';
import stampImg from '../../assets/novem_stamp-1-removebg-preview.png';
import signatureImg from '../../assets/ravat_sir_sign-removebg-preview.png';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontSize: 12,
        lineHeight: 1.6,
    },
    headerImg: {
        width: '100%',
    },
    footerImg: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    container: {
        padding: 40,
        position: 'relative',
    },
    ref: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    section: {
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
        marginVertical: 20,
    },
    textBold: {
        fontWeight: 'bold',
    },
    signatureBlock: {
        position: 'relative',
        marginTop: 50,
        width: 200,
        height: 100,
    },
    stamp: {
        position: 'absolute',
        width: 100,
        left: 0,
        bottom: 0,
    },
    signature: {
        position: 'absolute',
        width: 130,
        left: 10,
        bottom: 10,
    },
});

function NewLetterLayout({ selectedLetter }) {
    const getTrainingEndDate = (startDate, period) => {
        const date = new Date(startDate);
        if (period.toLowerCase().includes('45')) {
            date.setDate(date.getDate() + 45);
        } else if (period.toLowerCase().includes('60')) {
            date.setDate(date.getDate() + 60);
        } else if (period.toLowerCase().includes('6 month')) {
            date.setMonth(date.getMonth() + 6);
        }
        return date.toLocaleDateString('en-GB');
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src={headerImg} style={styles.headerImg} />
                <View style={styles.container}>
                    <View style={styles.ref}>
                        <Text>
                            <Text style={styles.textBold}>Ref. No - </Text>
                            {selectedLetter.ReferenceNo || 'NCPL/2025-26/XXXX'}
                        </Text>
                        <Text>
                            <Text style={styles.textBold}>Dated - </Text>
                            {new Date(selectedLetter.createdAt).toLocaleDateString('en-GB')}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text>To,</Text>
                        <Text>The Director</Text>
                        <Text>Training & Placement Office</Text>
                        <Text>{selectedLetter.collegeName || 'IK Gujral Punjab Technical University'}</Text>
                        <Text>{selectedLetter.collegeLocation || 'Mohali, Punjab'}</Text>
                    </View>

                    <Text style={styles.title}>CONFIRMATION OF {selectedLetter.trainingPeriod?.toUpperCase()} INTERNSHIP PROGRAM</Text>

                    <View style={styles.section}>
                        <Text>Dear Sir/Madam,</Text>
                        <Text>
                            We are pleased to inform you that <Text style={styles.textBold}>{selectedLetter.name}</Text>
                            {selectedLetter.gender === 'female' ? ' D/O ' : ' S/O '}
                            <Text style={styles.textBold}>Shri {selectedLetter.FatherName}</Text> has been successfully enrolled in our
                            <Text style={styles.textBold}> {selectedLetter.trainingPeriod} </Text>industrial internship program from
                            <Text style={styles.textBold}> {new Date(selectedLetter.enrollmentDate).toLocaleDateString('en-GB')}</Text> to
                            <Text style={styles.textBold}> {getTrainingEndDate(selectedLetter.enrollmentDate, selectedLetter.trainingPeriod)}</Text> in our esteemed organization.
                        </Text>

                        <Text style={{ marginTop: 10 }}>
                            During the training, the student will have the opportunity to work on various projects and gain hands-on
                            experience in their chosen field. Our team is eager to mentor and support students throughout the
                            internship, and we encourage students to actively participate in our daily activities.
                        </Text>

                        <Text style={{ marginTop: 10 }}>
                            The management will assess the candidate’s performance throughout this period. We look forward to a
                            productive and enriching journey ahead with the candidate.
                        </Text>
                    </View>

                    <View>
                        <Text>Best regards,</Text>
                        <Text>Yours faithfully,</Text>
                        <Text>For NOVEM CONTROLS</Text>
                        <View style={styles.signatureBlock}>
                            <Image src={stampImg} style={styles.stamp} />
                            <Image src={signatureImg} style={styles.signature} />
                        </View>
                    </View>
                </View>
                <Image src={footerImg} style={styles.footerImg} />
            </Page>
        </Document>
    );
}

export default NewLetterLayout;
