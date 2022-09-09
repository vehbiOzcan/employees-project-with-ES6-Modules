export class UI {
    constructor() {
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.employeeList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
    }

    addAllEmployeesToUI(employees) { //tüm elemanları tabloya ekleme

        //Listenin yapısı:
        // <tr>
        //     <td>Mustafa Murat Coşkun</td>
        //     <td>Bilişim</td>
        //     <td>4000</td>
        //     <td>1</td>
        //     <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
        //     <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
        // </tr>

        let table = "";

        employees.forEach(employee => {
            table += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
            </tr>
            `;
        });

        this.employeeList.innerHTML = table;
    }

    addEmployeeToUI(employee) { //Tek elemanı tabloya ekleme
        console.log(employee);
        let row = `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
            </tr>
        `;

        this.employeeList.innerHTML += row;
    }

    deleteEmployeeFromUI(element) { //seçili elemanı tablodan silme
        element.remove();
    }

    toggleUpdateButton(target) { //güncelleme butonlarının görünümünü değiştirir
        if (this.updateButton.style.display === "none") {
            this.updateButton.style.display = "block";
            target.classList = "btn btn-primary";
            target.textContent = "İptal Et";
            this.addAllEmployeeInfoToInputs(target);
        } else {
            this.updateButton.style.display = "none";
            target.classList = "btn btn-danger";
            target.textContent = "Güncelle";
            this.clearInputs();
        }
    }

    addAllEmployeeInfoToInputs(target) { //tabloda seçilen elemanın bilgilerini input alanına ekler
        const children = target.parentElement.parentElement.children; //(target = güncelle butonu) tr içindeki çocukları aldık

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }

    updateEmployeeOnUI(updateParent, updateEmployee) { //Güncellenen elemanın bilgilerini tabloda da güncelleme
        updateParent.innerHTML = `
            <tr>
                <td>${updateEmployee.name}</td>
                <td>${updateEmployee.department}</td>
                <td>${updateEmployee.salary}</td>
                <td>${updateEmployee.id}</td>
                <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
            </tr>
        `;
        this.clearInputs();
        this.updateButton.style.display = "none";
    }

    clearInputs() {//input alanlarını temizleme
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }

}