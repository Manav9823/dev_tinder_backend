# AUth
/login
/signup
/logout

# Profile

/profile/view
/profile/edit
/profile/forgotPassword

# Request

/request/sendRequest/like
/request/sendRequest/dislike
/request/receiveRequest/like

# Common

/v1/list
/v1/



# Login Steps(JWT)


FE Login(email, password) ---> BE(email, password) ---> check if user is present ---> password verify(bcrypt.compare)  ---> token generation(jwt.sign) ---> res.cookie

# Signup Steps

FE Signup(email, password, username) ---> BE(email, password, username) ---> validate the fields ---> hash the password ---> response user save

