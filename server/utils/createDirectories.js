const fs = require('fs');
const path = require('path');

const createRequiredDirectories = () => {
    const directories = [
        'uploads',
        'temp',
        path.join('temp', 'NCPL'),
        path.join('temp', 'NCPL', getAcademicYear())
    ];

    directories.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Created directory: ${dirPath}`);
        }
    });
};

function getAcademicYear() {
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    return Month <= 3 ? `${Year - 1}-${Year}` : `${Year}-${Year + 1}`;
}

module.exports = createRequiredDirectories; 