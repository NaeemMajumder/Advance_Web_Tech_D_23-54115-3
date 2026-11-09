function processOrder(){
    return new Promise((resolve,reject)=>{
        console.log("Processing order....");

        setTimeout(()=>{
            const isSuccess=true;

            if(isSuccess){
                resolve({
                    orderId:42017,
                    customer:"Naeem",
                    item:"Chicken Burger",
                    quantity:2,
                    total:500,
                });
            }else{
                reject("Failed to process the order");
            }
        },3000);
    });
}

processOrder().then((orderData)=>{
    console.log("Order ID: " + orderData.orderId);
    console.log("Customer: " + orderData.customer);
    console.log("Item: " + orderData.item);
    console.log("Quantity: " + orderData.quantity);
    console.log("Total: " + orderData.total);
})
.catch((err)=>{
    console.log(err);
})
.finally(()=>{
    console.log("Order Processing Complete.");
});