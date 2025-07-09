import { Document, Page, Text, View, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';
import signature from '../../assets/signature.jpg';
import logoImg from '../../assets/novem_controls-removebg-preview.jpg';

const styles = StyleSheet.create({

  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontSize: 12,
    lineHeight: 1.5,
  },
  container: {
    border: '1 solid #684df4',
    padding: 25,
    borderRadius: 5,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 90,
  },
  companyInfo: {
    textAlign: 'right',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
  },
  textBold: {
    fontWeight: 'bold',
  },
  signature: {
    width: 100,
    height: 50,
    marginTop: 15,
    objectFit: 'cover',
  },
  footer: {
    marginTop: 30,
  }
});


function MyDocument({ selectedLetter }) {

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
        <View style={styles.container}>
          <View style={styles.header}>
            <Image src={logoImg} style={styles.logo} />
            <View style={styles.companyInfo}>
              <Text style={{ fontWeight: 'bold' }}>Novem Controls</Text>
              <Text>Plot No. 218, Ind. Area Phase-IX, Mohali-160062</Text>
              <Text>Chandigarh (INDIA)</Text>
              <Text>Ph.: +91 172-5099200, +91 98153-58800</Text>
              <Text>Email: novemcontrols@gmail.com</Text>
              <Link src='http://www.novemcontrols.com' style={{ fontWeight: 'bold' }}><Text>www.novemcontrols.com</Text></Link>
            </View>
          </View>

          <View style={styles.section}>
            <Text><Text style={styles.textBold}>Ref.No:</Text> {selectedLetter.ReferenceNo || "Reference Number"}</Text>
            <Text><Text style={styles.textBold}>Dated:</Text> {new Date(selectedLetter.createdAt).toLocaleDateString('en-GB') || "Date"}</Text>
          </View>

          <View style={styles.section}>
            <Text>To,</Text>
            <Text>The Director</Text>

            <Text>Training & Placement Office</Text>
            <Text>{selectedLetter.collegeName || 'IK Gujral Punjab Technical University'}</Text>
            <Text>{selectedLetter.collegeLocation || 'Mohali, Punjab'}</Text>
          </View>

          <Text style={styles.title}>CONFIRMATION OF {selectedLetter.trainingPeriod.toUpperCase()} INTERNSHIP PROGRAM</Text>

          <View style={styles.section}>
            <Text>Dear Sir/Madam,</Text>
            <Text style={{ marginTop: 10 }}>
              We are pleased to inform you that<Text style={styles.textBold}> {selectedLetter.name || "[Student Name]"}</Text>
              {selectedLetter.gender === 'female' ? ' D/O ' : ' S/O '}
              <Text style={styles.textBold}>Shri {selectedLetter.FatherName || "Father Name"}</Text> has been successfully enrolled
              in our <Text style={{ fontWeight: 'bold' }}>{selectedLetter.trainingPeriod}</Text> industrial internship program from <Text style={styles.textBold}>
                {new Date(selectedLetter.enrollmentDate).toLocaleDateString('en-GB')}
              </Text> to <Text style={styles.textBold}>
                {getTrainingEndDate(selectedLetter.enrollmentDate, selectedLetter.trainingPeriod)}
              </Text> in our esteemed organization.</Text>


            <Text style={{ marginTop: 10 }}>
              During the training, the student will have the opportunity to work on various projects and gain hands-on
              experience in their chosen field. Our team is eager to mentor and support students throughout the
              internship, and we encourage students to actively participate in our daily activities.
            </Text>
            <Text style={{ marginTop: 10 }}>
              The management will assess the candidate’s performance throughout this period. We look forward to a
              productive and enriching 6 months ahead with the candidate.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text>Best regards,</Text>
            <Text>Yours Faithfully,</Text>
            <Text>For <Text style={styles.textBold}>NOVEM CONTROLS</Text></Text>
            <Image src={signature} style={styles.signature} />
          </View>
        </View>
      </Page>
    </Document >
  );
}

export default MyDocument;