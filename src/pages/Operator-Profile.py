import streamlit as st
import requests


def main():
    st.title("Welcome to the Operator Page")
    response = requests.post('http://localhost:5000/session',json={'operato': True}).json()
    if(response['operator']):
        st.write(f"Hi {response['name']} , Welcome to the cabin")
    
        working_station = st.text_input("Enter your working station:")
        working_condition = st.radio("Enter your working condition:", ("Working", "Not working"))
        slot = st.number_input("Enter no of free slots:",format='%.0f')
        ldata = {'location': working_station, 'status': True if(working_condition == "Working" ) else False , 'slots' : slot}
        if st.button('Submit'):
         if working_station:
           response = requests.post('http://localhost:5000/operpage',json=ldata).json()
           st.success("Data Submitted Successfully")
    else:
       st.error("# You are not an operator")

if __name__ == "__main__":
    main()