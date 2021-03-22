

// Events
// ========================================================================================
$('#btnSaveCustomer').click(function () {
    let cusID = $("#txtCustomerId").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalary").val();

    let res = saveCustomer(cusID, cusName, cusAddress, cusSalary);
    if(res)clearAllCustomerText();
});

//load all customers
$("#btnGetAll").click(function () {
    loadAllCustomerToTheTable();
});


$("#btnDeleteCustomer").click(function () {
    let cusID = $("#txtCustomerId").val();
    let option=confirm(`Do you want to delete ID:${cusID}`);
    if (option){
        let res=deleteCustomer(cusID);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});

$("#btnUpdateCustomer").click(function () {
    let cusID = $("#txtCustomerId").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalary").val();

    let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
       let res= updateCustomer(cusID, cusName, cusAddress, cusSalary);
       if (res){
           alert("Customer Updated");
       }else{
           alert("Update Faild");
       }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

$("#txtCustomerId").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#txtCustomerId").val(customer.getCustomerId());
            $("#txtCustomerName").val(customer.getCustomerName());
            $("#txtCustomerAddress").val(customer.getCustomerAddress());
            $("#txtCustomerSalary").val(customer.getCustomerSalary());
        } else {
            clearAllCustomerText();
        }
    }
});
// ==================================================================================

//Functions - CRUD operations
// save customer
function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);
    customerDB.push(customer);// customer aded

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

//get all customers
function getAllCustomers() {
    return customerDB;
}

//delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchCustomer(id) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerId() == id) return customerDB[i];
    }
    return null;
}


function updateCustomer(id, name, address, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerId();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);
    }
    $('#tblCustomer>tr').click(function () {
        let id=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let address=$(this).children('td:eq(2)').text();
        let salary=$(this).children('td:eq(3)').text();

        $("#txtCustomerId").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);


    });
}

function clearAllCustomerText() {
    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");
}

// Reg Ex
let cusIdRegEx = /^(C00-)[0-9]{1,3}$/;
let cusNameRegEx = /^[A-z| ]{5,20}$/;
let cusAddressRegEx = /^[A-z| |0-9|,]{5,}$/;
let cusSalaryRegEx = /^\d{1,7}(?:\.\d{0,2})?$/;

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('keyup', function (event) {
    let input1 = $('#txtCustomerId').val();
    let input2 = $('#txtCustomerName').val();
    let input3 = $('#txtCustomerAddress').val();
    let input4 = $('#txtCustomerSalary').val();

    if (cusIdRegEx.test(input1)) {
        $('#txtCustomerId').css('border', '2px solid green');
        $('#txtCustomerId').text("");
        if (event.key === "Enter") {
            $('#txtCustomerName').focus();
        }
        if (cusNameRegEx.test(input2)) {
            $('#txtCustomerName').css('border', '2px solid green');
            $('#lblCustomerName').text("");
            if (event.key === "Enter") {
                $('#txtCustomerAddress').focus();
            }
            if (cusAddressRegEx.test(input3)) {
                $('#txtCustomerAddress').css('border', '2px solid green');
                $('#lblCustomerAddress').text("");
                if (event.key === "Enter") {
                    $('#txtCustomerSalary').focus();
                }
                if (cusSalaryRegEx.test(input4)) {
                    $('#txtCustomerSalary').css('border', '2px solid green');
                    $('#lblCustomerSalary').text("");
                    enableButton();
                    if (event.key === "Enter") {
                        $('#btnCustomerAdd').click();
                        $('#txtCustomerId').focus();
                    }
                } else {
                    $('#txtCustomerSalary').css('border', '2px solid red');
                    $('#lblCustomerSalary').text("Required field. Pattern:-(100.00 or 100)");


                    disableButton();
                }
            } else {
                $('#txtCustomerAddress').css('border', '2px solid red');
                $('#lblCustomerAddress').text("Required field. Minimum 5");


                disableButton();
            }
        } else {
            $('#txtCustomerName').css('border', '2px solid red');
            $('#txtCustomerName').text("Required field. 5 to 20 characters Allowed.");


            disableButton();
        }
    } else {
        $('#txtCustomerId').css('border', '2px solid red');
        $('#txtCustomerId').text("Required field. Pattern:-(C00-000)");


        disableButton();
    }
});