// SmartSpend App JavaScript - Main App Logic

// Sample data with proper structure
const sampleData = {
    transactions: [
        {id: 1, amount: 245, merchant: "Domino's Pizza", category: "Food", date: "2025-09-22", time: "14:30", paymentApp: "Google Pay", location: "Near Campus Gate", note: "Lunch with friends", aiConfidence: 95, type: "expense"},
        {id: 2, amount: 50, merchant: "Auto Rickshaw", category: "Transportation", date: "2025-09-22", time: "09:15", paymentApp: "PhonePe", location: "University Road", note: "To college", aiConfidence: 88, type: "expense"},
        {id: 3, amount: 180, merchant: "Cafe Coffee Day", category: "Food", date: "2025-09-21", time: "16:45", paymentApp: "Google Pay", location: "City Mall", note: "Study session coffee", aiConfidence: 92, type: "expense"},
        {id: 4, amount: 1200, merchant: "Reliance Trends", category: "Shopping", date: "2025-09-20", time: "18:20", paymentApp: "Paytm", location: "Downtown Mall", note: "New shirt for interview", aiConfidence: 97, type: "expense"},
        {id: 5, amount: 35, merchant: "Photocopy Shop", category: "Education", date: "2025-09-20", time: "11:00", paymentApp: "BHIM", location: "College Campus", note: "Assignment printouts", aiConfidence: 85, type: "expense"},
        {id: 6, amount: 320, merchant: "PVR Cinemas", category: "Entertainment", date: "2025-09-19", time: "19:30", paymentApp: "Google Pay", location: "Phoenix Mall", note: "Movie with roommates", aiConfidence: 98, type: "expense"},
        {id: 7, amount: 150, merchant: "Medical Store", category: "Healthcare", date: "2025-09-18", time: "20:15", paymentApp: "PhonePe", location: "Near Hostel", note: "Fever medicine", aiConfidence: 94, type: "expense"}
    ],
    
    categories: [
        {name: "Food", budget: 3000, spent: 0, icon: "🍕", color: "#FF6B6B"},
        {name: "Transportation", budget: 800, spent: 0, icon: "🚗", color: "#4ECDC4"},
        {name: "Entertainment", budget: 1000, spent: 0, icon: "🎬", color: "#45B7D1"},
        {name: "Shopping", budget: 2000, spent: 0, icon: "🛍️", color: "#F59E0B"},
        {name: "Education", budget: 500, spent: 0, icon: "📚", color: "#8B5CF6"},
        {name: "Healthcare", budget: 300, spent: 0, icon: "💊", color: "#10B981"}
    ],
    
    userProfile: {
        name: "Arjun Kumar",
        college: "IIT Delhi",
        year: "3rd Year",
        course: "Computer Science Engineering",
        monthlyBudget: 8000,
        currentSpent: 0
    },
    
    weeklyData: [
        {day: "Mon", amount: 234},
        {day: "Tue", amount: 445},
        {day: "Wed", amount: 178},
        {day: "Thu", amount: 567},
        {day: "Fri", amount: 789},
        {day: "Sat", amount: 345},
        {day: "Sun", amount: 123}
    ]
};

// Global variables
let currentTransaction = null;
let isLoading = false;

// DOM Elements
const paymentNotification = document.getElementById('paymentNotification');
const categorizationModal = document.getElementById('categorizationModal');
const simulatePaymentBtn = document.getElementById('simulatePaymentBtn');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const dismissBtn = document.getElementById('dismissBtn');
const saveCategoryBtn = document.getElementById('saveCategoryBtn');
const closeNotificationBtn = document.getElementById('closeNotification');
const closeCategoryModalBtn = document.getElementById('closeCategoryModal');
const categoryFilter = document.getElementById('categoryFilter');
const budgetInput = document.getElementById('budgetInput');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    calculateCategorySpending();
    setupEventListeners();
    setupTabNavigation();
    loadDashboard();
    loadTransactions();
    updateBudgetInput();
}

// Calculate category spending from transactions
function calculateCategorySpending() {
    // Reset spending for all categories
    sampleData.categories.forEach(category => {
        category.spent = 0;
    });
    
    // Calculate spending from transactions
    sampleData.transactions.forEach(transaction => {
        const category = sampleData.categories.find(cat => cat.name === transaction.category);
        if (category && transaction.type === 'expense') {
            category.spent += transaction.amount;
        }
    });
    
    // Update total spending
    const totalSpent = sampleData.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    sampleData.userProfile.currentSpent = totalSpent;
}

