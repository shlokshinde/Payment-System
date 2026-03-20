// Employee Payment Management System - JavaScript Logic

// Database Key for localStorage
const DB_KEY = 'employeePayments';

// Initialize the database
let employees = [];

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    displayEmployees();
    updateSummaryCards();
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('paymentDate').value = today;
    
    // Add form submit event listener
    document.getElementById('employeeForm').addEventListener('submit', addEmployee);
    
    // Add edit form submit event listener
    document.getElementById('editForm').addEventListener('submit', updateEmployee);
    
    // Add search input event listener
    document.getElementById('searchInput').addEventListener('keyup', searchEmployees);
    document.getElementById('filterDepartment').addEventListener('change', searchEmployees);
});

// Load data from localStorage
function loadFromLocalStorage() {
    const storedData = localStorage.getItem(DB_KEY);
    if (storedData) {
        employees = JSON.parse(storedData);
    } else {
        // Add sample data if no data exists
        employees = getSampleData();
        saveToLocalStorage();
    }
}

// Get sample data for demonstration
function getSampleData() {
    return [
        // Get sample data for demonstration
function getSampleData() {
    return [
        {
            id: 'EMP001',
            name: 'Aarav Sharma',
            department: 'IT',
            designation: 'Senior Software Engineer',
            basicSalary: 85000,
            bonus: 10000,
            deductions: 5000,
            netSalary: 90000,
            paymentDate: '2024-03-15',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'EMP002',
            name: 'Priya Patel',
            department: 'HR',
            designation: 'HR Manager',
            basicSalary: 75000,
            bonus: 8000,
            deductions: 4000,
            netSalary: 79000,
            paymentDate: '2024-03-15',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'EMP003',
            name: 'Rahul Verma',
            department: 'Finance',
            designation: 'Finance Analyst',
            basicSalary: 65000,
            bonus: 6000,
            deductions: 3500,
            netSalary: 67500,
            paymentDate: '2024-03-16',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'EMP004',
            name: 'Neha Gupta',
            department: 'Marketing',
            designation: 'Marketing Manager',
            basicSalary: 70000,
            bonus: 7000,
            deductions: 4000,
            netSalary: 73000,
            paymentDate: '2024-03-16',
            paymentMethod: 'Check'
        },
        {
            id: 'EMP005',
            name: 'Vikram Singh',
            department: 'Operations',
            designation: 'Operations Head',
            basicSalary: 90000,
            bonus: 12000,
            deductions: 6000,
            netSalary: 96000,
            paymentDate: '2024-03-17',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'EMP006',
            name: 'Anjali Nair',
            department: 'IT',
            designation: 'Frontend Developer',
            basicSalary: 55000,
            bonus: 5000,
            deductions: 3000,
            netSalary: 57000,
            paymentDate: '2024-03-17',
            paymentMethod: 'Bank Transfer'
        }
    ];
 }
    ];
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem(DB_KEY, JSON.stringify(employees));
}

// Add new employee
function addEmployee(event) {
    event.preventDefault();
    
    // Get form values
    const empId = document.getElementById('empId').value.trim();
    const empName = document.getElementById('empName').value.trim();
    const empDepartment = document.getElementById('empDepartment').value;
    const empDesignation = document.getElementById('empDesignation').value.trim();
    const empSalary = parseFloat(document.getElementById('empSalary').value);
    const empBonus = parseFloat(document.getElementById('empBonus').value) || 0;
    const empDeductions = parseFloat(document.getElementById('empDeductions').value) || 0;
    const paymentDate = document.getElementById('paymentDate').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    // Validate form
    if (!empId || !empName || !empDepartment || !empDesignation || !empSalary || !paymentDate || !paymentMethod) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if employee ID already exists
    if (employees.some(emp => emp.id === empId)) {
        alert('Employee ID already exists!');
        return;
    }
    
    // Calculate net salary
    const netSalary = empSalary + empBonus - empDeductions;
    
    // Create employee object
    const employee = {
        id: empId,
        name: empName,
        department: empDepartment,
        designation: empDesignation,
        basicSalary: empSalary,
        bonus: empBonus,
        deductions: empDeductions,
        netSalary: netSalary,
        paymentDate: paymentDate,
        paymentMethod: paymentMethod
    };
    
    // Add to employees array
    employees.push(employee);
    
    // Save to localStorage
    saveToLocalStorage();
    
    // Reset form
    document.getElementById('employeeForm').reset();
    
    // Set default date again
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('paymentDate').value = today;
    
    // Refresh display
    displayEmployees();
    updateSummaryCards();
    
    alert('Employee payment record added successfully!');
}

