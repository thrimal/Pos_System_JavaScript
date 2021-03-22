function CustomerDTO(id, name, address, salary) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __salary = salary;

    this.getCustomerId=function (){
        return __id;
    }

    this.getCustomerName=function (){
        return __name;
    }

    this.getCustomerAddress=function (){
        return __address;
    }

    this.getCustomerSalary=function (){
        return __salary;
    }

    this.setCustomerId=function (id){
        __id=id;
    }

    this.setCustomerName=function (name){
        __name=name;
    }

    this.setCustomerAddress=function (address){
        __address=address;
    }

    this.setCustomerSalary=function (salary){
        __salary=salary;
    }
}
