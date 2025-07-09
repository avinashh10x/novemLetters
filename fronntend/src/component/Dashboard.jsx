import React, { useEffect, useState, useRef } from 'react';
import { fetchDashboardData } from '../services/LetterServices';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [data, setData] = useState({
        totalLetters: 0,
        totalColleges: 0,
        totalCourses: 0,
        collegeCourseData: [],
        categoryData: []
    });
    const [chartOptions, setChartOptions] = useState(null);
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchDashboardData();
            setData(result);
        };
        getData();
    }, []);

    useEffect(() => {
        const updateChartOptions = () => {
            const isMobile = window.innerWidth < 768;
            const isSmallMobile = window.innerWidth < 480;

            setChartOptions({
                bar: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'center',
                            labels: {
                                boxWidth: isMobile ? 8 : 12,
                                padding: isMobile ? 10 : 15,
                                font: {
                                    size: isMobile ? 10 : 12,
                                    weight: 'bold'
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Letters Distribution by College and Course',
                            font: {
                                size: isMobile ? 14 : 18,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10,
                                bottom: isMobile ? 10 : 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: isMobile ? 8 : 12,
                            titleFont: {
                                size: isMobile ? 12 : 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: isMobile ? 11 : 13
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: false,
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: isMobile ? 9 : 12
                                },
                                maxRotation: isMobile ? 90 : 45,
                                minRotation: isMobile ? 90 : 45,
                                padding: isMobile ? 5 : 10,
                                maxTicksLimit: isSmallMobile ? 5 : isMobile ? 8 : 12
                            }
                        },
                        y: {
                            stacked: false,
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: isMobile ? 9 : 12
                                },
                                stepSize: 1,
                                padding: isMobile ? 5 : 10,
                                maxTicksLimit: isMobile ? 5 : 8
                            }
                        }
                    }
                },
                pie: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: isMobile ? 'bottom' : 'right',
                            align: 'center',
                            labels: {
                                boxWidth: isMobile ? 8 : 12,
                                padding: isMobile ? 10 : 15,
                                font: {
                                    size: isMobile ? 10 : 12,
                                    weight: 'bold'
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Letters Distribution by Course',
                            font: {
                                size: isMobile ? 14 : 18,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10,
                                bottom: isMobile ? 10 : 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: isMobile ? 8 : 12,
                            titleFont: {
                                size: isMobile ? 12 : 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: isMobile ? 11 : 13
                            },
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        };

        // Initial setup
        updateChartOptions();

        // Add resize observer
        const resizeObserver = new ResizeObserver(() => {
            updateChartOptions();
        });

        if (chartContainerRef.current) {
            resizeObserver.observe(chartContainerRef.current);
        }

        // Add window resize listener
        window.addEventListener('resize', updateChartOptions);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateChartOptions);
        };
    }, []);

    // Generate colors for courses
    const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 137.508) % 360;
            colors.push(`hsla(${hue}, 70%, 60%, 0.8)`);
        }
        return colors;
    };

    const barData = {
        labels: data.collegeCourseData.map(item => item.college),
        datasets: data.collegeCourseData[0]?.courses.map((course, index) => ({
            label: course.name,
            data: data.collegeCourseData.map(item =>
                item.courses.find(c => c.name === course.name)?.count || 0
            ),
            backgroundColor: generateColors(data.collegeCourseData[0]?.courses.length)[index],
            borderColor: 'white',
            borderWidth: 1
        })) || []
    };

    const pieData = {
        labels: data.categoryData.map(item => item.category || 'Unknown Course'),
        datasets: [{
            data: data.categoryData.map(item => item.count),
            backgroundColor: generateColors(data.categoryData.length),
            borderColor: 'white',
            borderWidth: 2,
            hoverOffset: 4
        }]
    };

    return (
        <div className="dashboard" ref={chartContainerRef}>
            <div className="cards">
                <div className="card">
                    <h3>Total Letters</h3>
                    <div className="number">{data.totalLetters}</div>
                </div>
                <div className="card">
                    <h3>Total Colleges</h3>
                    <div className="number">{data.totalColleges}</div>
                </div>
                <div className="card">
                    <h3>Total Courses</h3>
                    <div className="number">{data.totalCourses}</div>
                </div>
            </div>
            <div className="charts">
                <div className="chart-container">
                    {chartOptions && <Bar options={chartOptions.bar} data={barData} />}
                </div>
                <div className="chart-container">
                    {chartOptions && <Pie options={chartOptions.pie} data={pieData} />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;