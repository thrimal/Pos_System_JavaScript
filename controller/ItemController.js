
// Events
// save
$('#btnItemSave').click(function () {
        let itemCode=$('#txtItemCode').val();
        let itemName=$('#txtItemName').val();
        let qtyOnHand=$('#txtItemQty').val();
        let unitPrice=$('#txtItemPrice').val();
     

    let result = saveItem(itemCode, itemName, qtyOnHand, unitPrice);
    if(result)clearitem();
});

// update
$("#btnItemUpdate").click(function () {
    let itemCode=$('#txtItemCode').val();
        let itemName=$('#txtItemName').val();
        let qtyOnHand=$('#txtItemQty').val();
        let unitPrice=$('#txtItemPrice').val();

    let option=confirm(`Do You Want to Update Item ? ID:${itemCode}`);
    if (option){
       let result= updateItem(itemCode, itemName, qtyOnHand, unitPrice);
       if (result){
           alert("Item Successfully Updated !");
       }else{
           alert("Update Faild !");
       }
    }
     loadAllItems();
     clearitem();

});

// delete
$("#btnItemDelete").click(function () {
    let itemCode = $("#txtItemCode").val();
    let option=confirm(`Do You Want to Delete ? ID:${itemCode}`);
    if (option){
        let result=deleteItem(itemCode);
        if (result){
            alert("Item Successfully Deleted !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllItems();
    clearitem();
});

// search
$("#txtItemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#txtItemCode").val(item.getItemCode());
            $("#txtItemName").val(item.getItemName());
            $("#txtItemQty").val(item.getQtyOnHand());
            $("#txtItemPrice").val(item.getUnitPrice());
        } else {
            clearitem();
        }
    }
});


// ==================================================================================================
//Functions
// save item
function getAllItems() {
    return itemDB;
}
function saveItem(itemCode, itemName, qtyOnHand, unitPrice) {
    let item = new ItemDTO(itemCode, itemName, qtyOnHand, unitPrice);
    itemDB.push(item);// item aded

    loadAllItems();
    return true;   
}

// update customer
function updateItem(itemCode, itemName, qtyOnHand, unitPrice) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.setItemName(itemName)
        item.setQtyOnHand(qtyOnHand)
        item.setUnitPrice(unitPrice);
        return true;
    } else {
        return false;
    }
    
}

// search customer
function searchItem(itemCode) {
    for (var i in itemDB) {
        if (itemDB[i].getItemCode() == itemCode) return itemDB[i];
    }
    return null;
}

//delete customer
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = itemDB.indexOf(item);
        itemDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}


// =====================================================================================================
// other functions
function loadAllItems() {
    let allItems = getAllItems();
    $('#tblItem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qtyOnHand = allItems[i].getQtyOnHand();
        let unitPrice = allItems[i].getUnitPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qtyOnHand}</td><td>${unitPrice}</td></tr>`;
        $('#tblItem').append(row);
    }
    $('#tblItem>tr').click(function () {
        let code=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let qtyOnHand=$(this).children('td:eq(2)').text();
        let unitPrice=$(this).children('td:eq(3)').text();
        
        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtItemQty").val(qtyOnHand);
        $("#txtItemPrice").val(unitPrice);
        
      
   });
}

function clearitem() {
        $('#txtItemCode').val("");
        $('#txtItemName').val("");
        $('#txtItemQty').val("");
        $('#txtItemPrice').val("");
}

// Reg Ex
let codeRegEx = /^(I00-)[0-9]{1,3}$/;
let descRegEx = /^[A-z| |0-9]{1,25}$/;
let qtyRegEx = /^[0-9]{1,5}$/;
let priceRegEx = /^\d{1,4}(?:\.\d{0,2})?$/;

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('keyup', function (event) {
    let input1 = $('#txtItemCode').val();
    let input2 = $('#txtItemName').val();
    let input3 = $('#txtItemQty').val();
    let input4 = $('#txtItemPrice').val();

    if (codeRegEx.test(input1)) {
        $('#txtItemCode').css('border', '2px solid green');
        $('#lblCode').text("");
        if (event.key === "Enter") {
            $('#txtItemName').focus();
        }
        if (descRegEx.test(input2)) {
            $('#txtItemName').css('border', '2px solid green');
            $('#lblName').text("");
            if (event.key === "Enter") {
                $('#txtItemQty').focus();
            }
            if (qtyRegEx.test(input3)) {
                $('#txtItemQty').css('border', '2px solid green');
                $('#lblQty').text("");
                if (event.key === "Enter") {
                    $('#txtItemPrice').focus();
                }
                if (priceRegEx.test(input4)) {
                    $('#txtItemPrice').css('border', '2px solid green');
                    $('#lblPrice').text("");
                    if (event.key === "Enter") {
                        $('#btnItemAdd').click();
                        $('#txtItemCode').focus();
                    }
                } else {
                    $('#txtItemPrice').css('border', '2px solid red');
                    $('#lblPrice').text("Required field. Pattern:-(100.00 or 100)");
                }
            } else {
                $('#txtItemQty').css('border', '2px solid red');
                $('#lblQty').text("Required field. Maximum 5");
            }
        } else {
            $('#txtItemName').css('border', '2px solid red');
            $('#lblName').text("Required field. characters and numbers Allowed.");

        }
    } else {
        $('#txtItemCode').css('border', '2px solid red');
        $('#lblCode').text("Required field. Pattern:-(I00-000)");

    }
});