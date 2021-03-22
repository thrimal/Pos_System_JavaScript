function ItemDTO(code, name, qtyOnHand, unitPrice){
    var __code=code;
    var __name=name;
    var __qtyOnHand=qtyOnHand;
    var __unitPrice=unitPrice;

    this.getItemCode = function () {
        return __code;
    }
    this.getItemName = function () {
        return __name;
    }
    this.getQtyOnHand = function () {
        return __qtyOnHand;
    }
    this.getUnitPrice = function () {
        return __unitPrice;
    }

    this.setItemCode  = function (newCode) {
        __code = newCode;
    }
    this.setItemName = function (newName) {
        __name = newName;
    }
    this.setQtyOnHand = function (newQtyOnHand) {
        __qtyOnHand = newQtyOnHand;
    }
    this.setUnitPrice = function (newUnitPrice) {
        __unitPrice = newUnitPrice;
    }


}