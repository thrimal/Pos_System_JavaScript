

function generateOrderId() {
    if (orderDB.length == 0) {
        $('#txtOrderID').val("OR-001");
    } else {
        let lastOrderId = orderDB[orderDB.length - 1].getOrderId();
        let newId = Number.parseInt(lastOrderId.substring(3, 6)) + 1;
        if (newId < 10) {
            newId = "OR-00" + newId;
        } else if (newId < 100) {
            newId = "OR-0" + newId;
        }
        $('#txtOrderID').val(newId);
    }
}

function generateDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    $("#txtDate").val(today);
}

function loadCustomerId() {
    let allCustomers = customerDB;
    let count = 0;
    $('#cmbCustomerId').children().remove();
    $('#cmbCustomerId').append("<option>--Select--</option>");
    $($('#cmbCustomerId').children().get(0)).attr('selected', 'true');
    $($('#cmbCustomerId').children().get(0)).attr('disabled', 'true');

    allCustomers.forEach(function () {
        $('#cmbCustomerId').append("<option>" + allCustomers[count].getCustomerId() + "</option>");
        count++;
    });
    $('#cmbCustomerId').on('change', function () {
        for (var i in allCustomers) {
            if ($('#cmbCustomerId :selected').val() === allCustomers[i].getCustomerId()) {
                $('#txtCustomerId2').val(allCustomers[i].getCustomerId());
                $('#txtCustomerName2').val(allCustomers[i].getCustomerName());
                $('#txtCustomerAddress2').val(allCustomers[i].getCustomerAddress());
                $('#txtCustomerSalary2').val(allCustomers[i].getCustomerSalary());
            }
        }
    });
}

function loadItemCode() {
    let allItems = itemDB;
    let count = 0;
    $('#cmbItemCode').children().remove();
    $('#cmbItemCode').append("<option>--Select--</option>");
    $($('#cmbItemCode').children().get(0)).attr('selected', 'true');
    $($('#cmbItemCode').children().get(0)).attr('disabled', 'true');

    allItems.forEach(function () {
        $('#cmbItemCode').append("<option>" + allItems[count].getItemCode() + "</option>");
        count++;
    });
    $('#cmbItemCode').on('change', function () {
        for (var i in allItems) {
            if ($('#cmbItemCode :selected').val() === allItems[i].getItemCode()) {
                $('#txtItemCode2').val(allItems[i].getItemCode());
                $('#txtItemName2').val(allItems[i].getItemName());
                $('#txtItemQty2').val(allItems[i].getQtyOnHand());
                $('#txtItemPrice2').val(allItems[i].getUnitPrice());
            }
        }
    });
}

function clearFields() {
    $('#txtDate').val("");
    $('#txtCustomerId2').val("");
    $('#txtCustomerName2').val("");
    $('#txtCustomerAddress2').val("");
    $('#txtCustomerSalary2').val("");
    $('#txtItemCode2').val("");
    $('#txtItemName2').val("");
    $('#txtItemQty2').val("");
    $('#txtItemPrice2').val("");
    $('#txtOrderQty').val("");
    $('#txtPayment').val("");
    $('#txtDiscount').val("");
    $('#txtBalance').val("");
    $('#lblTotal').val("0.00");
    $('#lblSubTotal').val("0.00");
    $('#cmbCustomerId').children().remove();
    $('#cmbItemCode').children().remove();
    $('#tblCart').remove();
    generateOrderId();
}


//Place order
$('#btnPlaceOrder').click(function () {
    let orderDate = $('#txtDate').val();
    let cusId = $('#txtCustomerId').val();

    let orderDetails = [];
    let orderId = $('#txtOrderID').val();

    $('#tblCart>tr').each(function () {
        orderDetails.push(new OrderDetailDTO(
            orderId,
            $($(this).children().get(0)).text(),
            $($(this).children().get(3)).text(),
            $($(this).children().get(2)).text(),
        ));
    });
    let discount = 10;
    let orderDTO = new OrderDTO(orderId, orderDate, cusId, orderDetails, discount);
    orderDB.push(orderDTO);
    // console.log(orderTable[0].getOrderId());
    // console.log(orderTable[0].getOrderDate());
    // console.log(orderTable[0].getCusId());
    // console.log(orderTable[0].getOrderDetail());
    // console.log(orderTable[0].getDiscount());

    clearFields();
    loadCustomerId();
    loadItemCode()
    generateOrderId();
    console.log("hellow");
});

// add to cart

$('#btnAddToTable').click(function () {
    let itemCode = $('#txtItemCode2').val();
    let description = $('#txtItemName2').val();
    let orderQty = $('#txtOrderQty').val();
    let unitPrice = $('#txtItemPrice2').val();
    let total = $('#txtItemPrice2').val() * $('#txtOrderQty').val();

    let count = 0;

    let flag = true;

    $('#tblCart>tr').each(function () {
        if ($($('#tblCart>tr').get(count).children[0]).text() === itemCode) {
            flag = false;
            orderQty = Number.parseInt($($('#tblCart>tr').get(count).children[3]).text()) + Number.parseInt(orderQty);
            $($('#tblCart>tr').get(count).children[3]).text(orderQty);
            total = Number.parseInt($($('#tblCart>tr').get(count).children[4]).text()) + Number.parseInt(total);
            $($('#tblCart>tr').get(count).children[4]).text(total + ".00");
        }
        count++;
    });
    if (flag) {
        $('#tblCart').append(`<tr><td>${itemCode}</td><td>${description}</td><td>${unitPrice}</td><td>${orderQty}</td><td>${total + ".00"}</td></tr>`);
    }

    let newQty;
    newQty = Number.parseInt($('#txtItemQty2').val()) - Number.parseInt($('#txtOrderQty').val());
    $('#txtItemQty2').val(newQty);
    let allItems = itemDB;
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].getItemCode() === $('#txtItemCode').val()) {
            allItems[i].setQtyOnHand(newQty);
        }
    }

    $('#tblCart>tr').off('dblclick');
    $('#tblCart>tr').on('dblclick', function () {
        let newQty;
        let allItems = itemDB;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].getItemCode() === $($(this).children().get(0)).text()) {
                newQty = Number.parseInt($($(this).children().get(3)).text()) + allItems[i].getQtyOnHand();
                allItems[i].setQtyOnHand(newQty);
            }
        }
        if ($($(this).children().get(0)).text() === $('#txtItemCode').val()) $('#txtQtyOnHand').val(newQty);
        $(this).remove();
        calculateTotal();
        calculateSubTotal();
    });
    calculateTotal();
});