// Display employees in table
function displayEmployees(filteredEmployees = null) {
    const tableBody = document.getElementById('employeeTableBody');
    const employeesToDisplay = filteredEmployees || employees;
    
    if (employeesToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="11" class="empty-state">No employee records found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = '';
    
    employeesToDisplay.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
     <td>${emp.id}</td>
     <td>${emp.name}</td>
     <td>${emp.department}</td>
     <td>${emp.designation}</td>
     <td>${formatIndianRupee(emp.basicSalary)}</td>
     <td>${formatIndianRupee(emp.bonus)}</td>
     <td>${formatIndianRupee(emp.deductions)}</td>
     <td><strong>${formatIndianRupee(emp.netSalary)}</strong></td>
     <td>${formatDate(emp.paymentDate)}</td>
     <td>${emp.paymentMethod}</td>
     <td>
        <button onclick="editEmployee('${emp.id}')" class="btn-edit">Edit</button>
        <button onclick="deleteEmployee('${emp.id}')" class="btn-delete">Delete</button>
    </td>
`;
        tableBody.appendChild(row);
    });
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format number to Indian Rupee style with commas (₹50,000 instead of ₹50000)
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Update summary cards
function updateSummaryCards() {
    const totalEmployees = employees.length;
    const totalSalary = employees.reduce((sum, emp) => sum + emp.netSalary, 0);
    const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;
    
    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('totalSalary').textContent = formatIndianRupee(totalSalary);
    document.getElementById('avgSalary').textContent = formatIndianRupee(avgSalary);
}

// Search employees
function searchEmployees() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterDept = document.getElementById('filterDepartment').value;
    
    let filtered = employees;
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(emp => 
            emp.id.toLowerCase().includes(searchTerm) ||
            emp.name.toLowerCase().includes(searchTerm) ||
            emp.department.toLowerCase().includes(searchTerm) ||
            emp.designation.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply department filter
    if (filterDept) {
        filtered = filtered.filter(emp => emp.department === filterDept);
    }
    
    displayEmployees(filtered);
}

// Reset search
function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterDepartment').value = '';
    displayEmployees();
}

// Edit employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;
    
    // Fill edit form with employee data
    document.getElementById('editEmpId').value = employee.id;
    document.getElementById('editEmpName').value = employee.name;
    document.getElementById('editEmpDepartment').value = employee.department;
    document.getElementById('editEmpDesignation').value = employee.designation;
    document.getElementById('editEmpSalary').value = employee.basicSalary;
    document.getElementById('editEmpBonus').value = employee.bonus;
    document.getElementById('editEmpDeductions').value = employee.deductions;
    document.getElementById('editPaymentDate').value = employee.paymentDate;
    document.getElementById('editPaymentMethod').value = employee.paymentMethod;
    
    // Show modal
    document.getElementById('editModal').style.display = 'block';
}

// Update employee
function updateEmployee(event) {
    event.preventDefault();
    
    const empId = document.getElementById('editEmpId').value;
    const empName = document.getElementById('editEmpName').value.trim();
    const empDepartment = document.getElementById('editEmpDepartment').value;
    const empDesignation = document.getElementById('editEmpDesignation').value.trim();
    const empSalary = parseFloat(document.getElementById('editEmpSalary').value);
    const empBonus = parseFloat(document.getElementById('editEmpBonus').value) || 0;
    const empDeductions = parseFloat(document.getElementById('editEmpDeductions').value) || 0;
    const paymentDate = document.getElementById('editPaymentDate').value;
    const paymentMethod = document.getElementById('editPaymentMethod').value;
    
    // Validate form
    if (!empName || !empDepartment || !empDesignation || !empSalary || !paymentDate || !paymentMethod) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate net salary
    const netSalary = empSalary + empBonus - empDeductions;
    
    // Find employee index
    const index = employees.findIndex(emp => emp.id === empId);
    if (index !== -1) {
        // Update employee
        employees[index] = {
            ...employees[index],
            name: empName,
            department: empDepartment,
            designation: empDesignation,
            basicSalary: empSalary,
            bonus: empBonus,
            deductions: empDeductions,
            netSalary: netSalary,
            paymentDate: paymentDate,
            paymentMethod: paymentMethod
        };
        
        // Save to localStorage
        saveToLocalStorage();
        
        // Close modal
        closeModal();
        
        // Refresh display
        displayEmployees();
        updateSummaryCards();
        
        alert('Employee record updated successfully!');
    }
}

// Delete employee
function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee record?')) {
        employees = employees.filter(emp => emp.id !== id);
        saveToLocalStorage();
        displayEmployees();
        updateSummaryCards();
        alert('Employee record deleted successfully!');
    }
}

// Close modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Export data to CSV
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Department,Designation,Basic Salary,Bonus,Deductions,Net Salary,Payment Date,Payment Method\n";
    
    employees.forEach(emp => {
        csvContent += `${emp.id},${emp.name},${emp.department},${emp.designation},${emp.basicSalary},${emp.bonus},${emp.deductions},${emp.netSalary},${emp.paymentDate},${emp.paymentMethod}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employee_payments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to delete ALL employee records? This action cannot be undone!')) {
        employees = [];
        saveToLocalStorage();
        displayEmployees();
        updateSummaryCards();
        alert('All records have been deleted!');
    }
}

// Calculate statistics
function calculateStatistics() {
    if (employees.length === 0) return;
    
    const stats = {
        highestPaid: employees.reduce((max, emp) => emp.netSalary > max.netSalary ? emp : max),
        lowestPaid: employees.reduce((min, emp) => emp.netSalary < min.netSalary ? emp : min),
        departmentWise: {}
    };
    
    employees.forEach(emp => {
        if (!stats.departmentWise[emp.department]) {
            stats.departmentWise[emp.department] = {
                count: 0,
                totalSalary: 0
            };
        }
        stats.departmentWise[emp.department].count++;
        stats.departmentWise[emp.department].totalSalary += emp.netSalary;
    });
    
    console.log('Statistics:', stats);
    return stats;
}

// Add export button to the page
function addExportButtons() {
    const displaySection = document.querySelector('.display-section');
    const buttonDiv = document.createElement('div');
    buttonDiv.style.marginTop = '20px';
    buttonDiv.style.textAlign = 'right';
    
    buttonDiv.innerHTML = `
        <button onclick="exportToCSV()" class="btn-primary">Export to CSV</button>
        <button onclick="clearAllData()" class="btn-delete" style="margin-left: 10px;">Clear All Data</button>
    `;
    
    displaySection.appendChild(buttonDiv);
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    addExportButtons();
});