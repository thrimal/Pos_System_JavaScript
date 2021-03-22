function OrderDetailDTO(orderId,code,qty,price){
    var __orderId=orderId;
    var __code=code;
    var __quantity=qty;
    var __price=price;

    this.getOrderId=function (){
        return __orderId;
    }

    this.getItemCode=function (){
        return __code;
    }

    this.getQuantity=function(){
        return __quantity;
    }

    this.getPrice=function(){
        return __price;
    }

    this.setOrderId=function (orderId){
        __orderId=orderId;
    }

    this.setCode=function(code){
        __code=code;
    }

    this.setQuantity=function(quantity){
        __quantity=quantity;
    }

    this.setPrice=function (price){
        __price=price;
    }
}