// Event Listeners
function setupEventListeners() {
    // Simulate payment button
    simulatePaymentBtn.addEventListener('click', simulatePayment);
    
    // Notification buttons
    addCategoryBtn.addEventListener('click', showCategorizationModal);
    dismissBtn.addEventListener('click', dismissNotification);
    closeNotificationBtn.addEventListener('click', dismissNotification);
    
    // Modal buttons
    saveCategoryBtn.addEventListener('click', saveCategory);
    closeCategoryModalBtn.addEventListener('click', closeCategorizationModal);
    
    // Category selection buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterTransactions);
    }
    
    // Budget input
    if (budgetInput) {
        budgetInput.addEventListener('change', updateBudget);
    }
    
    // Close modal on overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeCategorizationModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!categorizationModal.classList.contains('hidden')) {
                closeCategorizationModal();
            }
            if (!paymentNotification.classList.contains('hidden')) {
                dismissNotification();
            }
        }
    });
}

// Tab Navigation
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isLoading) return;
            
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Load content based on tab
            if (targetTab === 'analytics') {
                // Load analytics with delay to ensure DOM is ready
                setTimeout(() => {
                    if (window.loadAnalytics) {
                        window.loadAnalytics();
                    }
                }, 100);
            }
        });
    });
}

// Simulate Payment Function
function simulatePayment() {
    if (isLoading) return;
    
    currentTransaction = {
        amount: 245,
        merchant: "Domino's Pizza",
        paymentApp: "Google Pay",
        location: "Near Campus Gate",
        time: new Date().toLocaleTimeString('en-IN', {hour12: true, hour: '2-digit', minute: '2-digit'})
    };
    
    showPaymentNotification();
}

function showPaymentNotification() {
    paymentNotification.classList.remove('hidden');
    
    // Auto-dismiss after 10 seconds if not interacted with
    setTimeout(() => {
        if (!paymentNotification.classList.contains('hidden')) {
            dismissNotification();
        }
    }, 10000);
}

function dismissNotification() {
    paymentNotification.classList.add('hidden');
}

function showCategorizationModal() {
    dismissNotification();
    categorizationModal.classList.remove('hidden');
    
    // Focus on the note input
    setTimeout(() => {
        const noteInput = document.getElementById('noteInput');
        if (noteInput) {
            noteInput.focus();
        }
    }, 100);
}

function closeCategorizationModal() {
    categorizationModal.classList.add('hidden');
    currentTransaction = null;
    
    // Clear the note input
    const noteInput = document.getElementById('noteInput');
    if (noteInput) {
        noteInput.value = '';
    }
}

function saveCategory() {
    if (isLoading) return;
    
    const selectedCategory = document.querySelector('.category-btn.active');
    const noteInput = document.getElementById('noteInput');
    
    if (!selectedCategory || !currentTransaction) {
        return;
    }
    
    isLoading = true;
    saveCategoryBtn.textContent = 'Saving...';
    saveCategoryBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        const newTransaction = {
            id: sampleData.transactions.length + 1,
            amount: currentTransaction.amount,
            merchant: currentTransaction.merchant,
            category: selectedCategory.getAttribute('data-category'),
            date: new Date().toISOString().split('T')[0],
            time: currentTransaction.time,
            paymentApp: currentTransaction.paymentApp,
            location: currentTransaction.location,
            note: noteInput ? noteInput.value || '' : '',
            aiConfidence: 95,
            type: 'expense'
        };
        
        // Add to transactions at the beginning
        sampleData.transactions.unshift(newTransaction);
        
        // Recalculate spending
        calculateCategorySpending();
        
        // Update displays
        loadDashboard();
        loadTransactions();
        
        // Show success message
        showSuccessMessage();
        
        // Reset and close
        isLoading = false;
        saveCategoryBtn.textContent = 'Save & Track';
        saveCategoryBtn.disabled = false;
        closeCategorizationModal();
        
    }, 800); // Simulate network delay
}

