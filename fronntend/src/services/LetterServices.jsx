import axios from "axios";

// const API_URL = `${import.meta.env.API_URL}/api/`;
// const API_URL = 'https://novemconfirmationletter.onrender.com/api'
const API_URL = 'http://localhost:3000/api'


//  Get all Letters
const getAllLetters = async (page = 1, limit = 6) => {
    try {
        const response = await axios.get(`${API_URL}/getAllLetters?page=${page}&limit=${limit}`);
        console.log('from services', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching letters:", error);
        throw error;
    }
};




//  Create a new Letter
const createLetter = async (letterData) => {
    try {
        const response = await axios.post(`${API_URL}/letterCreate`, letterData);
        console.log("from services", response.data);

        return response.data.letter;
    } catch (error) {
        console.error("Error creating letter:", error);
        throw error;
    }
};

const getSearchedLetter = async (searchTerm1, searchTerm2) => {
    try {
        const response = await axios.post(`${API_URL}/getSearchedLetter`, {
            queryValue1: searchTerm1,
            queryValue2: searchTerm2
        });

        console.log(response.data);


        return response.data.letter;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn("No letter found.");
            return []; // Return empty array instead of throwing an error
        }
        console.error("Error fetching letter:", error);
        throw error; // Rethrow other errors
    }
};


const updateLetter = async (letterData) => {
    try {
        const response = await axios.put(`${API_URL}/updateLetter`, letterData);
        return response.data.letter;
    } catch (error) {
        console.error("Error updating letter:", error);
        throw error;
    }
};

// Delete a Letter by ReferenceNo
const deleteLetter = async (referenceNo) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteLetter`, { data: { ReferenceNo: referenceNo } });
        console.log("from services", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting letter:", error);
        throw error;
    }
};

const getCollageNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllColleges`);
        return response.data;
    } catch (error) {
        console.error("Error fetching college names:", error);
        throw error;
    }
};

const getCourseNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllCourses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course names:", error);
        throw error;
    }
};

const saveCollageName = async (collegeDetails) => {
    try {
        const response = await axios.post(`${API_URL}/savecollage`, collegeDetails);
        return response.data;
    } catch (error) {
        console.error("Error saving college name:", error);
        throw error;
    }
};



// Upload Excel file for bulk letter generation
const uploadExcelFile = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload-excel`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading Excel file:", error);
        throw error;
    }
};

const fetchDashboardData = async () => {
    try {
        const [lettersResponse, collegesResponse, coursesResponse] = await Promise.all([
            axios.get(`${API_URL}/getAllLetters?page=1&limit=1000`),
            axios.get(`${API_URL}/getAllColleges`),
            axios.get(`${API_URL}/getAllCourses`)
        ]);

        const letters = lettersResponse.data.letters || [];
        const colleges = collegesResponse.data.collageNames || [];
        const courses = coursesResponse.data.courseNames || [];

        // Calculate letters per college and course
        const collegeCourseData = colleges.map(college => {
            const collegeLetters = letters.filter(letter => letter.collegeName === college);
            const courseCounts = courses.map(course => ({
                name: course,
                count: collegeLetters.filter(letter => letter.courseName === course).length
            }));

            return {
                college,
                courses: courseCounts 
            };
        });

        // Calculate category data (letters per course)
        const categoryData = letters.reduce((acc, letter) => {
            const course = letter.courseName || 'Unknown Course';
            if (!acc[course]) {
                acc[course] = 0;
            }
            acc[course]++;
            return acc;
        }, {});

        // Sort category data by count in descending order
        const sortedCategoryData = Object.entries(categoryData)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => ({
                category,
                count
            }));

        return {
            totalLetters: letters.length,
            totalColleges: colleges.length,
            totalCourses: courses.length,
            collegeCourseData,
            categoryData: sortedCategoryData
        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return {
            totalLetters: 0,
            totalColleges: 0,
            totalCourses: 0,
            collegeCourseData: [],
            categoryData: []
        };
    }
};

export {
    getAllLetters,
    createLetter,
    getSearchedLetter,
    updateLetter,
    deleteLetter,
    getCollageNames,
    getCourseNames,
    saveCollageName,
    uploadExcelFile,
    fetchDashboardData
};