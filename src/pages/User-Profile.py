from logging import PlaceHolder
import streamlit as st
import requests


def main():
        response = requests.post('http://localhost:5000/session',json={'operator': True}).json()
        if (response['operator']):
           st.title(f"Welcome {response['name']}")
           st.write("## EV Details:")
           ev = st.text_input("Enter your EV Model:")
           charge = st.radio("Select the charger type:", ("Type 1", "Type 2","Type 3"))
           slot = st.number_input("Enter your phone no:",format='%.0f')
           ldata = {'EV_mod': ev, 'chargertype': charge , 'phonenumber' : slot}
           if st.button('Submit'):
            if ev:
              response = requests.post('http://localhost:5000/userpage',json=ldata).json()
              st.success("Data Submitted Successfully")
              
        else:
            st.error("You are not a User")

        st.write('---')
        st.write("## Emergency Alert:")
        st.write("Send Emergency Alert to the nearby EV Charging Station to request for help")
        st.write("##")

        if st.button("Emergency"):
          st.success("Emergency Alert Sended to the nearby EV Station")

        st.write('---')
        st.write("## Send Feedback about the App:")
        st.text_input("Enter Email id:")
        st.text_area("Feedback about our App:")
        if(st.button("Send")):
          st.success("Feedback sent!")
                      





if __name__ == "__main__":
    main()