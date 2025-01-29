Payment integration razorpay

2 step process

1. Create Order
2. Payment Verificatiom


FE cannot directly create an order because we dont have a secret key in the FE

secret key is stored in the backend

It incloves 2 steps an shown above 
create order:

FE will make a createOrder API request to the backend
BE with the secret key will call the razorpay servers
Razorpay will send an orderId to the backend for that order
BE will send that orderId to the FE
With that orderId FE will open razorpay dialog(that will have all the information of payment)
Once the payment is done from the FE side razorpay webhook will call the BE servers to tell it whether the payment was success or failure and that thing BE will store in the database
Few mins later FE will call the paymentVerify api to check for the payment and the servers will response SUCCESS / FAIL for that payment


Never pass the amount from the FE as someone can hijak and take your 1000 membership for just 1 rupee always handle the amount case in the backend

FE  ------------>  BE(secret key)
    (create order)   

        
             
        
        razorpay