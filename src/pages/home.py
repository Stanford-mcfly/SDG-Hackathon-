import streamlit as st
import streamlit.components.v1 as components
from screeninfo import get_monitors
from streamlit_extras.switch_page_button import switch_page

st.set_page_config(
    page_title="My Streamlit App",
    page_icon="../img/icon.png",
    layout="wide",
    initial_sidebar_state="expanded"
)




st.sidebar.button('Toggle Sidebar')
st.markdown(
    """
    <style>
    @media only screen and (max-width: 1200px) {
        .sidebar .sidebar-content {
            width: 100%;
            height: 40%;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: white;
            border-top: 1px solid #ccc;
            z-index: 1;
        }
    }
    @media only screen and (min-width: 1201px) {
        .sidebar .sidebar-content {
            width: 40%;
        }
    }
    </style>
    """,
    unsafe_allow_html=True
)



st.markdown(
    """
    <style>
    body {
        overflow: hidden;
    }
    .centered {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
         /* Ensure it's on top of other elements */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
    """,
    unsafe_allow_html=True
)

for m in get_monitors():
    w = m.width
    h = m.height



with open("../maps/routing.html", "r") as file:
    content = file.read()



st.markdown("<div class='centered'>", unsafe_allow_html=True)
components.html(
    content,
    height=800

)
st.markdown("</div>", unsafe_allow_html=True)

st.sidebar.title('Sidebar Title')

# Add text to the sidebar
st.sidebar.text('This is a sidebar')

# Add a slider to the sidebar
slider_value = st.sidebar.slider('Slider', 0, 100, 50)

# Add a button to the sidebar
if st.sidebar.button('Click me'):
    st.sidebar.write('Button clicked!')

# Add a selectbox to the sidebar
option = st.sidebar.selectbox(
    'Which number do you like best?',
    [1, 2, 3, 4, 5])