function calculateTotal() {
    let tot = 0;
    let count = 0;

    $('#tblCart>tr').each(function () {
        tot += Number.parseInt($($('#tblCart>tr').get(count).children[4]).text());
        count++;
    });
    $('#lblTotal').text(tot + ".00");
    $('#lblSubTotal').text(tot + ".00");
    $('#txtDiscount').val(0);
    $('#txtPayment').val();
    $('#txtBalance').val("0.00");

}

function calculateSubTotal() {
    let subTot = 0;
    let discount = 0;
    if ($('#txtDiscount').val() === "") {
        discount = 0;
    } else {
        discount = Number.parseInt($('#txtDiscount').val());
    }
    subTot = Number.parseInt($('#lblTotal').text()) - discount;

    if (subTot < 0) {
        $('#lblSubTotal').text($('#lblTotal').text());
        // $('#txtPayment').val(Number.parseInt($('#lblTotal').text()));
         $('#txtPayment').attr('min', Number.parseInt($('#lblTotal').text()));
    } else {
        $('#lblSubTotal').text(subTot + ".00");
       $('#txtPayment').val();
        $('#txtPayment').attr('min', subTot);
        calculateBalance();
    }
}

$('#txtPayment').on('change', function () {
    calculateBalance();
});

$('#txtPayment').on('keyup', function () {
    validatePayment();
    calculateBalance();
});

$('#txtDiscount').on('change', function () {
    calculateSubTotal();
});

$('#txtDiscount').on('keyup', function () {
    calculateSubTotal();
});

function validatePayment() {
    // $('#txtBalance').val("0.00");
}

function calculateBalance() {
    if ($('#txtPayment').val() === "" || Number.parseInt($('#txtPayment').val()) < Number.parseInt($('#lblSubTotal').text())) {
        //error
        $('#txtBalance').val("0.00");
    } else {
        $('#txtBalance').val($('#txtPayment').val() - $('#lblSubTotal').text() + ".00");
    }
}

$('#txtOrderId,#txtDate,#txtOrderQTY,#txtPayment,#txtDiscount').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

// Reg Ex
let orderIdRegEx = /^(OR-)[0-9]{1,3}$/;
let orderQtyRegEx = /^[0-9]{1,4}$/;
let paymentRegEx = /^\d{1,7}(?:\.\d{0,2})?$/;
let discountRegEx = /^\d{1,7}(?:\.\d{0,2})?$/;

$('#txtOrderId,#txtDate,#cmbCustomerId,#cmbItemCode,#txtOrderQTY,#txtPayment,#txtDiscount').on('keyup', function (event) {
    let input1 = $('#txtOrderId').val();
    let input2 = $('#txtOrderQTY').val();
    let input3 = $('#txtPayment').val();
    let input4 = $('#txtDiscount').val();

    if (orderIdRegEx.test(input1)) {
        $('#txtOrderId').css('border', '2px solid green');
        $('#lblorderid').text("");
    }else {
        $('#txtOrderId').css('border', '2px solid red');
        $('#lblorderid').text("Required field. Pattern:-(OR-000)");
        $('#lblorderid').css('color', 'red');
        $('#lblorderid').css('font-size', '8px');
    }
    if ($('#cmbCustomerId :selected').val() === "--Select--") {
        $('#lblselectid').text("Required field. Please select Customer");
        $('#lblselectid').css('color', 'red');
        $('#lblselectid').css('font-size', '8px');
    }
    if ($('#cmbItemCode :selected').val() === "--Select--") {
        $('#lblselectid').text("Required field. Please select Item");
        $('#lblselectid').css('color', 'red');
        $('#lblselectid').css('font-size', '8px');
    }
    if (orderQtyRegEx.test(input2)) {
        $('#txtOrderQTY').css('border', '2px solid green');
        $('#lblorderqty').text("");
        if (event.key === "Enter") {
            $('#btnAddToCart').click();
            $('#cmbItemCode').focus();
        }
    }else {
        $('#txtOrderQTY').css('border', '2px solid red');
        $('#lblorderqty').text("Required field. Maximum 5");
        $('#lblorderqty').css('color', 'red');
        $('#lblorderqty').css('font-size', '8px');
    }
    if (paymentRegEx.test(input3)) {
        $('#txtPayment').css('border', '2px solid green');
        $('#lblpayment').text("");
    }else {
        $('#txtPayment').css('border', '2px solid red');
        $('#lblpayment').text("Required field. Maximum 5");
        $('#lblpayment').css('color', 'red');
        $('#lblpayment').css('font-size', '8px');
    }
    if (discountRegEx.test(input4)) {
        $('#txtDiscount').css('border', '2px solid green');
        $('#lbldisount').text("");
    }else {
        $('#txtDiscount').css('border', '2px solid red');
        $('#lbldisount').text("Required field. Maximum 5");
        $('#lbldisount').css('color', 'red');
        $('#lbldisount').css('font-size', '8px');
    }

});

