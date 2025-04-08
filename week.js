const ctx = document.getElementById('weeklyChart').getContext('2d');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const data = {
    labels: weekdays,
    datasets: [{
        label: 'Tasks Completed (%)',
        data: Array(7).fill(0),
        backgroundColor: '#f06292',
        borderRadius: 5,
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'Completion (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Days of the Week'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Weekly Goal Completion Overview'
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
};

const weeklyChart = new Chart(ctx, config);

function updateChart() {

    const percentages = weekdays.map(day => {
        const checkboxes = document.querySelectorAll(`input.goal[data-day="${day}"]`);
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        return (checkedCount / 3) * 100;
    });

    weeklyChart.data.datasets[0].data = percentages;
    weeklyChart.update();
}


document.querySelectorAll('.goal').forEach(cb => {
    cb.addEventListener('change', updateChart);
});