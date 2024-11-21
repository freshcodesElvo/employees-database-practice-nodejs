window.onload = async () => {
    const employees = await get_employees();
    console.log(employees);  // Check the data in the console
    display_employees(employees);  // Display employees on the webpage
};

const get_employees = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/employees');
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
    const response = await fetch('http://localhost:3000/api/v1/employees')
    const data = await response.json()
    console.log(data.employees_list)
    if(!data.employees_list.length == 0){
        document.querySelector(".company-employees").innerHTML = data.employees_list
        console.log(`${data.employees_list}`   )  
    }
    
}
