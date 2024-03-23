import streamlit as st
import json
import google.generativeai as genai

st.set_page_config(
    page_title="Zapspot - EV Charging station finder",
    page_icon="../img/icon.png",
    layout="wide",
    initial_sidebar_state="expanded"
)
st.sidebar.title('')
st.write("# ⚡ ZapSpot")

# Configure GenAI API key
genai.configure(api_key="AIzaSyDn_X_T1dvsryDGnByWw2Mdm9HL4HsNKyU")

# Set up the model and prompt parts
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

# Read data from JSON file and convert it to a string
with open('../utilities/evt.json', 'r') as f:
    ev_stations_data = json.load(f)
    ev_stations_str = json.dumps(ev_stations_data)

model = genai.GenerativeModel(model_name="gemini-1.0-pro-001",
                              generation_config=generation_config,
                              safety_settings=safety_settings)
st.title("EV Assistant")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []
prompt="Hi! I'm Zap, How can i help you?"
# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])
if input_text := st.chat_input("What is up?"):
    # Display user message in chat message container
    prompt_parts = [
        "your name is zap.if the user's question is about ev,you must answer it.if the user asks about travel plan,you must answer it.you are an ev charging  station location assisstant.first ask the current location of the user.if the user's question is about tell the details of ev charging stations,only take from this given list of ev charging stations.if the user's question is about travel schedule,give them plan along with ev stations that is present in the list.only give ev stations from this list.also answer questions related to ev.don't answer questions unrelated to ev.don't give bold letters  while answering.dont generate the character ** in the answer.",
        ev_stations_str,  # Add the dataset string here
        ", input: " + input_text
    ]
    
    prompt= model.generate_content(prompt_parts).text
    with st.chat_message("user"):
        st.markdown(input_text)
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": input_text})
response = f"zap: {prompt}"
# Display assistant response in chat message container
with st.chat_message("assistant"):
    st.markdown(response)
# Add assistant response to chat history
st.session_state.messages.append({"role": "assistant", "content": response})