// SmartSpend Charts JavaScript - Large Pie Chart, No Legend

let categoryChart = null;
let weeklyChart = null;

// Main function to load all analytics
function loadAnalytics() {
    console.log('Loading analytics with large pie chart...');
    
    setTimeout(() => {
        try {
            createCategoryChart();
            createWeeklyChart();
            loadBudgetBars();
        } catch (error) {
            console.error('Error in loadAnalytics:', error);
        }
    }, 200);
}

// Create large pie chart WITHOUT legend
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) {
        console.error('categoryChart canvas not found');
        return;
    }

    // Destroy existing chart
    if (categoryChart) {
        categoryChart.destroy();
        categoryChart = null;
    }

    // Check if we have data
    if (!window.sampleData || !window.sampleData.categories) {
        console.error('sampleData not available');
        return;
    }

    // Get categories with spending
    const categoriesWithSpending = window.sampleData.categories.filter(cat => cat.spent > 0);
    
    if (categoriesWithSpending.length === 0) {
        ctx.parentElement.innerHTML = `
            <div style="text-align: center; color: #FFFFFF; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1.5rem;">📊</div>
                <div style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.8rem;">No spending data yet</div>
                <div style="font-size: 1rem; opacity: 0.8;">Simulate a payment to see your breakdown</div>
            </div>
        `;
        return;
    }

    // Restore canvas if it was replaced
    if (!document.getElementById('categoryChart')) {
        ctx.parentElement.innerHTML = '<canvas id="categoryChart"></canvas>';
    }

    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;

    // Create large pie chart with NO legend
    categoryChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: categoriesWithSpending.map(cat => cat.name),
            datasets: [{
                data: categoriesWithSpending.map(cat => cat.spent),
                backgroundColor: categoriesWithSpending.map(cat => cat.color),
                borderColor: '#2A2A2A',
                borderWidth: 4,
                hoverOffset: 15,
                hoverBorderWidth: 5,
                hoverBorderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 10  // Reduced padding for larger chart
            },
            plugins: {
                legend: {
                    display: false  // REMOVE LEGEND COMPLETELY
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    borderWidth: 1,
                    cornerRadius: 15,
                    padding: 20,
                    titleFont: {
                        size: 18,
                        weight: '700'
                    },
                    bodyFont: {
                        size: 16,
                        weight: '600'
                    },
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            const index = context[0].dataIndex;
                            const category = categoriesWithSpending[index];
                            return `${category.icon} ${category.name}`;
                        },
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return [
                                `Amount: ₹${value.toLocaleString()}`,
                                `Percentage: ${percentage}%`
                            ];
                        }
                    }
                }
            },
            cutout: '55%',  // Slightly smaller cutout for better proportion
            animation: {
                animateRotate: true,
                duration: 1800,
                easing: 'easeOutCubic'
            },
            interaction: {
                intersect: false,
                mode: 'nearest'
            },
            elements: {
                arc: {
                    borderJoinStyle: 'round'
                }
            }
        }
    });

    console.log('Large pie chart created without legend');
}

