import { Request } from "./request";
import { UI } from "./ui";

//Elementleri seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateButton = document.getElementById("update");

//Nesneleri oluşturma
const request = new Request("http://localhost:3000/employee/");
const ui = new UI();

//güncelleme bilgilerini tutan değişken (state)
let updateState = null;

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeesList.addEventListener("click", updateOrDelete);
    updateButton.addEventListener("click", updateEmployee);
}

function getAllEmployees() { //tüm çalışanları arayüze ekleyen fonksiyona gönderir
    request.get()
        .then(employees => ui.addAllEmployeesToUI(employees))
        .catch(err => console.log(err));
}

function addEmployee(e) { //Yeni eklenen elemanı json a ve arayüze ekler
    const name = nameInput.value;
    const department = departmentInput.value;
    const salary = salaryInput.value;

    if (name === "" || department === "" || salary === "") {
        alert("Lütfen tüm alanları doldurunuz !");
    } else {
        ui.clearInputs(); //input alanını temizleme
        request.post({ name: name, department: department, salary: Number(salary) })
            .then(employee => ui.addEmployeeToUI(employee))
            .catch(err => console.log(err));
    }

    e.preventDefault();
}

function updateOrDelete(e) {//Çalışan listesinide hangi seçim yapıldığını dinler
    const targetElement = e.target;
    //console.log(targetElement);

    if (targetElement.id === "update-employee") {
        updateEmployeeController(targetElement);

    } else if (targetElement.id === "delete-employee") {
        deleteEmployee(targetElement);
    }
}

function deleteEmployee(targetEmployee) { //çalışanı arayüzden ve emloyee.json dan silen fonksiyon
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
        .then(response => {
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
        }).catch(err => console.log(err));
}

function updateEmployeeController(targetEmployee) { //güncelleme işlemlerini yöneten fonksiyon
    ui.toggleUpdateButton(targetEmployee);
    const element = targetEmployee.parentElement.parentElement; //<tr>
    if (updateState === null) {
        updateState = {
            updateId: element.children[3].textContent,
            updateParent: element
        };
    } else {
        updateState = null;
    }

}

function updateEmployee(e) {//seçili satırı güncelleyen fonksiyon
    const data = {
        name: nameInput.value.trim(),
        department: departmentInput.value.trim(),
        salary: Number(salaryInput.value.trim())
    };
    request.put(updateState.updateId, data)
        .then(updateEmployee => {
            ui.updateEmployeeOnUI(updateState.updateParent, updateEmployee);
        })
}


