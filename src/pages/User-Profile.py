from logging import PlaceHolder
import streamlit as st
import requests


def main():
        response = requests.post('http://localhost:5000/session',json={'operato': True}).json()
        if  (response['operator']):
           st.title(f"Welcome {response['name']}")
           ev = st.text_input("Enter your EV Model:")
           charge = st.radio("Select the charger type:", ("Type 1", "Type 2","Type 3"))
           slot = st.number_input("Enter your phone no:")
           ldata = {'EV_mod': ev, 'chargertype': charge , 'phonenumber' : slot}
           if st.button('Submit'):
            if ev:
              response = requests.post('http://localhost:5000/userpage',json=ldata).json()
        else:
            st.error("Not a User")
if __name__ == "__main__":
    main()