function showSuccessMessage(message = '✅ Transaction saved successfully!') {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// Load Dashboard
function loadDashboard() {
    calculateCategorySpending();
    
    // Update summary cards
    const totalSpent = sampleData.userProfile.currentSpent;
    const monthlyBudget = sampleData.userProfile.monthlyBudget;
    const budgetLeft = Math.max(0, monthlyBudget - totalSpent);
    
    // Find top spending category
    const topCategory = sampleData.categories
        .filter(cat => cat.spent > 0)
        .reduce((prev, current) => prev.spent > current.spent ? prev : current, {spent: 0, name: 'None', icon: '💰'});
    
    // Update card values
    updateElementText('totalSpentValue', `₹${totalSpent.toLocaleString()}`);
    updateElementText('budgetLeftValue', `₹${budgetLeft.toLocaleString()}`);
    updateElementText('topCategoryValue', topCategory.name);
    updateElementText('topCategorySubtitle', `₹${topCategory.spent.toLocaleString()} spent`);
    
    // Load recent transactions
    loadRecentTransactions();
}

function loadRecentTransactions() {
    const recentTransactionsContainer = document.getElementById('recentTransactions');
    if (!recentTransactionsContainer) return;
    
    const recentTransactions = sampleData.transactions.slice(0, 5);
    recentTransactionsContainer.innerHTML = '';
    
    if (recentTransactions.length === 0) {
        recentTransactionsContainer.innerHTML = '<p class="text-center" style="color: var(--text-secondary); padding: 2rem;">No transactions yet</p>';
        return;
    }
    
    recentTransactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        recentTransactionsContainer.appendChild(transactionElement);
    });
}

// Load All Transactions
function loadTransactions() {
    const allTransactionsContainer = document.getElementById('allTransactions');
    if (!allTransactionsContainer) return;
    
    allTransactionsContainer.innerHTML = '';
    
    if (sampleData.transactions.length === 0) {
        allTransactionsContainer.innerHTML = '<p class="text-center" style="color: var(--text-secondary); padding: 2rem;">No transactions to display</p>';
        return;
    }
    
    sampleData.transactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        allTransactionsContainer.appendChild(transactionElement);
    });
}

function createTransactionElement(transaction) {
    const category = sampleData.categories.find(cat => cat.name === transaction.category);
    const categoryIcon = category ? category.icon : '💰';
    const categoryColor = category ? category.color : '#6B7280';
    
    const transactionDiv = document.createElement('div');
    transactionDiv.className = 'transaction-item';
    
    transactionDiv.innerHTML = `
        <div class="transaction-icon" style="background: ${categoryColor}">
            ${categoryIcon}
        </div>
        <div class="transaction-details">
            <div class="transaction-merchant">${transaction.merchant}</div>
            <div class="transaction-meta">
                <span>${transaction.category}</span>
                <span>${formatDate(transaction.date)}</span>
                <span>📍 ${transaction.location}</span>
            </div>
        </div>
        <div class="transaction-amount ${transaction.type}">
            ${transaction.type === 'expense' ? '-' : '+'}₹${transaction.amount.toLocaleString()}
        </div>
    `;
    
    return transactionDiv;
}

function filterTransactions() {
    const selectedCategory = categoryFilter.value;
    const allTransactionsContainer = document.getElementById('allTransactions');
    if (!allTransactionsContainer) return;
    
    const filteredTransactions = selectedCategory === 'all' 
        ? sampleData.transactions 
        : sampleData.transactions.filter(t => t.category === selectedCategory);
    
    allTransactionsContainer.innerHTML = '';
    
    if (filteredTransactions.length === 0) {
        allTransactionsContainer.innerHTML = '<p class="text-center" style="color: var(--text-secondary); padding: 2rem;">No transactions found for this category</p>';
        return;
    }
    
    filteredTransactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        allTransactionsContainer.appendChild(transactionElement);
    });
}

function updateBudget() {
    const newBudget = parseInt(budgetInput.value);
    if (newBudget && newBudget >= 1000 && newBudget <= 50000) {
        sampleData.userProfile.monthlyBudget = newBudget;
        loadDashboard();
        showSuccessMessage('💰 Budget updated successfully!');
    } else {
        showSuccessMessage('⚠️ Please enter a valid budget between ₹1,000 - ₹50,000');
        budgetInput.value = sampleData.userProfile.monthlyBudget;
    }
}

function updateBudgetInput() {
    if (budgetInput) {
        budgetInput.value = sampleData.userProfile.monthlyBudget;
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-IN', { 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

function updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

// Export data for charts.js
window.sampleData = sampleData;
window.calculateCategorySpending = calculateCategorySpending;

// Initialize data on load
calculateCategorySpending();