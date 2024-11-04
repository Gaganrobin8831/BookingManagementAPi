# BookingManagementAPi
# a booking system of user and barber



# regeister api
http://localhost:3232/regester

# payload

 {
 "fullName":"Gagan",
  "email":"gagan@gmail.com",
  "password":"123"

}
-----------------------------------------------------------

# Login api
http://localhost:3232/Login
# payload 

{
    "email":"gagan@gmail.com",
    "password":"123"
}

# ---------------------------------------------------------

# new barbaer add 
http://localhost:3232/Barber
# payload

 {
    "fullName":"Second",
    "email":"Second@gmail.com"
}

# ----------------------------------------------------------------------

 # booking 
http://localhost:3232/Booking
# payload

{
    "barberName":"Second"
"userName":"Gagan"
"startTime":"9:00 AM"
"endTime":"10:00 AM"
"day":"Tuesday"
}

# ----------------------------------------------------
# USER CAN DELETE BOOKING
 http://localhost:3232/deleteBooking
# payload

{
    "userName":"Gagan",
    "barberName":"Second"
}

# --------------------------------------------
# baraber accept or reject status
http://localhost:3232/BookingStatusUpdate

# payload


user:Gagan
barberName:Second
status:Accept
day:Monday

# ----------------------------------------------