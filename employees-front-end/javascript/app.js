const submit_btn = document.querySelector(".submit-btn");
window.onload = async () => {
    const employees = await get_employees();
    console.log(employees);  // Check the data in the console
    display_employees(employees);  // Display employees on the webpage
};

const get_employees = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/v1/employees');
        if (!response.ok) {
            console.error('Failed to fetch employees:', response.statusText);
            return [];
        }
        const data = await response.json();
        return data.employees || [];
    } catch (error) {
        console.error('Error while fetching employees:', error);
        return [];
    }
};

const display_employees = async()=>{
    document.querySelector(".company-employees").innerHTML = ""
    const response = await fetch('http://localhost:4000/api/v1/employees')
    const data = await response.json()
    console.log(data.employees_list)
    if(data.employees_list && data.employees_list.length > 0){

        const employeeTable = document.createElement("table");
        const header_row = document.createElement("tr");  
        header_row.innerHTML = `
        <th>ID</th>
        <th>Name</th>
        <th>Position</th>
        <th>national_id</th>
        <th>bank_account_number</th>
        <th>bank_name</th>
          <th>Controls</th>
        
        
        `       
        employeeTable.appendChild(header_row)

        data.employees_list.forEach((employee, index)=>{
            const data_row = document.createElement("tr");
            data_row.innerHTML = `
              <td>${index + 1}</td>  
              <td>${employee.first_name} ${employee.second_name}</td> 
              <td>${employee.role}</td> 
              <td>${employee.national_id}</td> 
              <td>${employee.bank_account_number}</td> 
              <td>${employee.bank_name}</td> 
              <td><button class="btn btn-primary edit-employee-btn">Edit</button>  <button class="btn btn-primary delete-employee-btn" style= "margin-left: 1em">Delete</button></td> 

            `
            const delete_employee_btn =  data_row.querySelector(".delete-employee-btn")
            const edit_employee_btn =  data_row.querySelector(".edit-employee-btn")

            delete_employee_btn.addEventListener("click",  async()=>{
                console.log(`deleting ${employee.first_name}...`)
                const response = await fetch(`http://localhost:4000/api/v1/employees/${employee._id}`,{
                    method: 'DELETE'
                })
                if(response.ok){
                    console.log(`deleting......${employee.first_name}`)
                    alert(` ${employee.first_name} deleted succesfully`)
                    display_employees()

                }
            })

            
            edit_employee_btn.addEventListener("click", async()=>{
                console.log(`editing ${employee.first_name}`)
                const response = await fetch(`http://localhost:4000/api/v1/employees/${employee._id}`,{
                    method:'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(create_employee),
                })
                if(response.ok){
                    const update_employee = await response.json()
                   
                }
            })
            employeeTable.appendChild(data_row)
        })
        document.querySelector(".company-employees").appendChild(employeeTable)
    }
    
}



const create_employee = async () => {
    try {
        const first_name= document.getElementById("first-name-input").value;
        const second_name = document.getElementById("second-name-input").value;
        const employee_id = document.getElementById("employee-id").value;
        const national_id = document.getElementById("national-id").value;
        const role = document.getElementById("role").value;
        const bank_account_number = document.getElementById("bank-account").value;
        const bank_name = document.getElementById("bank").value;
        // ... (existing form input retrieval)

        if (!first_name || !second_name || !employee_id || !national_id ||!role || !bank_account_number || !bank_name) {
            alert('Please fill in all required fields.');
            return;
        }

        const employee = {
                first_name,
                second_name,
                employee_id,
                national_id,
                role,
                bank_account_number,
                bank_name,
        };

        const response = await fetch('http://localhost:4000/api/v1/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee),
        });

        if (response.ok) {
            const new_employee = await response.json();
            console.log('Employee created:', new_employee);
            alert('Employee created successfully!');
            display_employees(); // Refresh the employee list
        } else {
            console.error('Failed to add task:', response.statusText);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('An unexpected error occurred. Please contact support.');
    }
};
submit_btn.addEventListener('click', () => {
    console.log('clicked');
    create_employee();
});