// Create enhanced weekly spending bar chart
function createWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx || !window.sampleData) return;

    // Destroy existing chart
    if (weeklyChart) {
        weeklyChart.destroy();
        weeklyChart = null;
    }

    // Create sophisticated gradient
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');

    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: window.sampleData.weeklyData.map(d => d.day),
            datasets: [{
                label: 'Daily Spending',
                data: window.sampleData.weeklyData.map(d => d.amount),
                backgroundColor: gradient,
                borderColor: '#3B82F6',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
                hoverBorderColor: '#1D4ED8',
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 15
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    cornerRadius: 12,
                    padding: 15,
                    titleFont: { size: 16, weight: '700' },
                    bodyFont: { size: 14, weight: '600' },
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return `Spent: ₹${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { 
                        display: false 
                    },
                    ticks: { 
                        color: '#FFFFFF', 
                        font: { 
                            size: 14, 
                            weight: '600' 
                        } 
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false 
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: { 
                            size: 14,
                            weight: '600'
                        },
                        callback: value => '₹' + value,
                        padding: 10
                    },
                    border: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeOutCubic'
            }
        }
    });

    console.log('Enhanced weekly chart created');
}

// Keep original budget bars exactly as they were
function loadBudgetBars() {
    const budgetBarsContainer = document.getElementById('budgetBars');
    if (!budgetBarsContainer || !window.sampleData) return;
    
    budgetBarsContainer.innerHTML = '';
    
    window.sampleData.categories.forEach(category => {
        const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
        const isOverBudget = category.spent > category.budget;
        const isNearLimit = percentage > 80 && !isOverBudget;
        
        let fillColor = category.color;
        let statusText = 'Well within budget';
        let warningIcon = '';
        
        if (isOverBudget) {
            fillColor = '#EF4444';
            statusText = 'Over budget!';
            warningIcon = ' ⚠️';
        } else if (isNearLimit) {
            fillColor = '#F59E0B';
            statusText = 'Near limit';
            warningIcon = ' ⚡';
        } else if (percentage > 60) {
            statusText = 'On track';
            warningIcon = ' 📊';
        } else if (percentage > 0) {
            statusText = 'Good progress';
            warningIcon = ' ✅';
        } else {
            statusText = 'No spending yet';
            warningIcon = ' 💤';
        }
        
        const budgetBarDiv = document.createElement('div');
        budgetBarDiv.className = 'budget-bar';
        
        budgetBarDiv.innerHTML = `
            <div class="budget-header">
                <div class="budget-category">
                    <span>${category.icon}</span>
                    <span>${category.name}${warningIcon}</span>
                </div>
                <div class="budget-amount">
                    ₹${category.spent.toLocaleString()} / ₹${category.budget.toLocaleString()}
                </div>
            </div>
            <div class="budget-progress">
                <div class="budget-fill" style="width: ${Math.min(percentage, 100)}%; background-color: ${fillColor}; transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);"></div>
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #6B7280; display: flex; justify-content: space-between;">
                <span>${percentage.toFixed(1)}% used</span>
                <span>${statusText}</span>
            </div>
        `;
        
        budgetBarsContainer.appendChild(budgetBarDiv);
    });

    console.log('Original budget bars preserved');
}

// Update charts when data changes
function updateCharts() {
    console.log('Updating large pie chart...');
    
    if (window.calculateCategorySpending) {
        window.calculateCategorySpending();
    }
    
    // Only reload if analytics tab is active
    const analyticsTab = document.getElementById('analytics');
    if (analyticsTab && analyticsTab.classList.contains('active')) {
        loadAnalytics();
    }
}

// Export functions to global scope
window.loadAnalytics = loadAnalytics;
window.updateCharts = updateCharts;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Large Pie Chart.js loaded');
    
    // Set Chart.js defaults
    if (window.Chart) {
        Chart.defaults.font.family = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
        Chart.defaults.font.size = 14;
        Chart.defaults.color = '#FFFFFF';
        Chart.defaults.font.weight = '600';
        console.log('Chart.js configured for large pie chart display');
    }
    
    // Auto-load if analytics tab is already active
    setTimeout(() => {
        const analyticsTab = document.getElementById('analytics');
        if (analyticsTab && analyticsTab.classList.contains('active')) {
            loadAnalytics();
        }
    }, 500);
});

// Debug function
window.debugCharts = function() {
    console.log('=== LARGE PIE CHART DEBUG ===');
    console.log('Chart.js available:', !!window.Chart);
    console.log('sampleData available:', !!window.sampleData);
    console.log('categoryChart instance:', !!categoryChart);
    console.log('Legend: DISABLED (display: false)');
    console.log('Padding: Reduced to 10px for larger chart');
    console.log('Chart takes full container space');
    
    if (window.sampleData && window.sampleData.categories) {
        const spending = window.sampleData.categories.filter(c => c.spent > 0);
        console.log('Categories with spending:', spending.length);
        spending.forEach(cat => console.log(`- ${cat.icon} ${cat.name}: ₹${cat.spent}`));
    }
};