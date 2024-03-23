import requests
import streamlit as st
from streamlit_extras.switch_page_button import switch_page

st.set_page_config(
    page_title="Zapspot - EV Charging station finder",
    page_icon="../img/icon.png", 
    initial_sidebar_state="collapsed"
)


def register():
    
    
    namer = st.text_input('Name ')    
    emailr = st.text_input('Email for registration')
    passwordr = st.text_input('Password ', type='password')
    confirm_password = st.text_input('Confirm Password', type='password')
    user_type = st.selectbox('User Type', ['Operator', 'User'])
    operator = True if (user_type == 'Operator') else False

    if st.button('Register'):
        
        if namer and emailr and passwordr and confirm_password:
            if passwordr != confirm_password:
                st.error('Passwords do not match.')
                return
            
            login_data = {'name': namer, 'email': emailr, 'password': passwordr, 'is_operator' : operator}
            response = requests.post('http://localhost:5000/register', json=login_data).json()
            if(response['success']):
                st.success('Register successful!')
                switch_page("home")
            else:
                st.error("Wrong Email or Password")
           
            
        else:
            st.error('Please fill in all the required fields.')

def login():
    

    email = st.text_input('Email')
    password = st.text_input('Password', type='password')
    user_type = st.selectbox('User Type', ['User', 'Operator'])

    if st.button('Login'):
        if email and password:
            operator = True if (user_type == 'Operator') else False
            login_data = {'email': email, 'password': password, 'is_operator' : operator}
            response = requests.post('http://localhost:5000/login', json=login_data).json()
            if(response['success']):
                st.success('Login successful!')
                switch_page("home")
            else:
                st.error("Wrong Email or Password")

        else:
            st.error('Please enter your email and password.')
   
    

def main():

    st.title('Electric Vehicle Charging Navigator Registration')
    st.write("### Have a account already?")
    option = st.selectbox("", ["Login", "Register"])

    if option == "Login":
        login()
    
    elif option == "Register":
        register()

if __name__ == '__main__':
     main()
    
