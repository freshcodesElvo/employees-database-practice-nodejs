const Employee = require('../database-schema/employee-schema')


const get_all_employees = async (req, res)=>{
    try{
        const employees_list = await Employee.find({})
        res.status(200).json({employees_list})
    }catch(err){
        res.status(404).json({message: err})
    }
}
const create_an_employee = async (req, res)=>{
    try{
        const new_employee = await Employee.create(req.body);
        res.status(200).json({new_employee});
    }
    catch(err){
        res.status(404).json({massage: err})
    }
}



const get_a_spacific_employee = async (req, res)=>{
    try{
        const {id: specific_employee_id} = req.params; 
        const specific_employee = await Employee.findOne({_id: specific_employee_id})
        if(!specific_employee){
            return res.status(400).json({message: `no task with id ${specific_employee_id}` }) 
        }
        res.status(200).json({specific_employee})
    }                                                                           
    catch(err){
        res.status(404).json({massage: err})
    }
}

const update_a_spacific_employee =async (req, res)=>{
    try{
        const {specific_employee_id} = req.params;
        const specific_employee = await Employee.findOneAndUpdate({specific_employee_id});
        if(!specific_employee){
            return res.status(400).json({message: `no task with id ${specific_employee_id}` }) 
        }
        res.status(200).json({specific_employee})

    }
    catch(err){
        res.status(404).json({massage: err})
    }
    
}

const delete_a_spacific_employee = async (req, res)=>{
    try{
        const{id: specific_employee_id} = req.params;
        const pecific_employee = await Employee.findOneAndDelete({_id: specific_employee_id});
        if(!pecific_employee){
            return res.status(400).json({message: `no task with id ${specific_employee_id}` }) 
        }
        res.status(200).json({pecific_employee})
    }
    catch (error)
    {
        res.status(404).json({massage: error})

    }
}

module.exports= {get_all_employees, create_an_employee, get_a_spacific_employee, update_a_spacific_employee, delete_a_spacific_employee}